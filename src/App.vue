<script setup>
import Pedido from './components/Pedido.vue'
import Acceso from './components/Acceso.vue'
import Admin from './components/Admin.vue'

import {onMounted, ref} from 'vue'
import {isAuthenticated, setAuthToken} from './AuthService.js'

const mostrar = ref(false)

function comprobarLogin() {
  if (isAuthenticated()) {
    mostrar.value = true
  } else {
    mostrar.value = false
  }
}

comprobarLogin()
</script>

<template>
  <header>

  </header>

  <main>

    <Acceso @comp-login="comprobarLogin"/>
    <div v-if="mostrar">
      <Admin/>
    </div>
    <div v-else>
      <Pedido/>
    </div>
  </main>
</template>