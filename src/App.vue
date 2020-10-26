<template>
  <div id="app" class="container">
    <div
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <table>
              <tr>
                <td>Nombre</td>
                <td><input v-model="name_editado" type="text"/></td>
              </tr>
              <tr>
                <td>Apellido</td>
                <td><input v-model="lastname_editado" type="text"/></td>
              </tr>
              <button @click="update">Editar</button>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="add_datos">
      <table>
        <tr>
          <td>Nombre</td>
          <td><input v-model="name" type="text"/></td>
        </tr>

        <tr>
          <td>Apellido</td>
          <td><input v-model="lastname" type="text" /></td>
        </tr>
      </table>
    </div>
    <b-button @click="create" variant="outline-dark" class="btn_add_datos">Agregar</b-button>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ user.data.name }}</td>
          <td>{{ user.data.lastname }}</td>
          <td>
            <button
              data-toggle="modal"
              data-target="#exampleModal"
              @click="setInformation(user.data.name, user.data.lastname, user.id)"
              class="btn btn-primary">Editar
            </button>

            <button @click="Delete(user.id)" class="btn btn-dark ml-2">Eliminar</button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import Login from "@/components/Login.vue";
import firebase from "firebase";

export default {
  name: "App",
  components: {
    Login,
  },
  data() {
    return {
      loading: true,
      users: [],
      name: "",
      lastname: "",
      name_editado: "",
      lastname_editado: "",
      id_editado: "",
    };
  },
  mounted() {
    this.read();
    // this.create()
    // this.update()
    // this.delete();
  },
  methods: {
    setInformation(name, lastname, id) {
      this.name_editado = name;
      this.lastname_editado = lastname;
      this.id_editado = id;
    },
    read() {
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((snapshot) => {
          this.users = [];
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            this.users.push({
              id: doc.id,
              data: doc.data(),
            });
          });
        });
    },
    create() {
      firebase
        .firestore()
        .collection("users")
        .add({
          name: this.name,
          lastname: this.lastname,
        })
        .then(() => {
          console.log("Información enviada");
        });
    },
    update() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.id_editado)
        .update({
          name: this.name_editado,
          lastname: this.lastname_editado,
        })

        .then(() => {
          console.log("Información enviada");
        });
    },
    Delete(id) {
      firebase.firestore()
      .collection('users')
      .doc(id)
      .delete();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Syne Mono', monospace;
  text-align: center;
  color: #0f3b68;
}
.btn_add_datos {
  display: flex;
  justify-content: flex-end;
  margin: 30px;
  
}

.add_datos {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>
