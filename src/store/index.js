import { createStore } from 'vuex';

export default createStore({
    state: {
        images: [],
    },
    mutations: {
        setImages(state, images) {
            state.images = images;
        },
    },
    actions: {
        async fetchImages({ commit }) {
            try {
                const response = await fetch('https://picsum.photos/v2/list?page=2&limit=100');
                const images = await response.json();
                commit('setImages', images);
                return images;
            } catch (error) {
                console.error('Error fetching images:', error);
                return [];
            }
        },
    },
});
