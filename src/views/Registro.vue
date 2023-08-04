<script>

import { userService } from "../Services/userService.js"

export default {

  data() {
    return {
      usuario:
      {
        nombre: "",
        email: "",
        fechaNacimiento: "",
        pass: "",
      },
      vue: this,
    };
  },
  methods: {

    async registerUser(vue) {
      try {
        const response = await userService.register(this.usuario);
        alert(response.data.message);
        vue.$router.push("/");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  }
};

</script>

<template>
  <div class="registro-container">
    <h1>Registrarse</h1>

    <form @submit.prevent="registerUser(vue)">
      <div class="form-group">
        <label>Nombre</label>
        <input v-model="usuario.nombre" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Correo Electrónico</label>
        <input v-model="usuario.email" type="email" class="form-control" id="exampleInputEmail1"
          aria-describedby="emailHelp" required />
      </div>
      <div class="form-group">
        <label for="fechaNacimiento">Fecha de nacimiento</label>
        <input type="date" id="fechaNacimiento" v-model="usuario.fechaNacimiento" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="usuario.pass" type="password" class="form-control" id="exampleInputPassword1" required />
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <button type="submit" class="btn btn-outline-primary btn-sm">Registrarse</button>
        <RouterLink to="/" class="btn btn-outline-secondary btn-sm">Volver</RouterLink>
      </div>
    </form>
  </div>
</template>

<style>
.registro-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 76em;
  padding: 1em 0;
}

.registro-container h1 {
  text-align: center;
}
</style>