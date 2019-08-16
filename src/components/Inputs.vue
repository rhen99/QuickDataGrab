<template>
  <div class="inputs">
    <h1>Generate Dummy Data For Your Projects</h1>
    <div class="fields">
      <div class="input-field">
        <div name="data_type" class="select">
          <p @click="drop">
            {{dropDownCurrent}}
            <i
              class="fas icon"
              :class="{'fa-caret-up': dropped, 'fa-caret-down': !dropped}"
            ></i>
          </p>
          <div class="options" :class="{'droplist': dropped}">
            <a href="#" @click="select" data-type="users">Users</a>
            <a href="#" @click="select" data-type="todos">Todos</a>
            <a href="#" @click="select" data-type="posts">Posts</a>
            <a href="#" @click="select" data-type="business">Businesses</a>
          </div>
        </div>
      </div>
      <div class="input-field">
        <label for="db">Database Name</label>
        <input type="text" id="db" class="db-name" />
      </div>
      <div class="input-field">
        <label>How Many?</label>
        <input type="range" class="slider" step="1" min="1" max="100" v-model="range" />
        <span class="counter">{{range}}</span>
      </div>
      <div class="btns input-field" v-if="gotData">
        <button class="btn json">Download JSON</button>
        <button class="btn sql">Download SQL</button>
      </div>
      <div class="btns input-field" v-else>
        <button class="btn-block generate" @click="generateData">Generate Data</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from "./firebase/firebaseInit";
export default {
  name: "Inputs",
  data() {
    return {
      chosenData: "",
      dropped: false,
      range: 10,
      dropDownCurrent: "Select the Data You Want Here...",
      gotData: false,
      data: []
    };
  },
  methods: {
    drop() {
      this.dropped = !this.dropped;
    },
    generateData() {
      this.gotData = true;
      const docRef = db.collection(this.chosenData);
      docRef
        .get()
        .then(qss => {
          qss.forEach(doc => {
            this.data.push(doc.data());
          });
          console.log(this.data);
        })
        .catch(err => console.log(err));
      this.$emit("generated");
    },

    select(e) {
      e.preventDefault();
      this.dropDownCurrent = e.target.innerHTML;
      this.chosenData = e.target.dataset["type"];
      this.dropped = false;
    }
  },
  created() {}
};
</script>

<style scoped>
.inputs {
  background-color: #fff;
  overflow-y: hidden;
  width: 50%;
  padding: 2rem;
}
h1 {
  font-weight: 500;
  text-align: center;
  font-size: 1.7rem;
}
.fields {
  margin-top: 2rem;
}
.input-field {
  width: 100%;
  padding: 0.5rem 0;
  position: relative;
  margin: 0.5rem 0;
}
label {
  font-weight: 500;
  font-size: 1.2rem;
  padding: 5px;
}
.db-name {
  border: 1px solid rgb(165, 165, 165);
  width: 100%;
  font-size: 1.3rem;
  padding: 3px 10px;
  border-radius: 5px;
}
input[type="range"] {
  width: 100%;
  outline: none;
}
.select {
  width: 100%;
  background-color: #fff;
  max-height: 500px;
  overflow: hidden;
  border-radius: 10px;
  color: rgb(41, 85, 167);
}
.select p {
  padding: 1rem;
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;
  cursor: pointer;
  transition: all 300ms;
}
.select p:hover {
  background-color: rgb(41, 85, 167);
  color: #fff;
}
.icon {
  position: absolute;
  right: 3%;
}
.options {
  max-height: 0;
  overflow: auto;
  transition: max-height 300ms;
}
.droplist {
  max-height: 216px;
}
a {
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: rgb(41, 85, 167);
  transition: color 200ms;
}
a:hover {
  background-color: rgb(41, 85, 167);
  color: #fff;
}
.slider {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 2px;
  background-color: rgb(70, 106, 172);
  position: relative;
  margin: 1.8rem 0;
}
.slider::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 20px;
  width: 20px;
  background: linear-gradient(180deg, #f4f4f4, rgb(197, 196, 196), #f4f4f4);
  border-radius: 50%;
  border: 3px solid rgb(41, 85, 167);
}

.slider::-moz-range-thumb {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 15px;
  width: 15px;
  background: linear-gradient(180deg, #f4f4f4, rgb(197, 196, 196));
  border-radius: 50%;
}
.slider::-ms-thumb {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 15px;
  width: 15px;
  background: linear-gradient(180deg, #f4f4f4, rgb(197, 196, 196));
  border-radius: 50%;
}
.counter {
  position: absolute;
  bottom: 0;
  right: 2%;
  background-color: rgb(41, 85, 167);
  color: #f4f4f4;
  padding: 5px;
  border-radius: 10px;
}
.btns {
  text-align: center;
}
.btn {
  font-size: 1.5rem;
  border: 0;
  outline: 0;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 300ms;
  border-radius: 10px;
}
.btn:active {
  transform: scale(0.95);
}
.btn.json {
  background-color: rgb(255, 174, 0);
  color: #f4f4f4;
}
.btn.sql {
  background-color: rgb(64, 41, 167);
  color: #f4f4f4;
}
.btn-block {
  margin: 0;
  width: 70%;
  border: 0;
  outline: 0;
  font-size: 2.3rem;
  font-weight: 600;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 300ms;
}
.btn-block.generate {
  background-color: rgb(41, 85, 167);
  color: #fff;
}
.btn-block:active {
  transform: scale(0.95);
}
</style>
