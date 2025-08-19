
<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-left">
          <div ref="chartRef" class="chart-panel"></div>
        </div>
        <div class="modal-right">
          <div v-if="selectedNode">
            <h3>节点信息</h3>
            <p><strong>ID:</strong> {{ selectedNode.id }}</p>
            <p><strong>名称:</strong> {{ selectedNode.name }}</p>
            <div v-for="[key, val] in nodeEntries" :key="key">
              <p><strong>{{ key }}:</strong> {{ val }}</p>
            </div>
          </div>
          <div v-else>
            <p>点击左侧节点查看详细信息</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import * as echarts from 'echarts';

interface Node {
  id: string;
  name: string;
  [key: string]: any;
}

interface Link {
  source: string;
  target: string;
  [key: string]: any;
}

const props = defineProps<{
  nodes: Node[];
  links: Link[];
}>();


const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
const selectedNode = ref<Node | null>(null);

const nodeEntries = computed(() => {
  if (!selectedNode.value) return [];
  // Exclude id and name if you don't want to repeat them
  return Object.entries(selectedNode.value).filter(([key]) => key !== 'id' && key !== 'name');
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
  const option = {
    tooltip: {},
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        data: props.nodes,
        links: props.links,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        force: {
          repulsion: 100,
          edgeLength: 80
        },
        lineStyle: {
          color: '#aaa'
        }
      }
    ]
  };
  chartInstance.setOption(option);
};

onMounted(() => {
  renderChart();
});

watch(() => [props.nodes, props.links], () => {
  renderChart();
}, { deep: true });
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-wrapper {
  width: 70vw;
  max-width: 900px;
  min-width: 600px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  padding: 0;
}
.modal-container {
  display: flex;
  flex-direction: row;
  height: 60vh;
}
.modal-left {
  flex: 2;
  border-right: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
}
.modal-right {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
.chart-panel {
  width: 100%;
  height: 50vh;
  min-width: 350px;
}
</style>
