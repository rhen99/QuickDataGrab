<template>
  <div id="app">
    <Navbar />
    <div class="main-area d-flex">
      <Inputs v-on:generated="changeOutput" />
      <Output v-bind:currentOutput="currentOutput" v-bind:currentOutputProps="currentOutputProps" />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar";
import Inputs from "./components/Inputs";
import Output from "./components/Output";
export default {
  name: "app",
  components: {
    Navbar,
    Inputs,
    Output
  },
  data() {
    return {
      currentOutput: "start",
      currentOutputProps: {}
    };
  },
  methods: {
    changeOutput() {
      this.currentOutput = "json";
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  font-family: "Roboto", sans-serif;
  line-height: 1.4;
  background-color: #ecf4ff;
}
.d-flex {
  display: flex;
  width: 100%;
}
.container {
  width: 1100px;
  margin: auto;
  padding: 0 1rem;
}
.main-area {
  height: 80vh;
}
</style>
