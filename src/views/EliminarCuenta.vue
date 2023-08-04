
<script>
import { storeToRefs } from "pinia";
import { userService } from "../Services/userService.js"
import { useUserStore } from "../stores/user";
import Barra from "../components/NavBar.vue"

export default {
  components: {
      Barra,

    },
  setup() {
    const store = useUserStore();
    const { usuario } = storeToRefs(store);
    return {
      usuario,
    };
  },
  data() {
    return {
      pass: '',
      vue: this,
    };
  },
  methods: {
    async eliminarCuenta(vue) {
      try {

        const confirmacion = window.confirm("¿Estás seguro de eliminar de eliminar la cuenta?");

        if (confirmacion) {
        const response = await userService.eliminarUsuario(this.usuario.token,this.pass);
        alert(response.data.message);
        vue.$router.push("/");
        }
      } catch (error) {
        
        alert(error.response.data.message);
        vue.$router.push("/MiPerfil");
      }
    
    
    },
  },
};
</script>




<template>
   <Barra></Barra>
  <div class="eliminarCuenta-container">
  <h1>Eliminar Cuenta</h1>
  <form @submit.prevent="eliminarCuenta(vue)">
    <div class="form-group">
      <label for="exampleInputPassword1">Ingrese su password</label>
      <input v-model="this.pass" type="password" class="form-control" id="exampleInputPassword1" required />
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <button type="submit" class="btn btn-outline-primary btn-sm">Confirmar</button>
    </div>
  </form>
</div>
</template>
  

<style>

.eliminarCuenta-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 76em;
  padding: 1em 0;
}

.eliminarCuenta-container  h1 {
  text-align: center;
}

</style>