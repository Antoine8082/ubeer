<template>
  <div id="app">
    <BeerList />
  </div>
</template>

<script>
import BeerList from '@/components/BeerList.vue';

export default {
  name: 'App',
  components: {
    BeerList,
  },
};
</script>

<style>
/* Les styles globaux de l'application seront ici */
</style>
