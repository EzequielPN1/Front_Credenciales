<script>
import { ref, onMounted, watch } from "vue";
import { administradorService } from "../Services/administradorService.js";
import Barra from "../components/NavBar.vue";
import { useUserStore } from "../stores/user";

export default {
  components: {
    Barra,
  },
  setup() {
    const usuarios = ref([]);
    const { usuario } = useUserStore();

    const obtenerUsuarios = async () => {
      try {
        const response = await administradorService.obtenerUsuarios();
        usuarios.value = response.data;
      
      } catch (error) {
        alert(error.response.data.message);
      }
    };

   
    onMounted(() => {
      obtenerUsuarios();
    });

   
    watch(usuarios, () => {
      console.log("Usuarios actualizados:", usuarios.value);
    });

    return {
      usuarios,usuario
    };
  },
  methods: {
    
    async editarAdministrador(usuario) {
      try {
        if (usuario.isAdmin) {
          usuario.isAdmin=false
        } else {
          usuario.isAdmin=true
        }

        await administradorService.editarAdministrador(this.usuario.token,usuario);

        const response = await administradorService.obtenerUsuarios();
        this.usuarios.value = response.data;
      } catch (error) {
        alert("Error al actualizar el estado de administrador del usuario.");
      }
    },


    async eliminarUsuario(usuario) {
  try {
   
    const confirmacion = window.confirm("¿Estás seguro de eliminar al usuario?");

    if (confirmacion) {
      await administradorService.eliminarCuenta(this.usuario.token,usuario._id);
      const index = this.usuarios.findIndex(item => item._id === usuario._id);
                    if (index !== -1) {
                        this.usuarios.splice(index, 1);
                    }
    } 
  } catch (error) {
    alert("Error al eliminar el usuario.");
  }
},

  },
};
</script>


<template>
  <Barra></Barra>
  <div>
    <div class="tabla-container">
      <h1>Lista de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de Nacimiento</th>
            <th>Registro</th>
            <th>Es Admin</th>
            <th>Cuenta</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.fechaNacimiento }}</td>
            <td>{{ usuario.registro ? "Sí" : "No" }}</td>
            <td>
              <button
                @click="editarAdministrador(usuario)"
                :class="{'btn-admin-activo': usuario.isAdmin, 'btn-admin-inactivo': !usuario.isAdmin}"
                class="btn btn-outline-primary btn-sm"
              >
                {{ usuario.isAdmin ? "on" : "off" }}
              </button>
            </td>
            <td>
              <button @click="eliminarUsuario(usuario)" class="btn btn-danger btn-sm">
                borrar
              </button>
            </td>
          </tr>
          <tr v-if="usuarios.length === 0">
            <td colspan="7">No hay usuarios disponibles</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style>
table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:nth-child(odd) {
  background-color: #ffffff;
}

tbody tr td {
  border-top: 1px solid #dddddd;
}

.tabla-container {
  width: 80%;
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 76em;
}

/* Estilos para el botón de administrador activo (azul) */
.btn-admin-activo {
  background-color: rgb(0, 140, 255);
  color: white;
}

/* Estilos para el botón de administrador inactivo (gris) */
.btn-admin-inactivo {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}

</style>

