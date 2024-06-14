// useUserStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref(JSON.parse(localStorage.getItem('user') || null));
    const role = ref(localStorage.getItem('role') || null); // Ajusta el nombre según lo que uses en tu aplicación
    const token = ref(localStorage.getItem('token') || null);

    function login(response) {
        user.value = response.data.user;
        role.value = response.data.role; // Ajusta el nombre según lo que uses en tu aplicación
        token.value = response.data.authorization.token;
        localStorage.setItem('user', JSON.stringify(user.value));
        localStorage.setItem('role', role.value); // Ajusta el nombre según lo que uses en tu aplicación
        localStorage.setItem('token', token.value);
    }

    return { user, role, token, login };
});
