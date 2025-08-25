<script setup lang="ts">
import GraphEcharts from "./GraphEcharts.vue";

defineProps<{ msg: string }>();
import { systems, instances, databases, tables, fields, links } from '../../demo/demo16Data';

</script>

<template>
  <div class="card">
    <div style="border: 1px solid #eee; border-radius: 4px; padding: 16px;">
      <graph-echarts :systems="systems" :instances="instances" :databases="databases" :tables="tables" :fields="fields"
        :links="links"></graph-echarts>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
