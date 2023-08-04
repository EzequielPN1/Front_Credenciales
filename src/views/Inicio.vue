<script setup>
  import { RouterLink } from 'vue-router'
</script>


<template>
  <div class="inicio-container">
    <div class="botones-texto">
      <h1>Proyecto Generico</h1>
      <div class="botones-inicio-registro">
        <router-link to="/Login">
          <button class="btn btn-outline-primary">Iniciar Sesión</button>
        </router-link>
        <router-link to="/Registro">
          <button class="btn btn-outline-secondary" style="margin-left: .5em;">Registrarse</button>
        </router-link>
      </div>

    </div>

  </div>
</template>

<style>

  .inicio-container {
    background-color: white;
    width: 100vw;
    height: 100vh;
    display: flex;
  }

  .botones-texto {
    padding: 1em;
    width: 40vw;
    max-width: 31em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: auto;
  }

  .botones-texto h1 {
    color: rgb(0, 0, 0);
    text-align: center;
  }

  .botones-inicio-registro {
    margin: 5em auto;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  
 

 

</style>