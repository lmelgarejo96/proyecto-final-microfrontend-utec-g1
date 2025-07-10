import { API_CONFIG } from '../config/api';
import type { 
  DashboardEstadoResponse, 
  DashboardPagoResponse, 
  DashboardTopCategoriasResponse,
  DashboardTopClientesResponse,
  DashboardFilters 
} from '../data/dashboardData';

class DashboardService {
  private baseUrl = API_CONFIG.BASE_URL;

  async getEstadoSiniestros(filters: DashboardFilters): Promise<DashboardEstadoResponse> {
    const params = new URLSearchParams({
      anio: filters.anio.toString(),
      mes: filters.mes.toString(),
    });

    if (filters.categoria) {
      params.append('categoria', filters.categoria);
    }

    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.DASHBOARD_ESTADO}?${params}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log(response);
        const body = await response.json();
        throw new Error(`Error ${response.status}: ${body.message || response.statusText}`);
      }

      const data: DashboardEstadoResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard estado:', error);
      throw error;
    }
  }

  async getPagoSiniestros(filters: DashboardFilters): Promise<DashboardPagoResponse> {
    const params = new URLSearchParams({
      anio: filters.anio.toString(),
      mes: filters.mes.toString(),
    });

    if (filters.categoria) {
      params.append('categoria', filters.categoria);
    }

    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.DASHBOARD_PAGO}?${params}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log(response);
        const body = await response.json();
        throw new Error(`Error ${response.status}: ${body.message || response.statusText}`);
      }

      const data: DashboardPagoResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard pago:', error);
      throw error;
    }
  }

  async getTopCategorias(filters: DashboardFilters): Promise<DashboardTopCategoriasResponse> {
    const params = new URLSearchParams({
      anio: filters.anio.toString(),
      mes: filters.mes.toString(),
      limit: '10' // Por defecto 10 categorías
    });

    if (filters.categoria) {
      params.append('categoria', filters.categoria);
    }

    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.DASHBOARD_TOP_CATEGORIAS}?${params}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log(response);
        const body = await response.json();
        throw new Error(`Error ${response.status}: ${body.message || response.statusText}`);
      }

      const data: DashboardTopCategoriasResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard top categorias:', error);
      throw error;
    }
  }

  async getTopClientes(filters: DashboardFilters): Promise<DashboardTopClientesResponse> {
    const params = new URLSearchParams({
      anio: filters.anio.toString(),
      mes: filters.mes.toString(),
      limit: '10' // Por defecto 10 clientes
    });

    if (filters.categoria) {
      params.append('categoria', filters.categoria);
    }

    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.DASHBOARD_TOP_CLIENTES}?${params}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log(response);
        const body = await response.json();
        throw new Error(`Error ${response.status}: ${body.message || response.statusText}`);
      }

      const data: DashboardTopClientesResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard top clientes:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService(); 