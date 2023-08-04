
<script>
import { userService } from "../Services/userService.js"
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
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
      email: '',
      pass: '',
      vue: this
    };
  },

  methods: {
    async enviarCorreoNuevaPass(vue) {
      try {
        await userService.enviarCorreoNuevaPass(this.email);
        alert('Se ha enviado un correo para generar una nueva contraseña');
        if (this.usuario.token !== '') {
          vue.$router.push("/EditarPerfil");
        } else {
          vue.$router.push("/");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }

  }
};
</script>

<template>
    <div class="enviarCorreoNuevaPass-container">
      <h1>Generar nueva contraseña</h1>
      <form @submit.prevent="enviarCorreoNuevaPass(vue)">
        <div class="form-group">
          <label for="email">Ingrese su correo electrónico:</label>
          <input type="email" v-model="email" class="form-control" id="exampleInputPassword1" required />
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <button type="submit" class="btn btn-outline-primary btn-sm">Enviar correo</button>
          <RouterLink to="/">
            <button class="btn btn-outline-secondary btn-sm">Volver</button>
          </RouterLink>
        </div>
      </form>
    </div>
</template>


<style>
.enviarCorreoNuevaPass-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 76em;
  padding: 1em 0;
}

.enviarCorreoNuevaPass-container h1 {
  text-align: center;
}
</style>
