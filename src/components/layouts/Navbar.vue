<template>
  <nav class="navbar">
    <div class="container d-flex">
      <h1>Quick Data Grab</h1>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.navbar {
  background-color: rgb(0, 162, 255);
  z-index: 10;
  box-shadow: 0 3px 5px rgba(94, 94, 94, 0.212);
  position: relative;
}
h1 {
  color: rgb(255, 255, 255);
  font-weight: 400;
  font-size: 1.3rem;
  padding: 1rem 0;
}
</style>

