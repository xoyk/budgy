<template>
  <div class="logo logo_dev p-3">
    Oh, my Budgy!
  </div>
</template>

<script>
export default {
  name: "Logo"
};
</script>

<style scoped>
.logo_dev {
  background-color: #dc3848;
}

.logo {
  text-align: center;
  border-radius: 0.5rem;
  border-color: #2db487;
  color: white;
  font-weight: bold;
}

.logo a,
.logo a:hover {
  text-decoration: none;
  color: hsla(168, 11%, 109%, 1);
}
</style>
