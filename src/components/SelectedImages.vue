<template>
  <div class="selected-images">
    <div class="selected-image" v-for="(image, index) in selectedImages" :key="index">
      <p>
        <a :href="image.url" target="_blank">{{ image.url }}</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectedImages: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.selected-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.selected-image {
  margin: 5px;
}

.selected-image img {
  width: 100px;
  height: 100px;
  border: 2px solid #007bff;
  border-radius: 4px;
}

.selected-images {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selected-image {
  margin-bottom: 20px;
}

.selected-image img {
  width: 100px;
  height: 100px;
  border: 2px solid #007bff;
  border-radius: 4px;
}
</style>
