<template>
<!--  <div id="drawer-container">-->
    <v2-cupertino>
      <div>Hola mundo!</div>
        <div>Adiós mundo cruel!</div>
      </v2-cupertino>
<!--  </div>-->
</template>

<script>
import V2Cupertino from 'v2-cupertino';

export default {
  name: "Drawer",
  components: {
    V2Cupertino
  }
}
</script>

<style scoped>
  #drawer-container {
    background-color: #FF8A00;
    min-height: 200px;
    opacity: 0;
  }
</style>
