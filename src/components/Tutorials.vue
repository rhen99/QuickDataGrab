<template>
  <div class="tutorials">
    <div class="container">
      <h1>How To's</h1>
      <div class="tutorials d-grid">
        <div class="card">
          <a
            href="https://levelup.gitconnected.com/firebase-import-json-to-firestore-ed6a4adc2b57"
            target="_blank"
          >How To Import To Firebase?</a>
        </div>
        <div class="card">
          <a
            href="https://docs.mongodb.com/manual/reference/program/mongoimport/"
            target="_blank"
          >How To Import To MongoDB?</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tutorials"
};
</script>
<style scoped>
.tutorials {
  height: 40vh;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 50px;
  grid-gap: 1rem;
  margin: 1rem 0;
}
a {
  background-color: #fff;
  display: block;
  padding: 1rem 0.6rem;
  text-decoration: none;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 3px;
  transition: all 300ms;
}
a:hover {
  background-color: rgb(0, 162, 255);
  color: #fff;
}
</style>