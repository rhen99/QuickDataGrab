<template>
  <div class="inputs">
    <div class="input-field">
      <select name="data_type" class="field">
        <option selected disabled>Select Data Type</option>
        <option>Users</option>
        <option>Todos</option>
        <option>Posts</option>
        <option>Business</option>
      </select>
    </div>
    <div class="input-field">
      <input type="range" step="1" min="1" max="1000" value="10" />
    </div>
    <div class="btns">
      <button>Download JSON</button>
      <button>Download SQL</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.inputs {
  overflow-y: hidden;
  width: 50%;
  padding: 2rem;
}
.input-field {
  width: 100%;
  padding: 0.5rem 0;
}
.field {
  width: 100%;
  font-size: 1.3rem;
  padding: 0.3rem 0.8rem;
}
input[type="range"] {
  width: 100%;
}
</style>
