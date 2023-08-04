<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { tokenService } from "../Services/tokenService.js";

export default {
  created() {
    tokenService.validarUsuario(this, this.$router);
  },
  setup() {
    const store = useUserStore();
    const { usuario } = storeToRefs(store);
    return {
      usuario,
      store,
    };
  },

  methods: {
    async salir() {
      this.store.borrarStore();
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    redireccionar() {
      const rutaActual = this.$route.path;
      const rutaDestino = rutaActual === "/MiPerfil" ? "/Home" : "/MiPerfil";
      this.$router.push(rutaDestino);
    },
  },
};
</script>

<template>
  <div class="navbar-container">
    <ul class="navbar">
      <li>
        <h3 v-if="usuario.nombre !== ''" @click="redireccionar" style="cursor: pointer">
          {{ usuario.isAdmin ? 'Administrador: ' : 'Usuario: ' }}{{ usuario.nombre }}
        </h3>
      </li>
      <li v-if="usuario.isAdmin">
        <RouterLink :to="'/ListaUsuarios'">Lista de Usuarios</RouterLink>
      </li>
      <li v-if="!usuario.isAdmin">
        <RouterLink :to="'/AgregarCredencial'">Nueva credencial</RouterLink>
      </li>
      <li v-if="!usuario.isAdmin">
        <RouterLink :to="'/ListaDeCredenciales'">Lista de Credenciales</RouterLink>
      </li>
      <button v-if="usuario.nombre !== ''" @click="salir" class="nav-link btn btn-outline-danger">Salir</button>
    </ul>
  </div>
</template>


<style>

  .navbar-container {
    background-color: rgba(191, 191, 191, 0.084);
    box-shadow: 0px 5px 5px rgba(93, 93, 93, 0.345);
    display: flex;
    justify-content: center;
    height: 4em;
    align-items: center;
    margin-bottom: 1em;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    overflow: hidden;
    width: 90%;
    max-width: 90em;
    margin: auto;
  }

  ul.navbar li a {
    display: block;
    color: #333;
    text-align: center;
    text-decoration: none;
  }

  ul.navbar li a:hover {
    font-weight: bold;
  }

  .navbar button {
    margin: 0;
  }
</style>