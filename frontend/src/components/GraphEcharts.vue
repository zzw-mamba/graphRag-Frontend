<template>
<div class="graphrag-fullpage">
  <div class="graphrag-container">
    <div class="graphrag-left">
      <div ref="chartRef" class="graphrag-chart"></div>
    </div>
    <div class="graphrag-right">
      <div v-if="selectedNode">
        <h3>节点信息</h3>
        <p><strong>ID:</strong> {{ selectedNode.id }}</p>
        <p><strong>名称:</strong> {{ selectedNode.name }}</p>
        <!-- <div v-for="[key, val] in nodeEntries" :key="key">
          <p><strong>{{ key }}:</strong> {{ val }}</p>
        </div> -->
      </div>
      <div v-else>
        <p>点击左侧节点查看详细信息</p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import * as echarts from 'echarts';
import type {Systems, Instances, Databases, Tables, Fields, Links} from '../types/node.ts'


const props = defineProps<{
  systems: Systems[];
  instances: Instances[];
  databases: Databases[];
  tables: Tables[];
  fields: Fields[];
  links: Links[];
}>();


const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
type GraphNode = Record<string, any> & { type: string; id?: string | number; name?: string };

const selectedNode = ref<GraphNode | null>(null);

const nodeTypeStyle: Record<string, any> = {
  systems: {
    symbol: 'rect',
    symbolSize: [60, 30],
    itemStyle: { color: '#4B8BF4', borderColor: '#2B5DB9', borderWidth: 2, shadowBlur: 10, shadowColor: 'rgba(75,139,244,0.15)' },
    label: { color: '#222', fontWeight: 'bold', fontSize: 14 }
  },
  instances: {
    symbol: 'diamond',
    symbolSize: 40,
    itemStyle: { color: '#F4B942', borderColor: '#B97A2B', borderWidth: 2, shadowBlur: 10, shadowColor: 'rgba(244,185,66,0.15)' },
    label: { color: '#222', fontWeight: 'bold', fontSize: 14 }
  },
  databases: {
    symbol: 'roundRect',
    symbolSize: [50, 28],
    itemStyle: { color: '#43C59E', borderColor: '#2B8B6F', borderWidth: 2, shadowBlur: 10, shadowColor: 'rgba(67,197,158,0.15)' },
    label: { color: '#222', fontWeight: 'bold', fontSize: 14 }
  },
  tables: {
    symbol: 'rect',
    symbolSize: [40, 20],
    itemStyle: { color: '#F45B69', borderColor: '#B92B3A', borderWidth: 2, shadowBlur: 10, shadowColor: 'rgba(244,91,105,0.15)' },
    label: { color: '#222', fontWeight: 'bold', fontSize: 14 }
  },
  fields: {
    symbol: 'circle',
    symbolSize: 16,
    itemStyle: { color: '#A084E8', borderColor: '#5A3FBF', borderWidth: 2, shadowBlur: 8, shadowColor: 'rgba(160,132,232,0.12)' },
    label: { color: '#222', fontWeight: 'bold', fontSize: 13 }
  }
}

const getNodeStyle = (node: GraphNode) => {
  const style = nodeTypeStyle[node.type || 'tables'] || {};
  return style;
};


// 为每个节点生成唯一 id，并建立 name->id 映射
const nodeTypeList = ['systems', 'instances', 'databases', 'tables', 'fields'] as const;
type NodeType = typeof nodeTypeList[number];

const processedFields = computed(() => {
  return props.fields.map((field) => ({
    ...field,
    name: `${field.table_name}-${field.name}`,
  }));
});

const processedLinks = computed(() => {
  return props.links.map(link => {
    if (link.category === 'table-field') {
      return {
        ...link,
        target: `${link.source}-${link.target}`,
      };
    }
    return link;
  });
});

const effectiveProps = computed(() => ({
  ...props,
  fields: processedFields.value,
  links: processedLinks.value,
}));

const nodeNameToIdMap = computed(() => {
  const map = new Map<string, string>();
  nodeTypeList.forEach(type => {
    (effectiveProps.value[type] as any[]).forEach((n, idx) => {
      const id = `${type}_${idx}`;
      map.set(n.name, id);
    });
  });
  return map;
});

const fixedLinks = computed(() => {
  return processedLinks.value.map(link => {
    let source = link.source;
    let target = link.target;
    if (nodeNameToIdMap.value.has(source)) source = nodeNameToIdMap.value.get(source) ?? source;
    if (nodeNameToIdMap.value.has(target)) target = nodeNameToIdMap.value.get(target) ?? target;
    return { ...link, source, target };
  });
});

