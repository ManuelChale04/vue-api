<template>
  <div>
    <h1 class="text-6xl font-bold montecarlos mb-6 text-center">Pedidos pendientes de evaluar</h1>
    <div class="container mx-auto p-10">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-[#B39555]">
          <tr>
            <th scope="col" class="px-6 py-3 franks text-left text-xs font-medium text-black uppercase tracking-wider">Folio</th>
            <th scope="col" class="px-6 py-3 franks text-left text-xs font-medium text-black uppercase tracking-wider">Hora</th>
            <th scope="col" class="px-6 py-3 franks text-left text-xs font-medium text-black uppercase tracking-wider">Total</th>
            <th scope="col" class="px-6 py-3 franks text-left text-xs font-medium text-black uppercase tracking-wider">Estado</th>
            <th scope="col" class="px-6 py-3 franks text-center text-xs font-medium text-black uppercase tracking-wider">Acción</th>
          </tr>
        </thead>
        <tbody class="bg-[#FBF9F6] divide-y divide-gray-200">
          <tr v-for="pedido in data" :key="pedido.id" class="hover:bg-gray-200">
            <td class="px-6 py-4 franks whitespace-nowrap">{{ pedido.folio }}</td>
            <td class="px-6 py-4 franks whitespace-nowrap">{{ pedido.Hora }}</td>
            <td class="px-6 py-4 franks whitespace-nowrap">{{ pedido.Total }}</td>
            <td class="px-6 py-4 franks whitespace-nowrap">{{ pedido.Estado }} 
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
              </svg>
            </td>
            <td class="px-6 py-4 franks whitespace-nowrap text-center text-sm font-medium">
              <button @click="mostrarModal(pedido)" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Confirmación -->
    <div class="fixed z-10 inset-0 overflow-y-auto" x-show="showModal" @click.away="showModal = false">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Confirmar acción
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    ¿Estás seguro de que quieres marcar este pedido como entregado?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="confirmarAccion()" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
              Confirmar
            </button>
            <button @click="showModal = false" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useUserStore } from "@/stores/useUserStore.js";
import { ref } from 'vue'

const store = useUserStore()
const data = ref([])
const showModal = ref(false);
const pedidoSeleccionado = ref(null);

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

const mostrarModal = (pedido) => {
  pedidoSeleccionado.value = pedido;
  showModal.value = true;
}

const confirmarAccion = () => {
  if (pedidoSeleccionado.value) {
    actualizarEstado(pedidoSeleccionado.value.id, 'entregado');
  }
  showModal.value = false;
}

// Llama a la función pedidos al montar el componente
pedidos()
</script>

<style>
  /* Estilos opcionales para el modal */
  .fixed.inset-0 {
    overflow-y: auto;
  }
</style>


