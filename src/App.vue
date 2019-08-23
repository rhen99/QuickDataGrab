<template>
  <div id="app">
    <Navbar />
    <div class="main-area">
      <Inputs />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar";
import Inputs from "./components/Inputs";
export default {
  name: "app",
  components: {
    Navbar,
    Inputs
  },
  data() {
    return {
      data: []
    };
  },
  methods: {}
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
  background-color: #fff;
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
  height: 100vh;
}
</style>
