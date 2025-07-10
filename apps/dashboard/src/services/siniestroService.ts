import { API_CONFIG } from '../config/api';
import type { SiniestroDetalleResponse } from '../data/dashboardData';

class SiniestroService {
  private baseUrl = API_CONFIG.BASE_URL;

  async getSiniestroById(idSiniestro: string): Promise<SiniestroDetalleResponse> {
    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.SINIESTRO}/${idSiniestro}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Siniestro no encontrado');
        }
        const body = await response.json();
        throw new Error(`Error ${response.status}: ${body.error || response.statusText}`);
      }

      const data: SiniestroDetalleResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching siniestro:', error);
      throw error;
    }
  }
}

export const siniestroService = new SiniestroService(); 