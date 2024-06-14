<script setup>
import { ref, onMounted } from 'vue'
import { useInfopedidosStore } from '../stores/infopedidoStore' // Ajusta la ruta según sea necesario

const infopedidosStore = useInfopedidosStore()

const detallesVisibles = ref({})

const toggleDetalles = (id) => {
  detallesVisibles.value[id] = !detallesVisibles.value[id]
}

onMounted(async () => {
  await infopedidosStore.cargarTodosLosDatos()
})

const goHome = () => {
  window.location.href = 'http://127.0.0.1:8000/home'
}
</script>

<template>
  <div>

  <div class="border md:border-2 md:border-t-0  md:border-b-0 border-[#D8D0BB] w-full h-full"><br><br>
    <h1 class="font-['CatchyMager'] text-center mb-10 font-bold text-4xl">PEDIDOS</h1>

    <!-- Pedidos Pendientes -->
    <div class="max-w-7xl mx-auto bg-white p-6 border-2 border-[#D8D0BB] rounded-md shadow-md relative mb-6">
      <div class="flex flex-row px-2 p-1 justify-between w-full">
        <div class="flex flex-row items-center justify-center">
          <div class="rounded-full bg-blue-500 w-3 h-3"></div>
          <p class="px-2 font-['CatchyMager']">Pendiente</p>
        </div>
      </div>
      <div v-for="pedido in infopedidosStore.pedidosPendientes" :key="pedido.id" class="flex flex-col mb-5">
        <div class="h-max bg-[#D8D0BB] w-full py-4 px-4">
          <div class="flex flex-row p-1 justify-between w-full">
            <h1 class="text-xl md:text-2xl font-['AppleGaramondBold'] font-bold">Folio: {{ pedido.folio }}</h1>
            <button @click="toggleDetalles(pedido.id)" class="text-black p-2 md:p-2 rounded-md transform" :class="{ 'rotate-90': detallesVisibles[pedido.id] }">▼</button>
          </div>
        </div>
        <div v-if="detallesVisibles[pedido.id]" class="px-4">
          <p class="font-['CatchyMager'] font-bold text-sm">Folio: #{{ pedido.folio }}</p>
          <h2 class="text-md font-['CatchyMager'] font-bold mb-2">Compra realizada el {{ pedido.Hora }}</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 w-full">
            <div v-for="infoPedido in infopedidosStore.infoPedidos.filter(info => info.IDPedido === pedido.IDPedido)" :key="infoPedido.id" class="flex flex-row py-10 border-2 border-[#D8D0BB] justify-between w-full">
              <div class="flex flex-row items-center justify-center w-full">
                <div class="flex flex-row py-1 px-2 w-full">
                  <img :src="`${BASE_URL}/${infoPedido.img}.jpg`" alt="Imagen del Producto" class="w-full md:w-full md:h-auto mr-4 rounded-md">
                </div>
                <div>
                  <h2 class="text-1xl md:text-2xl font-['AppleGaramondBold'] font-bold mb-2">{{ infoPedido.pan_nombre }}</h2>
                  <p class="font-['CatchyMager'] text-sm">Piezas: {{ infoPedido.pan_cantidad }}</p>
                  <p class="font-['CatchyMager'] text-sm">Precio por pieza: ${{ infoPedido.precio }}</p>
                  <p class="font-['CatchyMager'] text-sm">Cantidad total: ${{ infoPedido.pan_total }}</p>
                </div>
              </div>
            </div>
          </div>
          <p class="font-['CatchyMager']">Cantidad a Pagar: ${{ pedido.Total }}</p>
          <p class="font-['CatchyMager']">Método de Pago: Tarjeta de Crédito</p>
          <p class="font-['CatchyMager']">Dirección: Calle 26 entre 3 y 5 Colonia Felipe Carrillo Puerto, Motul Yucatán México</p>
        </div>
      </div>
    </div>

    <!-- Pedidos Apartados -->
    <div class="max-w-7xl mx-auto bg-white p-6 border-2 border-[#D8D0BB] rounded-md shadow-md relative mb-6">
      <div class="flex flex-row px-2 p-1 justify-between w-full">
        <div class="flex flex-row items-center justify-center">
          <div class="rounded-full bg-red-500 w-3 h-3"></div>
          <p class="px-2 font-['CatchyMager']">Apartado</p>
        </div>
      </div>
      <div v-for="pedido in infopedidosStore.pedidosApartados" :key="pedido.id" class="flex flex-col mb-5">
        <div class="h-max bg-[#D8D0BB] w-full py-4 px-4">
          <div class="flex flex-row p-1 justify-between w-full">
            <div class="flex flex-row items-center justify-center">
