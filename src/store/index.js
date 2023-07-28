import { createStore } from 'vuex';
import axios from 'axios';

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
                const url = 'https://picsum.photos/v2/list';
                const params = {
                    page: 2,
                    limit: 100,
                };
                const { data } = await axios.get(url, { params });
                commit('setImages', data);
                return data;
            } catch (error) {
                console.error('Error fetching images:', error);
                return [];
            }
        },
    },
});
