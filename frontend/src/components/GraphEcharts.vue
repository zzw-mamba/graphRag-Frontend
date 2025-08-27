defineExpose({ parentChain });
<template>
  <div class="graphrag-fullpage">
    <div class="graphrag-container">
      <div class="graphrag-left">
        <div ref="chartRef" class="graphrag-chart"></div>
      </div>
      <div class="graphrag-right flex flex-col items-center text-center">
        <div class="w-full flex flex-col items-center text-center px-2" v-if="selectedNode">
          <button @click="selectedNode = null"
            class="mb-5 w-3/4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:from-blue-500 hover:to-blue-700 hover:scale-105 transition-all duration-200 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <svg class="inline-block w-4 h-4 mr-2 align-text-bottom" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 4v5h.582M20 20v-5h-.581m-2.837-7.163A7.963 7.963 0 0012 4c-4.418 0-8 3.582-8 8m16 0c0 1.657-.672 3.157-1.763 4.237M15 19.418A7.963 7.963 0 0012 20c-4.418 0-8-3.582-8-8" />
            </svg>
            恢复图谱
          </button>
          <template v-if="selectedNode.type === 'systems'">
            <h3 class="text-xl font-bold text-blue-700 mb-4 text-center">系统信息</h3>
            <div class="space-y-2 text-left w-full">
              <p><span class="font-semibold text-gray-700">名称：</span><span class="text-gray-900">{{ selectedNode.name
                  }}</span></p>
              <p v-if="selectedNode.url"><span class="font-semibold text-gray-700">系统地址：</span><a
                  :href="selectedNode.url" target="_blank" class="text-blue-600 underline break-all">{{ selectedNode.url
                  }}</a></p>
              <p v-if="selectedNode.description"><span class="font-semibold text-gray-700">描述：</span><span
                  class="text-gray-900">{{ selectedNode.description }}</span></p>
              <p v-if="selectedNode.department_in_charge"><span class="font-semibold text-gray-700">负责部门：</span><span
                  class="text-gray-900">{{ selectedNode.department_in_charge }}</span></p>
              <p v-if="selectedNode.person_in_charge"><span class="font-semibold text-gray-700">负责人：</span><span
                  class="text-gray-900">{{ selectedNode.person_in_charge }}</span></p>
              <p v-if="selectedNode.dev_corp"><span class="font-semibold text-gray-700">开发公司：</span><span
                  class="text-gray-900">{{ selectedNode.dev_corp }}</span></p>
              <p v-if="selectedNode.dev_person"><span class="font-semibold text-gray-700">开发人员：</span><span
                  class="text-gray-900">{{ selectedNode.dev_person }}</span></p>
              <p v-if="selectedNode.ps"><span class="font-semibold text-gray-700">备注：</span><span
                  class="text-gray-900">{{ selectedNode.ps }}</span></p>
            </div>
          </template>
          <template v-else-if="selectedNode.type === 'instances'">
            <h3 class="text-xl font-bold text-yellow-700 mb-4 text-center">实例信息</h3>
            <div class="space-y-2 text-left w-full">
              <p><span class="font-semibold text-gray-700">名称：</span><span class="text-gray-900">{{ selectedNode.name
                  }}</span></p>
              <p v-if="selectedNode.system_name"><span class="font-semibold text-gray-700">所属系统：</span><span
                  class="text-gray-900">{{ selectedNode.system_name }}</span></p>
              <p v-if="selectedNode.url"><span class="font-semibold text-gray-700">连接地址：</span><span
                  class="text-gray-900 break-words">{{ selectedNode.url }}</span></p>
              <p v-if="selectedNode.type"><span class="font-semibold text-gray-700">类型：</span><span
                  class="text-gray-900">{{ selectedNode.type }}</span></p>
              <p v-if="selectedNode.version"><span class="font-semibold text-gray-700">版本：</span><span
                  class="text-gray-900">{{ selectedNode.version }}</span></p>
              <p v-if="selectedNode.area"><span class="font-semibold text-gray-700">区域：</span><span
                  class="text-gray-900">{{ selectedNode.area }}</span></p>
              <p v-if="selectedNode.is_cloud"><span class="font-semibold text-gray-700">是否云端：</span><span
                  class="text-gray-900">{{ selectedNode.is_cloud }}</span></p>
              <p v-if="selectedNode.type"><span class="font-semibold text-gray-700">类型：</span><span
                  class="text-gray-900">{{ selectedNode.type }}</span></p>
              <p v-if="selectedNode.version"><span class="font-semibold text-gray-700">版本：</span><span
                  class="text-gray-900">{{ selectedNode.version }}</span></p>
              <p v-if="selectedNode.ps"><span class="font-semibold text-gray-700">备注：</span><span
                  class="text-gray-900">{{ selectedNode.ps }}</span></p>
            </div>
          </template>
          <template v-else-if="selectedNode.type === 'databases'">
            <h3 class="text-xl font-bold text-green-700 mb-4 text-center">数据库信息</h3>
            <div class="space-y-2 text-left w-full">
              <p><span class="font-semibold text-gray-700">名称：</span><span class="text-gray-900">{{ selectedNode.name
                  }}</span></p>
              <p v-if="selectedNode.instance_name"><span class="font-semibold text-gray-700">所属实例：</span><span
                  class="text-gray-900">{{ selectedNode.instance_name }}</span></p>
              <p v-if="selectedNode.description"><span class="font-semibold text-gray-700">描述：</span><span
                  class="text-gray-900">{{ selectedNode.description }}</span></p>
            </div>
          </template>
          <template v-else-if="selectedNode.type === 'tables'">
            <h3 class="text-xl font-bold text-purple-700 mb-4 text-center">数据表信息</h3>
            <div class="space-y-2 text-left w-full">
              <p><span class="font-semibold text-gray-700">名称：</span><span class="text-gray-900">{{ selectedNode.name
                  }}</span></p>
              <p v-if="selectedNode.database_name"><span class="font-semibold text-gray-700">所属数据库：</span><span
                  class="text-gray-900">{{ selectedNode.database_name }}</span></p>
              <p v-if="selectedNode.summary"><span class="font-semibold text-gray-700">简介：</span><span
                  class="text-gray-900">{{ selectedNode.summary }}</span></p>
              <p v-if="selectedNode.entity_type"><span class="font-semibold text-gray-700">实体类型：</span><span
                  class="text-gray-900">{{ selectedNode.entity_type }}</span></p>
              <p v-if="selectedNode.classification"><span class="font-semibold text-gray-700">分类：</span><span
                  class="text-gray-900">{{ selectedNode.classification }}</span></p>
              <p v-if="selectedNode.level"><span class="font-semibold text-gray-700">级别：</span><span
                  class="text-gray-900">{{ selectedNode.level }}</span></p>
              <p v-if="selectedNode.production_mode"><span class="font-semibold text-gray-700">生产模式：</span><span
                  class="text-gray-900">{{ selectedNode.production_mode }}</span></p>
              <p v-if="selectedNode.source"><span class="font-semibold text-gray-700">数据源：</span><span
                  class="text-gray-900">{{ selectedNode.source }}</span></p>
              <p v-if="selectedNode.share_type"><span class="font-semibold text-gray-700">共享类型：</span><span
                  class="text-gray-900">{{ selectedNode.share_type }}</span></p>
              <p v-if="selectedNode.department_in_charge"><span class="font-semibold text-gray-700">负责科室：</span><span
                  class="text-gray-900">{{ selectedNode.department_in_charge }}</span></p>
              <p v-if="selectedNode.person_in_charge"><span class="font-semibold text-gray-700">负责人：</span><span
                  class="text-gray-900">{{ selectedNode.person_in_charge }}</span></p>
              <p v-if="selectedNode.ps"><span class="font-semibold text-gray-700">备注：</span><span
                  class="text-gray-900">{{ selectedNode.ps }}</span></p>
            </div>
          </template>
          <template v-else-if="selectedNode.type === 'fields'">
            <h3 class="text-xl font-bold text-pink-700 mb-4 text-center">字段信息</h3>
            <div class="space-y-2 text-left w-full">
              <p><span class="font-semibold text-gray-700">名称：</span><span class="text-gray-900">{{ field_name_formatter(selectedNode.name)
                  }}</span></p>
              <p v-if="selectedNode.chinese_name"><span class="font-semibold text-gray-700">中文名：</span><span
                  class="text-gray-900">{{ selectedNode.chinese_name }}</span></p>
              <p v-if="selectedNode.table_name"><span class="font-semibold text-gray-700">所属表：</span><span
                  class="text-gray-900">{{ selectedNode.table_name }}</span></p>
              <p v-if="selectedNode.data_type"><span class="font-semibold text-gray-700">数据类型：</span><span
                  class="text-gray-900">{{ selectedNode.data_type }}</span></p>
              <p v-if="selectedNode.is_primary_key"><span class="font-semibold text-gray-700">主键：</span><span
                  class="text-gray-900">{{ selectedNode.is_primary_key }}</span></p>
              <p v-if="selectedNode.is_nullable"><span class="font-semibold text-gray-700">可为空：</span><span
                  class="text-gray-900">{{ selectedNode.is_nullable }}</span></p>
              <p v-if="selectedNode.is_sensitive"><span class="font-semibold text-gray-700">敏感字段：</span><span
                  class="text-gray-900">{{ selectedNode.is_sensitive }}</span></p>
              <p v-if="selectedNode.description"><span class="font-semibold text-gray-700">描述：</span><span
                  class="text-gray-900">{{ selectedNode.description }}</span></p>
              <p v-if="selectedNode.ps"><span class="font-semibold text-gray-700">备注：</span><span
                  class="text-gray-900">{{ selectedNode.ps }}</span></p>
            </div>
          </template>
          <template v-else>
            <h3 class="text-xl font-bold text-gray-700 mb-4 text-center">节点信息</h3>
            <div class="space-y-2 text-left w-full">
              <p><span class="font-semibold text-gray-700">名称：</span><span class="text-gray-900">{{ selectedNode.name
                  }}</span></p>
            </div>
          </template>
        </div>
        <div v-else class="w-full flex flex-col items-center text-center">
          <p>点击左侧节点查看详细信息</p>
        </div>
        <div class="mt-8 w-full flex flex-col items-center text-center">
          <h4 class="mt-3 mb-3 text-lg font-semibold">图例</h4>
          <ul class="list-none p-0 m-0">
            <li class="flex items-center mb-3">
              <span class="inline-flex items-center justify-center w-8 h-6 mr-2.5">
                <span class="inline-block w-6 h-6 bg-[#4B8BF4] border-2 border-[#2B5DB9]"></span>
              </span>
              系统（systems）
            </li>
            <li class="flex items-center mb-3">
              <span class="inline-flex items-center justify-center w-8 h-6 mr-2.5">
                <span class="inline-block w-4.5 h-4.5 bg-[#F4B942] border-2 border-[#B97A2B] rotate-45"></span>
              </span>
              实例（instances）
            </li>
            <li class="flex items-center mb-3">
              <span class="inline-flex items-center justify-center w-8 h-6 mr-2.5">
                <span class="inline-block w-6 h-6 bg-[#43C59E] border-2 border-[#2B9B7A] rounded-md"></span>
              </span>
              数据库（databases）
            </li>
            <li class="flex items-center mb-3">
              <span class="inline-flex items-center justify-center w-8 h-6 mr-2.5">
                <svg width="28" height="24" viewBox="0 0 28 24" class="inline-block" style="vertical-align:middle">
                  <polygon points="14,3 26,22 2,22" fill="#F46A6A" stroke="#B92B2B" stroke-width="2.2" />
                </svg>
              </span>
              数据表（tables）
            </li>
            <li class="flex items-center mb-3">
              <span class="inline-flex items-center justify-center w-8 h-6 mr-2.5">
                <span class="inline-block w-5 h-5 bg-[#A16AE8] border-2 border-[#6B3FB9] rounded-full"></span>
              </span>
              字段（fields）
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import * as echarts from 'echarts';
import type { Systems, Instances, Databases, Tables, Fields, Links } from '../types/node.ts'


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
    symbolSize: [40, 40],
    itemStyle: { color: '#4B8BF4', borderColor: '#2B5DB9', borderWidth: 2, shadowBlur: 10, shadowColor: 'rgba(75,139,244,0.15)' },
    label: { color: '#222', fontWeight: 'bold', fontSize: 14 }
  },
  instances: {
    symbol: 'diamond',
    symbolSize: 36,
    itemStyle: { color: '#F4B942', borderColor: '#B97A2B', borderWidth: 2, shadowBlur: 10, shadowColor: 'rgba(244,185,66,0.15)' },
    label: { color: '#222', fontWeight: 'bold', fontSize: 14 }
  },
  databases: {
    symbol: 'roundRect',
    symbolSize: [32, 32],
    itemStyle: { color: '#43C59E', borderColor: '#2B8B6F', borderWidth: 2, shadowBlur: 10, shadowColor: 'rgba(67,197,158,0.15)' },
    label: { color: '#222', fontWeight: 'bold', fontSize: 14 }
  },
  tables: {
    symbol: 'triangle',
    symbolSize: [25, 25, 25],
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
    displayName: field.name // 只显示字段名部分
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

const nodeIdToNameMap = computed(() => {
  const map = new Map<string, string>();
  nodeTypeList.forEach(type => {
    (effectiveProps.value[type] as any[]).forEach((n, idx) => {
      const id = `${type}_${idx}`;
      map.set(id, n.name);
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
        relatedFieldIds.add(selectedNode.value.id ? String(selectedNode.value.id) : '');
        fixedLinks.value.forEach(link => {
          if (
            selectedNode.value &&
            link.source === selectedNode.value.id
          ) {
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
          arr.push({ ...n, type, id: nodeNameToIdMap.value.get(n.name) || `${type}_${idx}` });
        }
      });
    } else {
      (props[type] as any[]).forEach((n, idx) => {
        arr.push({ ...n, type, id: nodeNameToIdMap.value.get(n.name) || `${type}_${idx}` });
      });
    }
  });
  return arr;
});

const parentChain = computed(() => {
  if (!selectedNode.value) return [];
  const node = selectedNode.value;
  const arr = [node.id];
  let current = [node];
  for (let i = nodeTypeList.indexOf(current[0].type as NodeType) - 1; i >= 0; i--) {
    const type = nodeTypeList[i];
    const type_str = String(type).replace(/s$/, '') + '_name';

    const copy_current = current.slice();
    current = [];

    copy_current.forEach(item => {
      const parent_name = item[type_str].toString().split('、');
      parent_name.forEach((element: any) => {
        const res = effectiveProps.value[type].find((n: any) => element === n.name);
        if (res) {
          arr.push(nodeNameToIdMap.value.get(res.name));
          current.push(res as GraphNode);
        }
      });
    });
  }
  return arr;
});

const field_name_formatter = (name: string | undefined) => {
  if (name && name.includes('-')) {
    return name.split('-').slice(1).join('-');
  }
  return name;
}

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
    parentChain.value.forEach(id => relatedNodeIds.add(id));
    nodes = allNodes.value.map(node => {
      const style = getNodeStyle(node);
      if (relatedNodeIds.has(node.id)) {
        return { ...node, ...style, itemStyle: { ...style.itemStyle, opacity: 1 }, label: { ...style.label, show: true } };
      } else {
        return { ...node, ...style, itemStyle: { ...style.itemStyle, opacity: 0.1 }, label: { ...style.label, show: false } };
      }
    });
    links = fixedLinks.value.map(link => {
      if (relatedNodeIds.has(link.source) && relatedNodeIds.has(link.target)) {
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

  const ifAnime = !(selectedNode.value ? selectedNode.value.type === 'tables' : false);

  const option = {
    tooltip: {
      backgroundColor: '#fff',
      borderColor: '#eee',
      borderWidth: 1,
      textStyle: { color: '#222', fontSize: 13 },
      padding: 10,
      extraCssText: 'box-shadow:0 2px 8px rgba(0,0,0,0.08);',
      formatter: function(params: any) {
        if (params.data && params.data.type === 'fields') {
          return params.data.chinese_name;
        }
        if (params.dataType === 'edge') {
          return params.data.description;
        }
        return params.data && params.data.name ? params.data.name : params.name;
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        data: nodes,
        links: links,
        animation: true,
        label: {
          show: true,
          position: 'right',
          color: '#222',
          fontWeight: 'bold',
          fontSize: 13,
          formatter: function (params: any) {
            if (params.data && params.data.type === 'fields') {
              return params.data.chinese_name;
            }
            return params.data && params.data.name ? params.data.name : params.name;
          }
        },
        force: {
          repulsion: 250,
          edgeLength: 150,
          iterations: 20,
          layoutAnimation: true,
          animationDuration: ifAnime ? 500 : 150,
          animationEasing: 'ease-out',
          alphaDecay: 0.05,
          damping: 0.95,
          stiffness: 300,
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
  padding: 32px 32px;
  overflow-y: auto;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.graphrag-chart {
  width: 100%;
  height: 100vh;
  min-width: 350px;
}
</style>
