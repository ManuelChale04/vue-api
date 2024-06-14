import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/infopedidos'

export const useAnecdotasStore = defineStore('pedidos', {
    state: () => ({
        pedidos: [],
        cargando: false,
        error: null
    }),
    actions: {
        async cargarAnecdotas() {
            try {
                this.cargando = true
                const response = await axios.get(API_URL)
                this.anecdotas = response.data
            } catch (error) {
                this.error = error.message
            } finally {
                this.cargando = false
            }
        }
    }
})