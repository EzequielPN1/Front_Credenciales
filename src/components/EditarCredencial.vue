<template>
  <Barra></Barra>
  <div class="ingresarCredencial-container">
    <h1>Editar credencial</h1>

    <form @submit.prevent="guardarCambiosCredencial">
      <div class="form-group">
        <label>Nombre de la App</label>
        <input v-model="credencial.nombreApp" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Usuario</label>
        <input v-model="credencial.nomAcceso" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="credencial.pass" type="password" class="form-control" required />
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <button type="submit" class="btn btn-outline-primary btn-sm">Guardar cambios</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import Barra from "../components/NavBar.vue";
import { userCredencial } from "../Services/credencialService.js";
import { useUserStore } from "../stores/user";

export default {
  components: {
    Barra,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const instance = getCurrentInstance(); 
    const store = useUserStore();
    const { usuario } = store;

    const credencial = ref({
      nombreApp: "",
      nomAcceso: "",
      pass: "",
    });

    const obtenerCredencial = async () => {
      try {
        const response = await userCredencial.obtenerCredencialPorId(localStorage.getItem("token"), props.id);
        credencial.value = response.data;
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    onMounted(() => {
      obtenerCredencial(props.id);
    });

    const guardarCambiosCredencial = async () => {
      try {
        await userCredencial.editarCredencial(localStorage.getItem("token"), credencial.value);
        instance.proxy.$router.push("/ListaDeCredenciales");
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    return {
      usuario,
      credencial,
      guardarCambiosCredencial,
    };
  },
};
</script>

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
