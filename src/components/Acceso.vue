<script setup>
import axios from 'axios';
import { ref, defineEmits } from 'vue';
import { isAuthenticated } from '../AuthService.js';

const emit = defineEmits(['compLogin']);

const email = ref('');
const password = ref('');
const verForm = ref(true);

const login = async () => {
  const API_URL = 'http://127.0.0.1:8000/api/login';
  try {
    const response = await axios.post(API_URL, {
      email: email.value,
      password: password.value
    });
    const user = response.data.user;
    const authorization = response.data.authorization;
    localStorage.setItem('token', authorization.token);
    comprobarLogin();
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};

const logout = async () => {
  const API_URL = 'http://127.0.0.1:8000/api/logout';
  try {
    const response = await axios.post(API_URL, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    localStorage.removeItem('token');
    comprobarLogin();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

function comprobarLogin() {
  if (isAuthenticated()) {
    verForm.value = false;
    console.log("logueado");
  } else {
    console.log("no logueado");
    verForm.value = true;
  }
  emit("compLogin");
}

comprobarLogin();

// Expresión regular para validar el formato de correo electrónico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Expresión regular para validar la contraseña
// const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const passwordRegex = /^\d{8,}$/;


// Función para validar el correo electrónico con expresión regular
function isValidEmail() {
  return emailRegex.test(email.value);
}

// Función para validar la contraseña con expresión regular
function isValidPassword() {
  return passwordRegex.test(password.value);
}
</script>

<template>
  <div v-if="verForm" class="bg-[#F2F2F2] w-screen h-screen flex justify-center items-center">
    <div class="w-[90%] md:w-[70%] h-[80%] flex">
      <div class="w-full md:w-[50%] h-[100%] bg-white flex flex-col justify-center items-center">
        <h1 class="montecarlos text-7xl pb-16">Bienvenido</h1>
        <form @submit.prevent="login" class="flex flex-col items-center w-full">
          <div class="flex flex-col pb-6 p-4 w-full">
            <label for="email" class="md:translate-x-28">Correo</label>
            <div class="flex flex-row justify-center items-center w-full">
              <i class="fa-solid fa-envelope pr-1 my-auto"></i>
              <input id="email" name="email" type="email" v-model="email" required autofocus class="rounded-xl w-[70%] md:w-72 border-2 mr-6" :class="{ 'border-red-500': !isValidEmail() }">
            </div>
            <span v-if="email.length > 0 && !isValidEmail()" class="text-red-500 text-sm md:translate-x-28">Formato de correo inválido</span>
          </div>
          <div class="flex flex-col pb-2 p-4 w-full">
            <label for="password" class="md:translate-x-28">Contraseña</label>
            <div class="flex flex-row justify-center items-center w-full">
              <i class="fa-solid fa-lock pr-1 my-auto"></i>
              <input id="password" name="password" type="password" v-model="password" required class="w-[70%] md:w-72 rounded-xl border-2 pl-2" :class="{ 'border-red-500': !isValidPassword() }" />
              <button type="button" id="togglePassword">
                <i id="toggleIcon" class="fa-solid fa-eye my-auto pl-1"></i>
              </button>
            </div>
            <span v-if="password.length > 0 && !isValidPassword()" class="text-red-500 text-sm md:translate-x-28">La contraseña debe tener al menos 8 caracteres, <br> una letra mayúscula, una letra minúscula y un número</span>
          </div>
          <br>
          <button type="submit" class="btn btn-primary bg-[#B39555] rounded-xl py-2 px-24 self-center">Iniciar Sesión</button>
        </form>
      </div>
      <div class="w-[50%] h-[100%] bg-[#B39555] md:flex flex-col items-center justify-center hidden">
        <img src="/paneslogin.png" alt="Imagen de panes1" class="w-[90%] h-[50%] -rotate-0">
        <img src="/paneslogin.png" alt="Imagen de panes1" class="w-[90%] h-[50%] -rotate-0">
        <img src="/charrita.png" alt="Imagen de panes1" class="absolute scale-50">
      </div>
    </div>
  </div>
  <div v-else class="flex flex-row-reverse">
    <button @click="logout" class="btn font-bold franks btn-primary bg-[#B39555] rounded-xl mt-6 py-2 px-16">Cerrar sesión</button>
  </div>
</template>


