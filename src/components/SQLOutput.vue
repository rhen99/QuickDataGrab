<template>
  <div class="sql-output">
    <h5>SQL Output</h5>
  </div>
</template>
<script>
import hjs from "highlightjs/highlight.pack";
export default {
  name: "SQLOutput",
  props: ["sqlData"],
  created() {
    hjs.initHighlightingOnload();
  }
};
</script>
<style scoped>
@import url("../../node_modules/highlightjs/styles/default.css");
pre {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.sql-output {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
h5 {
  background-color: rgb(64, 41, 167);
  color: #f4f4f4;
  padding: 0.3rem;
  font-size: 1rem;
}
</style>