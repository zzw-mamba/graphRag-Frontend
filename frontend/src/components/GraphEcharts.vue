<template>
  <div ref="chartRef" style="width: 100%; height: 400px;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
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

const renderChart = () => {
  if (!chartRef.value) return;
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value);
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
/* 可根据需要自定义样式 */
</style>
