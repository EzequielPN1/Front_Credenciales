<script>
import { userService } from "../Services/userService.js"
export default {
  data() {
    return {
      nuevaContrasenia: '',
      id: '',
      token: '',
      vue: this,
    };
  },
  created() {
   
    this.token = this.getTokenFromUrl();
  },
  methods: {


    getTokenFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('token') || '';
    },

    async cambiarContrasenia() {
      try {
        const response = await userService.cambiarContrasenia(this.token, this.nuevaContrasenia);
        alert(response.data);
      } catch (error) {
        alert(error.response.data.message);
      }

      window.close();
    }


  }
};
</script>



<template>
  <div class="cambiarContrasenia-container" >
    <form @submit.prevent="cambiarContrasenia()">
      <label>Nueva contraseña:</label>
      <input type="password" v-model="nuevaContrasenia" class="form-control" id="exampleInputPassword1" required>
      <button type="submit" class="btn btn-primary">Cambiar contraseña</button>
    </form>
  </div>
</template>


<style>

  .cambiarContrasenia-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 76em;
    padding: 1em 0;
  }

  .cambiarContrasenia-container h1 {
    text-align: center;
  }

</style>
