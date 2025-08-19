<script setup lang="ts">
import GraphEcharts from "./GraphEcharts.vue";

defineProps<{ msg: string }>();

const sampleNodes = [
  { id: "1", name: "节点A" },
  { id: "2", name: "节点B" },
  { id: "3", name: "节点C" },
  { id: "4", name: "节点D" },
];

const sampleLinks = [
  { source: "1", target: "2" },
  { source: "2", target: "3" },
  { source: "3", target: "4" },
  { source: "4", target: "1" },
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
