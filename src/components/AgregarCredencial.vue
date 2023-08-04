<script>
 import { storeToRefs } from "pinia";
import Barra from "../components/NavBar.vue";
import { userCredencial } from "../Services/credencialService.js"
import { useUserStore } from "../stores/user";
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
      credencial:
      {
        nombreApp: "",
        nomAcceso: "",
        pass: "",
      },
      vue: this,
    };
  },
  methods: {

    async ingresarCredencial(vue) {
      try {
        const response = await userCredencial.ingresarCredencial(this.usuario.token,this.credencial);
        alert(response.data.message);
        vue.$router.push("/Home");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  }
};

</script>

<template>
   <Barra></Barra>
  <div class="ingresarCredencial-container">
    <h1>Nueva credencial</h1>

    <form @submit.prevent="ingresarCredencial(vue)">
      <div class="form-group">
        <label>Nombre del servicio</label>
        <input v-model="credencial.nombreApp" class="form-control" required />
      </div>
      <div class="form-group">
        <label >Usuario</label>
        <input v-model="credencial.nomAcceso"  class="form-control" required />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="credencial.pass" type="password" class="form-control" required />
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <button type="submit" class="btn btn-outline-primary btn-sm">Agregar</button>
      </div>
    </form>
  </div>
</template>

<style>
.ingresarCredencial-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 76em;
  padding: 1em 0;
}

.ingresarCredencial-container h1 {
  text-align: center;
}
</style>