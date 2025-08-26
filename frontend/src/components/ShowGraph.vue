
<script setup lang="ts">
import GraphEcharts from "./GraphEcharts.vue";
import { useRoute } from 'vue-router';
import { ref, onMounted } from "vue";
import axios from "axios";


const route = useRoute();
const id = route.params.id;

const systems = ref([]);
const instances = ref([]);
const databases = ref([]);
const tables = ref([]);
const fields = ref([]);
const links = ref([]);

onMounted(() => {
  console.log("Fetching graph data for ID:", id);
  axios.get(`http://10.4.20.29:5000/get-graph`, {params: {conversation_id: id}})
    .then(response => {
      const data = response.data;
      systems.value = data.systems || [];
      instances.value = data.instances || [];
      databases.value = data.databases || [];
      tables.value = data.tables || [];
      fields.value = data.fields || [];
      links.value = data.links || [];
    })
    .catch(error => {
      console.error("There was an error fetching the graph data!", error);
    });
});
</script>

<template>
  <div class="card">
    <div style="border: 1px solid #eee; border-radius: 4px; padding: 16px;">
  <graph-echarts :systems="systems" :instances="instances" :databases="databases" :tables="tables" :fields="fields" :links="links"></graph-echarts>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
