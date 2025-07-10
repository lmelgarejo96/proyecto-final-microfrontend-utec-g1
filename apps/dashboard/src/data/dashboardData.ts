// Interfaces para la respuesta del API
export interface KPIEstado {
  id: string;
  titulo: string;
  anio: number;
  mes: string;
  valor: number;
  descripcion: string;
  tipo: 'TOTAL' | 'APROBADO' | 'RECHAZADO' | 'OBSERVADO' | 'CERRADO';
}

export interface DashboardEstadoResponse {
  success: boolean;
  kpis: KPIEstado[];
  resumen: {
    total_siniestros: number;
    por_estado: Record<string, number>;
    periodo: {
      anio: number;
      mes: number;
      mes_nombre: string;
      categoria_filtro: string;
    };
  };
  metadata: {
    timestamp: string;
  };
}

// Interface para filtros
export interface DashboardFilters {
  anio: number;
  mes: number;
  categoria?: string;
}

// Interface original para compatibilidad
export interface KPIData {
  title: string;
  value: number | string;
  description: string;
  period: string;
  category: 'accidents' | 'approved' | 'rejected' | 'obtained';
  month: string;
  year: number;
}

export interface CategoryData {
  year: number;
  month: string;
  category: string;
  total: number;
}

export interface ClientData {
  year: number;
  month: string;
  client: string;
  total: number;
}

export interface MonthlyAmount {
  title: string;
  value: number;
  currency: string;
  description: string;
  period: string;
  month: string;
  year: number;
}

// KPIs principales
export const kpiData: KPIData[] = [
  {
    title: 'KPI Nº 5',
    value: 702,
    description: 'Siniestros ocurridos',
    period: '2025 - Junio',
    category: 'accidents',
    month: 'Junio',
    year: 2025
  },
  {
    title: 'KPI Nº 5',
    value: 300,
    description: 'Siniestros Aprobados',
    period: '2025 - Junio',
    category: 'approved',
    month: 'Junio',
    year: 2025
  },
  {
    title: 'KPI Nº 5',
    value: 400,
    description: 'Siniestros Rechazados',
    period: '2025 - Junio',
    category: 'rejected',
    month: 'Junio',
    year: 2025
  },
  {
    title: 'KPI Nº 5',
    value: 2,
    description: 'Siniestros Obtenidos',
    period: '2025 - Junio',
    category: 'obtained',
    month: 'Junio',
    year: 2025
  }
];

// Montos mensuales
export const monthlyAmounts: MonthlyAmount[] = [
  {
    title: 'KPI Nº 6 - Monto total desembolsado (se calcula contabilizando todo lo ocurrido al filtro)',
    value: 170000.00,
    currency: 'S/.',
    description: 'Monto Desembolsado',
    period: '2025 - Junio',
    month: 'Junio',
    year: 2025
  },
  {
    title: 'KPI Nº 6 - Monto último desembolsado (valor único encontrado de acuerdo al filtro)',
    value: 1500.00,
    currency: 'S/.',
    description: 'Monto Desembolsado',
    period: '2025 - Junio',
    month: 'Junio',
    year: 2025
  },
  {
    title: 'KPI Nº 6 - Monto último desembolsado (valor único encontrado de acuerdo al filtro)',
    value: 5550.00,
    currency: 'S/.',
    description: 'Monto Desembolsado',
    period: '2025 - Junio',
    month: 'Junio',
    year: 2025
  }
];

// Top 10 categorías de siniestros
export const categoryData: CategoryData[] = [
  { year: 2025, month: 'Junio', category: 'CHOQUE', total: 702 },
  { year: 2025, month: 'Junio', category: 'ROBO', total: 400 },
  { year: 2025, month: 'Junio', category: 'INCENDIO', total: 23 }
];

// Top 10 clientes de siniestros
export const clientData: ClientData[] = [
  { year: 2025, month: 'Junio', client: 'John Doe', total: 12 },
  { year: 2025, month: 'Junio', client: 'Rachel Doe', total: 5 },
  { year: 2025, month: 'Junio', client: 'Mike Wazowski', total: 3 }
];

// Interfaces para la respuesta del endpoint /dashboard/pago
export interface KPIPago {
  id: string;
  titulo: string;
  anio: number;
  mes: string;
  valor: number;
  descripcion: string;
  tipo: 'TOTAL' | 'MAXIMO' | 'MINIMO';
  formato: string;
}

export interface DashboardPagoResponse {
  success: boolean;
  kpis: KPIPago[];
  resumen: {
    total_desembolsado: number;
    maximo_desembolsado: number;
    minimo_desembolsado: number;
    total_siniestros: number;
    periodo: {
      anio: number;
      mes: number;
      mes_nombre: string;
      categoria_filtro: string;
    };
    por_categoria?: Record<string, {
      total: number;
      maximo: number;
      minimo: number;
      siniestros: number;
    }>;
  };
  metadata: {
    timestamp: string;
  };
}

// Interfaces para la respuesta del endpoint /dashboard/top-categorias
export interface TopCategoria {
  posicion: number;
  categoria: string;
  total: number;
  anio: number;
  mes: string;
  porcentaje: number;
}

export interface DashboardTopCategoriasResponse {
  success: boolean;
  data: TopCategoria[];
  metadata: {
    titulo: string;
    periodo: {
      anio: number;
      mes: number;
      mes_nombre: string;
      limit: number;
    };
    resumen: {
      total_siniestros: number;
      total_categorias: number;
      top_categoria: string;
      top_categoria_total: number;
    };
    timestamp: string;
  };
}

// Interfaces para la respuesta del endpoint /dashboard/top-clientes
export interface TopCliente {
  posicion: number;
  cliente: string;
  cliente_id: string;
  total: number;
  anio: number;
  mes: string;
  categoria: string | null;
  porcentaje: number;
}

export interface DashboardTopClientesResponse {
  success: boolean;
  data: TopCliente[];
  metadata: {
    titulo: string;
    source_table: string;
    performance: string;
    filtros: {
      anio: number;
      mes: number;
      mes_nombre: string;
      categoria: string | null;
      limit: number;
    };
    resumen: {
      total_siniestros: number;
      total_clientes: number;
      top_cliente: string;
      top_cliente_total: number;
    };
    timestamp: string;
  };
}

// Interfaces para la respuesta del endpoint /siniestro/{id_siniestro}
export interface Siniestro {
  index: string;
  id_cliente: string;
  numero_poliza: string;
  categoria: string;
  estado_solicitud: string;
  estado_evaluacion: string;
  fecha_solicitud: string;
  fecha_evaluacion: string;
  monto_solicitado: number;
}

export interface Cliente {
  cliente_key: string;
  nombre: string;
  email: string;
  telefono: string;
}

export interface SiniestroPago {
  id_siniestro: string;
  monto_pagado: number;
  fecha_pago: string;
  metodo_pago: string;
}

export interface Vehiculo {
  id_cliente: number;
  marca: string;
  modelo: string;
  anio: number;
  placa: string;
}

export interface Poliza {
  numero_poliza: string;
  tipo_cobertura: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface SiniestroDetalleResponse {
  success: boolean;
  data: {
    siniestro: Siniestro;
    cliente: Cliente;
    siniestro_pago: SiniestroPago | null;
    vehiculo: Vehiculo | null;
    poliza: Poliza | null;
  };
  metadata: {
    id_siniestro: string;
    timestamp: string;
    found_entities: {
      siniestro: boolean;
      cliente: boolean;
      siniestro_pago: boolean;
      vehiculo: boolean;
      poliza: boolean;
    };
  };
} 