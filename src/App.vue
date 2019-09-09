<template>
  <div id="app">
    <Navbar />
    <div class="main-area">
      <Inputs />
      <About />
      <Tutorials />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar";
import Inputs from "./components/Inputs";
import About from "./components/About";
import Tutorials from "./components/Tutorials";
import Footer from "./components/Footer";
export default {
  name: "app",
  components: {
    Navbar,
    Inputs,
    About,
    Tutorials,
    Footer
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
  background-color: #f5f2f2;
}
.d-flex {
  display: flex;
  width: 100%;
}
.d-grid {
  display: grid;
}
.container {
  width: 1100px;
  margin: auto;
  padding: 0 1rem;
}
.main-area {
  min-height: 100vh;
}
</style>
