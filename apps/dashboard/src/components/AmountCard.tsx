import React from "react";
import { Card } from "primereact/card";
import { MonthlyAmount, KPIPago } from "../data/dashboardData";

interface AmountCardProps {
  data: MonthlyAmount;
}

interface AmountCardAPIProps {
  data: KPIPago;
}

const AmountCard: React.FC<AmountCardProps> = ({ data }) => {
  const cardStyle = {
    borderRadius: "16px",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0",
    position: "relative" as const,
    overflow: "hidden" as const,
  } as React.CSSProperties;

  const header = (
    <div className="flex justify-content-between align-items-center text-gray-400 pt-4 px-4 pb-0">
      <div className="text-md text-gray-400 font-semibold">{data.year}</div>
      <div className="text-md text-gray-400 font-semibold">{data.month}</div>
    </div>
  );

  const content = (
    <div className="flex flex-column align-items-center justify-content-between">
      <div className="text-5xl font-bold mb-4">
        {data.value.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="flex justify-content-between align-items-center w-full">
        <div className="text-sm text-gray-300 mb-1">{data.description}</div>
        <div className="text-2xl text-gray-300 mb-2 font-bold">{data.currency}</div>
      </div>
    </div>
  );

  return (
    <Card header={header} className="amount-card" style={cardStyle}>
      {content}
    </Card>
  );
};

// Nuevo componente para datos de API
const AmountCardAPI: React.FC<AmountCardAPIProps> = ({ data }) => {
  const cardStyle = {
    borderRadius: "16px",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0",
    position: "relative" as const,
    overflow: "hidden" as const,
  } as React.CSSProperties;

  const header = (
    <div className="flex justify-content-between align-items-center text-gray-400 pt-4 px-4 pb-0">
      <div className="text-md text-gray-400 font-semibold">{data.anio}</div>
      <div className="text-md text-gray-400 font-semibold">{data.mes}</div>
    </div>
  );

  const content = (
    <div className="flex flex-column align-items-center justify-content-between">
      <div className="text-5xl font-bold mb-4">
        {data.valor.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="flex justify-content-between align-items-center w-full">
        <div className="text-sm text-gray-300 mb-1">{data.descripcion}</div>
        <div className="text-2xl text-gray-300 mb-2 font-bold">S/.</div>
      </div>
    </div>
  );

  return (
    <Card header={header} className="amount-card" style={cardStyle}>
      {content}
    </Card>
  );
};

export default AmountCard;
export { AmountCardAPI };
