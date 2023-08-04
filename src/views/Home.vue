<script>
  import Barra from "../components/NavBar.vue"


  export default {
    components: {
      Barra,

    },
  };
</script>

<template>
  <Barra></Barra>
  <div class="home-container">

  </div>
</template>

<style>

  .home-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 76em;
  }



  .grafico-por-mes {
    border-top: .2em solid rgba(161, 161, 161, 0.155);
    border-bottom: .2em solid rgba(161, 161, 161, 0.155);
    padding: .8em 0;
    margin: 1em 0;
  }

</style>
