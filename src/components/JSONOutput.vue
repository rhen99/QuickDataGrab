<template>
  <div class="json-output">
    <h5>JSON Output</h5>
  </div>
</template>
<script>
import hjs from "highlightjs/highlight.pack";
export default {
  name: "JSONOutput",
  props: ["jsonData"],
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
.json-output {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
h5 {
  background-color: rgb(255, 174, 0);
  color: #f4f4f4;
  padding: 0.3rem;
  font-size: 1rem;
}
</style>