<script setup>
import axios from "axios";
import { useUserStore } from "@/stores/useUserStore.js";
import { ref } from 'vue'

const store = useUserStore()
const data = ref([])

const pedidos = async () => {
  const API_URL = 'http://127.0.0.1:8000/api/pedidos-pendientes'
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${store.token}`
      }
    });
    data.value = response.data.pedidos;
    console.log(data)
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
  }
}

const actualizarEstado = async (pedidoId, nuevoEstado) => {
  const API_URL = `http://127.0.0.1:8000/api/pedidos/${pedidoId}`
  try {
    const response = await axios.put(API_URL, { Estado: nuevoEstado }, {
      headers: {
        Authorization: `Bearer ${store.token}`,
        'Content-Type': 'application/json'  // Asegura el tipo de contenido
      }
    });
    console.log(response.data);
    // Vuelve a cargar los pedidos después de actualizar el estado
    pedidos();
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
  }
}

// Llama a la función pedidos al montar el componente
pedidos()
</script>

<template>
  <div>
    <h1 class="text-6xl font-bold montecarlos mb-6 text-center">Pedidos pendientes de evaluar</h1>
    <div class="container mx-auto p-10">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-[#B39555]">
        <tr>
          <th scope="col" class="px-6 py-3 franks text-left text-xs font-medium text-black uppercase tracking-wider">Folio</th>
          <th scope="col" class="px-6 py-3  franks text-left text-xs font-medium text-black uppercase tracking-wider">Hora</th>
          <th scope="col" class="px-6 py-3 franks  text-left text-xs font-medium text-black uppercase tracking-wider">Total</th>
          <th scope="col" class="px-6 py-3 franks text-left text-xs font-medium text-black uppercase tracking-wider">Estado</th>
          <th scope="col" class="px-6 py-3 franks   text-center text-xs font-medium text-black uppercase tracking-wider">Acción</th>
        </tr>
        </thead>
        <tbody class="bg-[#FBF9F6] divide-y divide-gray-200">
        <tr v-for="pedido in data" :key="pedido.id" class="hover:bg-gray-200">
          <td class="px-6 py-4 franks  whitespace-nowrap">{{ pedido.folio }}</td>
          <td class="px-6 py-4  franks whitespace-nowrap">{{ pedido.Hora }}</td>
          <td class="px-6 py-4 franks  whitespace-nowrap">{{ pedido.Total }}</td>
          <td class="px-6 py-4 franks whitespace-nowrap">{{ pedido.Estado }} <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8s8-3.59 8-8s-3.59-8-8-8m4.2 12.2L11 13V7h1.5v5.2l4.5 2.7z" opacity=".3"/><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m.5-13H11v6l5.2 3.2l.8-1.3l-4.5-2.7z"/></svg></td>
          <td class="px-6 py-4 franks  whitespace-nowrap text-center text-sm font-medium">
            <button @click="actualizarEstado(pedido.id, 'entregado')" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>


