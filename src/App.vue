<template>
  <div class="app">
    <h2>Карусель изображений</h2>
    <Carousel :images="images"/>
  </div>
</template>

<script>
import Carousel from './components/Carousel.vue';
import store from './store';

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      images: [],
    };
  },
  created() {
    store.dispatch('fetchImages').then((images) => {
      this.images = images;
    });
  },
};
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
