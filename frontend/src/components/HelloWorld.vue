<script setup lang="ts">
import GraphEcharts from "./GraphEcharts.vue";

defineProps<{ msg: string }>();

const sampleNodes = [
  { id: "1", name: "节点A", is_used: true },
  { id: "2", name: "节点B", is_used: true },
  { id: "3", name: "节点C", is_used: false },
  { id: "4", name: "节点D", is_used: false },
];

const sampleLinks = [
  { source: "1", target: "2", is_used: true },
  { source: "2", target: "3", is_used: false },
  { source: "3", target: "4", is_used: false },
  { source: "4", target: "1", is_used: true },
];
</script>

<template>
  <div class="card">
    <div style="border: 1px solid #eee; border-radius: 4px; padding: 16px;">
      <graph-echarts :nodes="sampleNodes" :links="sampleLinks"></graph-echarts>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
