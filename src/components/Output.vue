<template>
  <div class="output">
    <div class="switch-output" v-if="currentOutput !== 'start'">
      <button class="btn json" @click="currentOutput = 'json'">View JSON</button>
      <button class="btn sql" @click="currentOutput = 'sql'">View SQL</button>
    </div>
    <component :is="currentOutput" v-bind="currentDataOutput" />
  </div>
</template>
<script>
import JSONOutput from "./JSONOutput";
import SQLOutput from "./SQLOutput";
import Start from "./Start";
export default {
  components: {
    json: JSONOutput,
    sql: SQLOutput,
    start: Start
  },
  name: "Output",
  created() {},
  data() {
    return {
      requested: false,
      currentOutput: "start",
      currentDataOutput: {}
    };
  },
  computed: {}
};
</script>
<style scoped>
.output {
  position: relative;
  height: 100%;
  width: 50%;
}
.switch-output {
  display: block;
  padding: 1rem;
  background-color: #fff;
}
.btn {
  margin: 0 0.5rem;
  border: 0;
  outline: 0;
  font-size: 1.1rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
}
.btn.json {
  background-color: rgb(255, 174, 0);
  color: #f4f4f4;
}
.btn.sql {
  background-color: rgb(64, 41, 167);
  color: #f4f4f4;
}
</style>