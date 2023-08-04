
<script>
import { ref, onMounted, watch } from "vue";
import { userCredencial } from "../Services/credencialService.js";
import Barra from "../components/NavBar.vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router"; 


export default {
    components: {
        Barra,
    },

    setup() {
        const credenciales = ref([]);
        const { usuario } = useUserStore();
        const router = useRouter();
        const obtenerCredenciales = async () => {
            try {
                const response = await userCredencial.obtenerCredenciales(localStorage.getItem("token"));
                credenciales.value = response.data;
            } catch (error) {
                alert(error.response.data.message);
            }
        };

        onMounted(() => {
            obtenerCredenciales();
        });

        watch(credenciales, () => {
            console.log("credenciales actualizadas:", credenciales.value);
        });

        // Variable de estado para controlar la visibilidad del usuario y contraseña
        const mostrarUsuarios = ref(Array(credenciales.value.length).fill(false));
        const mostrarContraseñas = ref(Array(credenciales.value.length).fill(false));

        const mostrarUsuario = (index) => {
            mostrarUsuarios.value[index] = !mostrarUsuarios.value[index];
        };

        const mostrarContraseña = (index) => {
            mostrarContraseñas.value[index] = !mostrarContraseñas.value[index];
        };

        return {
            credenciales,
            usuario,
            mostrarUsuarios,
            mostrarContraseñas,
            mostrarUsuario,
            mostrarContraseña,
            router,
        };
    },
    methods: {
        async editarCredencial(credencial) {
            this.router.push({ name: "EditarCredencial", params: { id: credencial._id } });
            
        },
        async eliminarCredencial(credencial) {
            try {

                const confirmacion = window.confirm("¿Estás seguro de eliminar la credencial?");
                if (confirmacion) {
                    await userCredencial.eliminarCredencial(localStorage.getItem("token"), credencial._id);
                    const index = this.credenciales.findIndex(item => item._id === credencial._id);
                    if (index !== -1) {
                        this.credenciales.splice(index, 1);
                    }
                }
            } catch (error) {
                alert("Error al eliminar la credencial.");
            }
        },
    },
};
</script>

<template>
    <Barra></Barra>
    <div>
        <div class="tabla-container">
            <h1>Lista de Credenciales</h1>
            <table>
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Usuario</th>
                        <th>Contraseña</th>
                        <th></th> <!-- Nueva columna para los botones de acciones -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(credencial, index) in credenciales" :key="credencial._id">
                        <td>{{ credencial.nombreApp }}</td>
                        <!-- Mostrar el usuario oculto con asteriscos -->
                        <td @click="mostrarUsuario(index)">
                            <span v-if="!mostrarUsuarios[index]">*********</span>
                            <span v-else>{{ credencial.nomAcceso }}</span>
                        </td>
                        <!-- Mostrar la contraseña oculta con asteriscos -->
                        <td @click="mostrarContraseña(index)">
                            <span v-if="!mostrarContraseñas[index]">*********</span>
                            <span v-else>{{ credencial.pass }}</span>
                        </td>
                        <td>
                            <!-- Botón de Editar -->
                            <button @click="editarCredencial(credencial)" class="btn-editar">
                                Editar
                            </button>
                            <!-- Botón de Eliminar -->
                            <button @click="eliminarCredencial(credencial)" class="btn-eliminar">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                    <tr v-if="credenciales.length === 0">
                        <td colspan="4">No hay Credenciales disponibles</td>
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


/* Estilos para el botón de Editar */
.btn-editar {
    background-color: #3498db;
    /* Azul */
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 5px;
}

/* Estilos para el botón de Eliminar */
.btn-eliminar {
    background-color: #e74c3c;
    /* Rojo */
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

tbody tr td:hover {
    cursor: pointer;
}
</style>

