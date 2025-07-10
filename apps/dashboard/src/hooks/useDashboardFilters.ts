import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { DashboardFilters } from '../data/dashboardData';

export const useDashboardFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Estado inicial basado en query params o valores por defecto
  const getInitialFilters = (): DashboardFilters => {
    const anio = searchParams.get('anio');
    const mes = searchParams.get('mes');
    const categoria = searchParams.get('categoria');

    return {
      anio: anio ? parseInt(anio) : new Date().getFullYear(),
      mes: mes ? parseInt(mes) : new Date().getMonth() + 1,
      categoria: categoria || undefined
    };
  };

  const [filters, setFilters] = useState<DashboardFilters>(getInitialFilters);

  // Actualizar query params cuando cambian los filtros
  const updateFilters = useCallback((newFilters: Partial<DashboardFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Actualizar query params
    const params = new URLSearchParams();
    params.set('anio', updatedFilters.anio.toString());
    params.set('mes', updatedFilters.mes.toString());
    
    if (updatedFilters.categoria) {
      params.set('categoria', updatedFilters.categoria);
    }

    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Limpiar filtro de categoría
  const clearCategoria = useCallback(() => {
    const { categoria, ...filtersWithoutCategoria } = filters;
    setFilters(filtersWithoutCategoria);

    const params = new URLSearchParams();
    params.set('anio', filtersWithoutCategoria.anio.toString());
    params.set('mes', filtersWithoutCategoria.mes.toString());
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Sincronizar con query params si cambian externamente
  useEffect(() => {
    const currentFilters = getInitialFilters();
    
    // Solo actualizar si hay diferencia significativa
    if (
      currentFilters.anio !== filters.anio ||
      currentFilters.mes !== filters.mes ||
      currentFilters.categoria !== filters.categoria
    ) {
      setFilters(currentFilters);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    filters,
    updateFilters,
    clearCategoria
  };
}; 