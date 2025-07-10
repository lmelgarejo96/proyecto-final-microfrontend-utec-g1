import React from 'react';
import { Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import KPICardAPI from './KPICardAPI';
import AmountCard, { AmountCardAPI } from './AmountCard';
import CustomDataTable, { DataTableAPI } from './DataTable';
import DashboardFilters from './DashboardFilters';
import SiniestroDetalle from './SiniestroDetalle';
import { useDashboardFilters } from '../hooks/useDashboardFilters';
import { useDashboardData, useDashboardPagoData, useDashboardTopCategoriasData, useDashboardTopClientesData } from '../hooks/useDashboardData';

const DashboardContent: React.FC = () => {
  const { filters, updateFilters, clearCategoria } = useDashboardFilters();
  const { kpis, loading: loadingEstado, error: errorEstado } = useDashboardData(filters);
  const { kpisPago, loading: loadingPago, error: errorPago } = useDashboardPagoData(filters);
  const { topCategorias, loading: loadingCategorias, error: errorCategorias } = useDashboardTopCategoriasData(filters);
  const { topClientes, loading: loadingClientes, error: errorClientes } = useDashboardTopClientesData(filters);

  const loadingKPIs = loadingEstado || loadingPago;
  const errorKPIs = errorEstado || errorPago;
  const loadingTables = loadingCategorias || loadingClientes;

  return (
    <div className="dashboard-container" style={{ minHeight: '100vh', padding: '20px' }}>
      {/* Filtros */}
      <DashboardFilters 
        filters={filters}
        onFiltersChange={updateFilters}
        onClearCategoria={clearCategoria}
      />

      {/* Mensaje de error para KPIs si existe */}
      {errorKPIs && (
        <div className="mb-4">
          <Message severity="error" text={errorKPIs} />
        </div>
      )}

      {/* Indicador de carga para KPIs */}
      {loadingKPIs && (
        <div className="flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <ProgressSpinner />
        </div>
      )}

      {/* KPIs principales desde la API */}
      {!loadingKPIs && !errorKPIs && (
        <div className="grid mb-4">
          {kpis.map((kpi, index) => (
            <div key={kpi.id || index} className="col-12 md:col-6 lg:col-3">
              <KPICardAPI data={kpi} />
            </div>
          ))}
        </div>
      )}

      {/* Montos desde la API */}
      {!loadingKPIs && !errorKPIs && (
        <div className="grid mb-4">
          {kpisPago.map((pago, index) => (
            <div key={pago.id || index} className="col-12 md:col-6 lg:col-4">
              <AmountCardAPI data={pago} />
            </div>
          ))}
        </div>
      )}

      {/* Indicador de carga para tablas */}
      {loadingTables && (
        <div className="flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <ProgressSpinner />
        </div>
      )}

      {/* Tablas desde la API - siempre se muestran, vacías si no hay datos */}
      {!loadingTables && (
        <div className="grid">
          <div className="col-12 md:col-6">
            <DataTableAPI
              title="Top 10 Categorías de Siniestros más frecuentes"
              data={topCategorias}
              type="category"
            />
          </div>
          <div className="col-12 md:col-6">
            <DataTableAPI
              title="Top 10 Clientes de Siniestros más frecuentes"
              data={topClientes}
              type="client"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<DashboardContent />} />
      <Route path="/siniestros/:idSiniestro" element={<SiniestroDetalle />} />
    </Routes>
  );
};

export default Dashboard; 