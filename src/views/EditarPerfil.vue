<script>
  import { storeToRefs } from "pinia";
  import { userService } from "../Services/userService.js"
  import { useUserStore } from "../stores/user";
  import Barra from "../components/NavBar.vue"
 
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
        usuarioModificable:
        {
          nombre: '',
          email:'',
          fechaNacimiento:'',
          pass:'',
          isAdmin:false,
          token:''
        },

        vue: this,
      };
    },
    methods: {

      async guardarPerfil(vue) {
        try {
        const usuarioEditado = {
          nombre: this.usuarioModificable.nombre !== '' ? this.usuarioModificable.nombre : this.usuario.nombre,
          email: this.usuarioModificable.email !== '' ? this.usuarioModificable.email : this.usuario.email,
          fechaNacimiento: this.usuario.fechaNacimiento,
          isAdmin:this.usuario.isAdmin,
          token: this.usuario.token
        };
     
          const response = await userService.editarUsuario(usuarioEditado);
          this.usuario = response.data;
          vue.$router.push("/Home");
        } catch (error) {
          alert(error.response.data.message);
        }
      },

     async  cambiarContrasena() {
        try {
        await userService.enviarCorreoNuevaPass(this.usuario.email);
        alert('Se ha enviado un correo para generar una nueva contraseña');
        
      } catch (error) {
        alert(error.message);
      }
    }

    },
    components: {
      Barra,
    },
  };
</script>

<template>
  <Barra></Barra>
  <div class="editar-perfil-container">
    <form @submit.prevent="guardarPerfil(vue)">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input  type="text" id="nombre" v-model="usuarioModificable.nombre" :placeholder="usuario.nombre"  class="form-control" >
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Correo Electrónico</label>
        <input v-model="usuarioModificable.email" type="email"  :placeholder="usuario.email" class="form-control" id="exampleInputEmail1"
          aria-describedby="emailHelp"  />
      </div>
      <div class="form-group">
        <label for="fechaNacimiento">Fecha de nacimiento</label>
        <input type="date" id="fechaNacimiento" v-model="usuario.fechaNacimiento" class="form-control" />
      </div>
      <div class="button-container">
        <button type="submit" class="btn btn-outline-primary btn-sm">Guardar</button>
        <button @click="cambiarContrasena()" class="btn btn-outline-secondary btn-sm">Cambiar contraseña</button>
        <router-link to="/EliminarCuenta" class="btn btn-outline-secondary btn-sm">Eliminar cuenta</router-link>
      </div>
    </form>
  </div>
</template>

<style>
  .editar-perfil-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 76em;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
  }



</style>
