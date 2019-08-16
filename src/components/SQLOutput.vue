<template>
  <div class="sql-output">
    <h5>SQL Output</h5>
  </div>
</template>
<script>
import hjs from "highlight.js";
export default {
  name: "SQLOutput",
  props: ["sqlData"],
  created() {
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("pre code").forEach(block => {
        hjs.highlightBlock(block);
      });
    });
  }
};
</script>
<style scoped>
@import url("../../node_modules/highlight.js/styles/default.css");
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