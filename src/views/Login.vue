<script >
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { userService } from "../Services/userService.js"


export default {
  setup() {
    const store = useUserStore();
    const { usuario } = storeToRefs(store);
    return {
      usuario,
    };
  },
  data() {
    return {
      credenciales: {
        email: "",
        pass: "",
      },
      vue: this,

    };
  },
  methods: {
    async loguear(credenciales) {
      try {
        const response = await userService.login(credenciales);
        this.usuario = response.data;
        localStorage.setItem('token', this.usuario.token);
        this.$router.push("/Home");
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
};
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="loguear(credenciales, vue)">
      <div class="form-group">
        <label for="exampleInputEmail1">Correo Electrónico</label>
        <input v-model="credenciales.email" type="email" class="form-control" id="exampleInputEmail1"
          aria-describedby="emailHelp" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Contraseña</label>
        <input v-model="credenciales.pass" type="password" class="form-control" id="exampleInputPassword1" required />
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <button type="submit" class="btn btn-outline-primary">Entrar</button>
        <RouterLink to="/GenerarPass" class="btn btn-outline-secondary btn-sm">Olvidó su contraseña?</RouterLink>
        <RouterLink to="/" class="btn btn-outline-secondary btn-sm">Volver</RouterLink>
      </div>
    </form>
  </div>
</template>

<style>

  .login-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 76em;
    padding-top: 1em;
  }

  .login-container h1 {
    text-align: center;
  }




</style>