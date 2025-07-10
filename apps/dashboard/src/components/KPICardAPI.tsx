import React from 'react';
import { Card } from 'primereact/card';
import type { KPIEstado } from '../data/dashboardData';

interface KPICardAPIProps {
  data: KPIEstado;
}

const KPICardAPI: React.FC<KPICardAPIProps> = ({ data }) => {
  const getCardStyle = (tipo: string) => {
    const categoryColors = {
      TOTAL: {
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        borderColor: '#3b82f6',
        shadowColor: 'rgba(59, 130, 246, 0.3)'
      },
      APROBADO: {
        background: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
        borderColor: '#10b981',
        shadowColor: 'rgba(16, 185, 129, 0.3)'
      },
      RECHAZADO: {
        background: 'linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)',
        borderColor: '#ef4444',
        shadowColor: 'rgba(239, 68, 68, 0.3)'
      },
      OBSERVADO: {
        background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
        borderColor: '#f59e0b',
        shadowColor: 'rgba(245, 158, 11, 0.3)'
      },
      CERRADO: {
        background: 'linear-gradient(135deg, #581c87 0%, #8b5cf6 100%)',
        borderColor: '#8b5cf6',
        shadowColor: 'rgba(139, 92, 246, 0.3)'
      }
    };

    const colorScheme = categoryColors[tipo as keyof typeof categoryColors] || categoryColors.TOTAL;

    return {
      background: colorScheme.background,
      border: `2px solid ${colorScheme.borderColor}`,
      borderRadius: '16px',
      color: '#fff',
      boxShadow: `0 8px 25px ${colorScheme.shadowColor}`,
      position: 'relative' as const,
      overflow: 'hidden' as const
    } as React.CSSProperties;
  };

  const header = (
    <div className="text-xs text-gray-400 p-2 pb-0">
      {data.titulo}
    </div>
  );

  const content = (
    <div className="flex flex-column align-items-center justify-content-center px-4">
      <div className="text-4xl font-bold text-white mb-2">
        {data.valor.toLocaleString()}
      </div>
      <div className="text-sm text-gray-300 mb-1">
        {data.descripcion}
      </div>
      <div className="text-xs text-white-100">
        {data.anio} - {data.mes}
      </div>
    </div>
  );

  return (
    <Card
      header={header}
      className="kpi-card"
      style={getCardStyle(data.tipo)}
    >
      {content}
    </Card>
  );
};

export default KPICardAPI; 