<template>
  <div class="carousel">
    <transition name="slide-fade" mode="out-in">
      <div class="main-carousel-item" :key="currentIndex">
        <div class="main-carousel-image">
          <img :src="currentImage.download_url" :alt="currentImage.author" />
        </div>
      </div>
    </transition>

    <div class="carousel-thumbnails">
      <div
          v-for="(image, index) in visibleThumbnails"
          :key="index"
          class="thumbnail-item"
          @click="toggleSelection(index)"
          :class="{ selected: image.selected }"
      >
        <img :src="image.download_url" :alt="image.author">
      </div>
    </div>

    <div class="carousel-controls">
      <button @click="moveCarousel(-1)">Prev</button>
      <button @click="moveCarousel(1)">Next</button>
    </div>

    <SelectedImages :selectedImages="allSelectedImages" />
  </div>
</template>

<script>
import SelectedImages from './SelectedImages.vue';

export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      visibleThumbnails: [],
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
    allSelectedImages() {
      return this.images.filter((image) => image.selected);
    },
  },
  methods: {
    moveCarousel(direction) {
      const maxIndex = this.images.length - 1;
      if (direction === 1) {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      } else {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      }
      this.updateVisibleThumbnails();
    },
    toggleSelection(index) {
      this.visibleThumbnails[index].selected = !this.visibleThumbnails[index].selected;
    },
    updateVisibleThumbnails() {
      const numImg = (screen.width > 2000) ? 15 : (screen.width > 1500) ? 10 : (screen.width > 500) ? 5 : 1;
      this.visibleThumbnails = this.images.slice(this.currentIndex, this.currentIndex + numImg);
    },
  },
  mounted() {
    this.updateVisibleThumbnails();
  },
  components: {
    SelectedImages,
  },
};
</script>

<style>
.carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.main-carousel-item img {
  width: 100%;
  max-width: 400px;
  max-height: 300px;
  object-fit: cover;
}

.carousel-thumbnails {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.thumbnail-item {
  margin: 0 5px;
  cursor: pointer;
}

.thumbnail-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 2px solid transparent;
}

.thumbnail-item img.selected {
  border-color: #007bff;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.carousel-controls button {
  margin: 0 5px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.thumbnail-item.selected img {
  border: 2px solid #007bff;
}

.main-carousel-image {
  width: 400px;
  height: 300px;
  overflow: hidden;
  border-radius: 4px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-move {
  transition: transform 0.3s ease;
}
</style>
