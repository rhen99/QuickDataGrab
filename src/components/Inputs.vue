<template>
  <div class="inputs">
    <h1>Get Data Very Quickly</h1>
    <div class="fields d-flex">
      <div v-if="errors.catch !== ''" class="error_flash">
        <p>{{errors.catch}}</p>
      </div>
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
        <span>{{errors.no_type}}</span>
      </div>
      <div class="input-field">
        <label for="db">Table / Collection Name</label>
        <input type="text" v-model="db_name" id="db" class="db-name" />
        <span>{{errors.no_dbname}}</span>
      </div>
      <div class="input-field">
        <label>How Many?</label>
        <input type="range" class="slider" step="1" min="1" max="100" v-model="range" />
        <span class="counter">{{range}}</span>
      </div>
      <div class="btns input-field" v-if="gotData">
        <button class="btn json" @click="jsonDL">Download JSON</button>
        <button class="btn sql" @click="sqlDL">Download SQL</button>
      </div>
      <div class="btns input-field" v-else>
        <button class="btn-block generate" @click="generateData">Generate Data</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from "./firebase/firebaseInit";
import FileSaver from "file-saver";
export default {
  name: "Inputs",
  data() {
    return {
      errors: {
        catch: "",
        no_type: "",
        no_dbname: ""
      },
      jsonData: "",
      sqlData: ``,
      dropped: false,
      range: 10,
      dropDownCurrent: "Select the Data You Want Here...",
      gotData: false,
      data: [],
      db_name: ""
    };
  },
  methods: {
    drop() {
      this.dropped = !this.dropped;
    },
    generateData() {
      if (this.chosenData !== "" && this.db_name !== "") {
        const limit = parseInt(this.range);
        const docRef = db.collection(this.chosenData).limit(limit);
        docRef
          .get()
          .then(qss => {
            if (qss || qss.exists) {
              this.errors.no_dbname = "";
              this.errors.no_type = "";
              this.errors.catch = "";
              qss.forEach(doc => {
                this.data.push(doc.data());
              });
              this.jsonify(this.data);
              this.sqlify(this.data);
              this.gotData = true;
            }
          })
          .catch(() => {
            this.errors.catch = `Something went wrong, please check your internet connection, and try again.`;
          });
      } else {
        this.errors.no_dbname = "Please fill in all fields.";
        this.errors.no_type = "Please fill in all fields.";
        return false;
      }
    },

    select(e) {
      e.preventDefault();
      this.dropDownCurrent = e.target.innerHTML;
      this.chosenData = e.target.dataset["type"];
      this.dropped = false;
    },
    jsonify(data) {
      let json = data.map(item => {
        return JSON.stringify(item);
      });
      this.jsonData = `[${json}]`;
    },
    jsonDL() {
      const jsonBlob = new Blob([this.jsonData], { type: "application/json" });
      FileSaver.saveAs(jsonBlob, `${this.db_name}.json`);
    },
    setPropType(prop) {
      const digit = /^\d+$/;

      if (typeof prop === "string") {
        if (digit.test(prop)) {
          return "int(11)";
        } else {
          if (prop.length > 255) {
            return "text";
          } else {
            return "varchar(255)";
          }
        }
      } else if (typeof prop === "boolean") {
        return "BOOLEAN";
      } else if (Array.isArray(prop)) {
        prop.join(",");
        if (prop.length > 255) {
          return "text";
        } else {
          return "varchar(255)";
        }
      }
    },
    createProp(key, val) {
      return `\`${key}\` ${this.setPropType(val)} NOT NULL,\n\t`;
    },

    makeTable(cols) {
      let props = "";
      delete cols[0].id;

      Object.keys(cols[0]).forEach((key, i) => {
        props += this.createProp(key, Object.values(cols[0])[i]);
      });

      let table = `CREATE TABLE \`${this.db_name}\` (
        \`id\` int(11) NOT NULL AUTO_INCREMENT,
        ${props}\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(\`id\`)
      );
      \n`;
      return table;
    },
    makeInserts(rows) {
      const digit = /^\d+$/;
      let inserts = "";
      const insertables = [];

      const cols = Object.keys(rows[0]).map(key => {
        return "`" + key + "`";
      });

      rows.forEach(row => {
        const rowVal = Object.values(row);
        const mappedVals = rowVal.map(val => {
          if (
            !digit.test(val) &&
            typeof val !== "boolean" &&
            !Array.isArray(val)
          ) {
            return `'${val}'`;
          } else if (Array.isArray(val)) {
            return `'${val.join(",")}'`;
          } else {
            return val;
          }
        });
        const values = `(${mappedVals.join(", ")})`;
        insertables.push(values);
      });

      inserts = `INSERT INTO \`${this.db_name}\` (${cols.join(
        ", "
      )}) VALUES \n ${insertables.join(",\n")};`;
      return inserts;
    },
    sqlify(data) {
      let inserts = this.makeInserts([...data]);
      let table = this.makeTable([...data]);

      this.sqlData = `${table} ${inserts}`;
    },
    sqlDL() {
      const sqlBlob = new Blob([this.sqlData], { type: "plain/text" });
      FileSaver.saveAs(sqlBlob, `${this.db_name}.sql`);
    }
  }
};
</script>

<style scoped>
.inputs {
  overflow-y: hidden;
  width: 100%;
  padding: 2rem;
  height: 80%;
}
h1 {
  font-weight: 500;
  text-align: center;
  font-size: 1.7rem;
}
.fields {
  margin-top: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input-field {
  width: 50%;
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
.error_flash {
  padding: 1rem;
  background-color: rgb(255, 143, 143);
  color: rgb(185, 0, 0);
}
span {
  display: inline-block;
  color: rgb(185, 0, 0);
  padding: 0 0.5rem;
}
</style>
