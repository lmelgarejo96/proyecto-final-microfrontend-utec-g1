import React from 'react';
import { Card } from 'primereact/card';
import { KPIData } from '../data/dashboardData';

interface KPICardProps {
  data: KPIData;
}

const KPICard: React.FC<KPICardProps> = ({ data }) => {
  const getCardStyle = (category: string) => {
    const categoryColors = {
      accidents: {
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        borderColor: '#3b82f6',
        shadowColor: 'rgba(59, 130, 246, 0.3)'
      },
      approved: {
        background: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
        borderColor: '#10b981',
        shadowColor: 'rgba(16, 185, 129, 0.3)'
      },
      rejected: {
        background: 'linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)',
        borderColor: '#ef4444',
        shadowColor: 'rgba(239, 68, 68, 0.3)'
      },
      obtained: {
        background: 'linear-gradient(135deg, #581c87 0%, #8b5cf6 100%)',
        borderColor: '#8b5cf6',
        shadowColor: 'rgba(139, 92, 246, 0.3)'
      }
    };

    const colorScheme = categoryColors[category as keyof typeof categoryColors] || categoryColors.accidents;

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
    <div></div>
  );

  const content = (
    <div className="flex flex-column align-items-center justify-content-center px-4">
      <div className="text-5xl font-bold text-white mb-2">
        {typeof data.value === 'number' ? data.value.toLocaleString() : data.value}
      </div>
      <div className="text-md font-bold text-gray-300 mb-1">
        {data.description}
      </div>
      <div className="text-xs text-white-100">
        {data.period}
      </div>
    </div>
  );

  return (
    <Card
      header={header}
      className="kpi-card"
      style={getCardStyle(data.category)}
    >
      {content}
    </Card>
  );
};

export default KPICard; 