<!--              <img :src="`${BASE_URL}/${infopedidosStore.infoPedidos.find(info => info.IDPedido === pedido.IDPedido)?.img}`" alt="Imagen del Producto" class="w-16 h-16 mr-4 rounded-md">-->
              <h1 class="text-xl md:text-2xl font-['AppleGaramondBold'] font-bold">Folio: {{ pedido.folio }}</h1>
            </div>
            <button @click="toggleDetalles(pedido.id)" class="text-black p-2 md:p-2 rounded-md transform" :class="{ 'rotate-90': detallesVisibles[pedido.id] }">▼</button>
          </div>
        </div>
        <div v-if="detallesVisibles[pedido.id]" class="px-4">
          <p class="font-['CatchyMager'] font-bold text-sm">Folio: #{{ pedido.folio }}</p>
          <h2 class="text-md font-['AppleGaramondBold'] font-bold mb-2">Compra realizada el {{ pedido.Hora }}</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 w-full">
            <div v-for="infoPedido in infopedidosStore.infoPedidos.filter(info => info.IDPedido === pedido.IDPedido)" :key="infoPedido.id" class="flex flex-row py-10 border-2 border-[#D8D0BB] justify-between w-full">
              <div class="flex flex-row items-center justify-center w-full">
                <div class="flex flex-row py-1 px-2 w-full">
                  <img :src="`http://127.0.0.1:8000/api/${infoPedido.img}`" alt="Imagen del Producto" class="w-full md:w-full md:h-auto mr-4 rounded-md">
                </div>
                <div>
                  <h2 class="text-1xl md:text-2xl font-['AppleGaramondBold'] font-bold mb-2">{{ infoPedido.pan_nombre }}</h2>
                  <p class="font-['CatchyMager'] text-sm">Piezas: {{ infoPedido.pan_cantidad }}</p>
                  <p class="font-['CatchyMager'] text-sm">Precio por pieza: ${{ infoPedido.precio }}</p>
                  <p class="font-['CatchyMager'] text-sm">Cantidad total: ${{ infoPedido.pan_total }}</p>
                </div>
              </div>
            </div>
          </div>
          <p class="font-['CatchyMager']">Cantidad a Pagar: ${{ pedido.Total }}</p>
          <p class="font-['CatchyMager']">Método de Pago: Tarjeta de Crédito</p>
          <p class="font-['CatchyMager']">Dirección: Calle 26 entre 3 y 5 Colonia Felipe Carrillo Puerto, Motul Yucatán México</p>
        </div>
      </div>
    </div>

    <!-- Pedidos Entregados -->
    <div class="max-w-7xl mx-auto bg-white p-6 border-2 border-[#D8D0BB] rounded-md shadow-md relative">
      <div class="flex flex-row px-2 p-1 justify-between w-full">
        <div class="flex flex-row items-center justify-center">
          <div class="rounded-full bg-green-500 w-3 h-3"></div>
          <p class="px-2 font-['CatchyMager']">Entregado</p>
        </div>
      </div>
      <div v-for="pedido in infopedidosStore.pedidosEntregados" :key="pedido.id" class="flex flex-col mb-5">
        <div class="h-max bg-[#D8D0BB] w-full py-4 px-4">
          <div class="flex flex-row p-1 justify-between w-full">
            <div class="flex flex-row items-center justify-center">
<!--              <img :src="`${BASE_URL}/${infopedidosStore.infoPedidos.find(info => info.IDPedido === pedido.IDPedido)?.img}.jpg`" alt="Imagen del Producto" class="w-16 h-16 mr-4 rounded-md">-->
              <h1 class="text-xl md:text-2xl font-['AppleGaramondBold'] font-bold">Folio: {{ pedido.folio }}</h1>
            </div>
            <button @click="toggleDetalles(pedido.id)" class="text-black p-2 md:p-2 rounded-md transform" :class="{ 'rotate-90': detallesVisibles[pedido.id] }">▼</button>
          </div>
        </div>
        <div v-if="detallesVisibles[pedido.id]" class="px-4">
          <p class="font-['CatchyMager'] font-bold text-sm">Folio: #{{ pedido.folio }}</p>
          <h2 class="text-md font-['AppleGaramondBold'] font-bold mb-2">Compra realizada el {{ pedido.Hora }}</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 w-full">
            <div v-for="infoPedido in infopedidosStore.infoPedidos.filter(info => info.IDPedido === pedido.IDPedido)" :key="infoPedido.id" class="flex flex-row py-10 border-2 border-[#D8D0BB] justify-between w-full">
              <div class="flex flex-row items-center justify-center w-full">
                <div class="flex flex-row py-1 px-2 w-full">
                  <img :src="`${BASE_URL}/${infoPedido.img}.jpg`" alt="Imagen del Producto" class="w-full md:w-full md:h-auto mr-4 rounded-md">
                </div>
                <div>
                  <h2 class="text-1xl md:text-2xl font-['AppleGaramondBold'] font-bold mb-2">{{ infoPedido.pan_nombre }}</h2>
                  <p class="font-['CatchyMager'] text-sm">Piezas: {{ infoPedido.pan_cantidad }}</p>
                  <p class="font-['CatchyMager'] text-sm">Precio por pieza: ${{ infoPedido.precio }}</p>
                  <p class="font-['CatchyMager'] text-sm">Cantidad total: ${{ infoPedido.pan_total }}</p>
                </div>
              </div>
            </div>
          </div>
          <p class="font-['CatchyMager']">Cantidad a Pagar: ${{ pedido.Total }}</p>
          <p class="font-['CatchyMager']">Método de Pago: Tarjeta de Crédito</p>
          <p class="font-['CatchyMager']">Dirección: Calle 26 entre 3 y 5 Colonia Felipe Carrillo Puerto, Motul Yucatán México</p>
        </div>
      </div>
    </div>

    <div class="px-32 md:px-16 py-5">
      <button @click="goHome" class="absolute bg-[#B39555] text-black w-20 justify-between items-center rounded-md">
        Inicio
      </button>
    </div>
  </div>
  </div>
</template>

<style scoped>
.rotate-90 {
  transform: rotate(90deg);
}
</style>
