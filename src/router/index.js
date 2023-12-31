import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'
import Home from '../views/Home.vue'
import Registro from '../views/Registro.vue'
import EditarPerfil from '../views/EditarPerfil.vue'
import GenerarPass from '../views/GenerarPass.vue'
import CambioDePass from '../views/CambioDePass.vue'
import MiPerfil from '../views/MiPerfil.vue'
import EliminarCuenta from '../views/EliminarCuenta.vue'
import ListaUsuarios from '../views/ListaUsuarios.vue'
import ListaDeCredenciales from '../components/ListaDeCredenciales.vue'
import AgregarCredencial from '../components/AgregarCredencial.vue'
import EditarCredencial from '../components/EditarCredencial.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [


    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },

    {
      path: '/Registro',
      name: 'Registro',
      component: Registro
    },

    {
      path: '/EditarPerfil',
      name: 'EditarPerfil',
      component: EditarPerfil,
    },
    {
      path: '/GenerarPass',
      name: 'GenerarPass',
      component: GenerarPass,
    },
    {
      path: '/CambioDePass',
      name: 'CambioDePass',
      component: CambioDePass,
    },
    {
      path: '/MiPerfil',
      name: 'MiPerfil',
      component: MiPerfil,
    },
    {
      path: '/EliminarCuenta',
      name: 'EliminarCuenta',
      component: EliminarCuenta,
    },
    
    {
      path: '/ListaUsuarios',
      name: 'ListaUsuarios',
      component: ListaUsuarios,
    },


    {
      path: '/ListaDeCredenciales',
      name: 'ListaDeCredenciales',
      component: ListaDeCredenciales,
    },

    {
      path: '/AgregarCredencial',
      name: 'AgregarCredencial',
      component: AgregarCredencial,
    },

    
    {
      path: '/EditarCredencial/:id', // Ruta dinámica que acepta el parámetro "id"
      name: 'EditarCredencial',
      component: EditarCredencial,
      props: true, // Habilitar la pasada de parámetros como props
    },
  ]
});

export default router
