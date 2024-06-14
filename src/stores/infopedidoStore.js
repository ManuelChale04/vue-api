import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api'
const API_ENDPOINTS = {
    pendientes: '/pedidos-pendientes',
    infoPedidos: '/infopedidos',
    apartados: '/pedidos-apartados',
    entregados: '/pedidos-entregados',
}

export const useInfopedidosStore = defineStore('infopedidos', {
    state: () => ({
        pedidosPendientes: [],
        infoPedidos: [],
        pedidosApartados: [],
        pedidosEntregados: [],
        cargando: false,
        error: null,
    }),
    actions: {
        async cargarDatos(endpoint, storeRef) {
            try {
                this.cargando = true;
                const response = await axios.get(`${BASE_URL}${endpoint}`);
                this[storeRef] = response.data.data;  // Suponiendo que la respuesta ya contiene los datos directamente
                console.log(`Datos cargados desde ${endpoint}:`, this[storeRef]);
            } catch (error) {
                this.error = `Error al obtener datos de ${endpoint}: ${error.message}`;
                console.error(this.error);
            } finally {
                this.cargando = false;
            }
        },
        async cargarTodosLosDatos() {
            try {
                this.cargando = true;
                await Promise.all([
                    this.cargarDatos(API_ENDPOINTS.pendientes, 'pedidosPendientes'),
                    this.cargarDatos(API_ENDPOINTS.infoPedidos, 'infoPedidos'),
                    this.cargarDatos(API_ENDPOINTS.apartados, 'pedidosApartados'),
                    this.cargarDatos(API_ENDPOINTS.entregados, 'pedidosEntregados'),
                ]);
            } catch (error) {
                console.error('Error al cargar todos los datos:', error);
            } finally {
                this.cargando = false;
            }
        },
    },
})