const allNodes = computed(() => {
  const arr: any[] = [];
  nodeTypeList.forEach(type => {
    if (type === 'fields') {
      const relatedFieldIds = new Set<string>();
      if (selectedNode.value) {
        fixedLinks.value.forEach(link => {
          if (
            selectedNode.value &&
            link.source === selectedNode.value.id
          ) {
            // console.log('Link Target:', link.target);
            relatedFieldIds.add(link.target);
          }
          if (
            selectedNode.value &&
            link.target === selectedNode.value.id
          ) {
            relatedFieldIds.add(link.source);
          }
        });
      }
      (effectiveProps.value.fields as any[]).forEach((n, idx) => {
        if (n.is_used || relatedFieldIds.has(nodeNameToIdMap.value.get(n.name) || '')) {
          arr.push({ ...n, type, id: nodeNameToIdMap.value.get(n.name) || `${type}_${idx}`});
        }
      });
    } else {
      (props[type] as any[]).forEach((n, idx) => {
        arr.push({ ...n, type, id: nodeNameToIdMap.value.get(n.name) || `${type}_${idx}`});
      });
    }
  });
  return arr;
});

const renderChart = () => {
  if (!chartRef.value) return;
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.on('click', (params: any) => {
      if (params.dataType === 'node') {
        selectedNode.value = params.data;
      }
    });
  }

  let nodes, links;
  if (selectedNode.value) {
    const selectedId = selectedNode.value.id;
    const relatedNodeIds = new Set([selectedId]);
    fixedLinks.value.forEach(link => {
      if (link.source === selectedId) relatedNodeIds.add(link.target);
      if (link.target === selectedId) relatedNodeIds.add(link.source);
    });
    nodes = allNodes.value.map(node => {
      const style = getNodeStyle(node);
      if (relatedNodeIds.has(node.id)) {
        return { ...node, ...style, itemStyle: { ...style.itemStyle, opacity: 1 }, label: { ...style.label, show: true } };
      } else {
        return { ...node, ...style, itemStyle: { ...style.itemStyle, opacity: 0.1 }, label: { ...style.label, show: false } };
      }
    });
    links = fixedLinks.value.map(link => {
      if (link.source === selectedId || link.target === selectedId) {
        return { ...link, lineStyle: { opacity: 1 } };
      } else {
        return { ...link, lineStyle: { opacity: 0.1 } };
      }
    });
  } else {
    nodes = allNodes.value.map(node => {
      const style = getNodeStyle(node);
      if (node.is_used) {
        return { ...node, ...style, itemStyle: { ...style.itemStyle, opacity: 1 }, label: { ...style.label, show: true } };
      } else {
        return { ...node, ...style, itemStyle: { ...style.itemStyle, opacity: 0.1 }, label: { ...style.label, show: false } };
      }
    });
    links = fixedLinks.value.map(link => {
      if (link.is_used) {
        return { ...link, lineStyle: { opacity: 1 } };
      } else {
        return { ...link, lineStyle: { opacity: 0.1 } };
      }
    });
  }

  const option = {
    tooltip: {
      backgroundColor: '#fff',
      borderColor: '#eee',
      borderWidth: 1,
      textStyle: { color: '#222', fontSize: 13 },
      padding: 10,
      extraCssText: 'box-shadow:0 2px 8px rgba(0,0,0,0.08);'
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        data: nodes,
        links: links,
        label: {
          show: true,
          position: 'right',
          color: '#222',
          fontWeight: 'bold',
          fontSize: 13,
          formatter: '{b}'
        },
        force: {
          repulsion: 180,
          edgeLength: 110
        },
        lineStyle: {
          color: '#bbb',
          width: 2,
          opacity: 0.8
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 3, color: '#4B8BF4', opacity: 1 },
          itemStyle: { borderColor: '#222', borderWidth: 3 }
        },
        edgeLabel: {
          show: false
        },
        animation: true,
        animationDuration: 600
      }
    ]
  };
  chartInstance.setOption(option);
};

onMounted(() => {
  renderChart();
});


watch([
  () => props.systems,
  () => props.instances,
  () => props.databases,
  () => props.tables,
  () => props.fields,
  () => props.links,
  selectedNode
], () => {
  renderChart();
}, { deep: true });
</script>

<style scoped>
.graphrag-fullpage {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}
.graphrag-container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
}
.graphrag-left {
  width: 80vw;
  min-width: 400px;
  border-right: 1px solid #eee;
  display: flex;
  align-items: stretch;
  justify-content: center;
  background: #fafbfc;
}
.graphrag-right {
  width: 20vw;
  min-width: 220px;
  padding: 32px 24px;
  overflow-y: auto;
  background: #fff;
}
.graphrag-chart {
  width: 100%;
  height: 100vh;
  min-width: 350px;
}
</style>
