import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CategoryData, ClientData, TopCategoria, TopCliente } from "../data/dashboardData";

interface DataTableProps {
  title: string;
  data: CategoryData[] | ClientData[];
  type: "category" | "client";
}

interface DataTableAPIProps {
  title: string;
  data: TopCategoria[] | TopCliente[];
  type: "category" | "client";
}

// Componente original para compatibilidad
const CustomDataTable: React.FC<DataTableProps> = ({ title, data, type }) => {
  const tableStyle = {
    borderRadius: "16px",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0",
    position: "relative" as const,
    overflow: "hidden" as const,
  } as React.CSSProperties;

  const headerStyle = {};

  const rowStyle = {};

  const getColumns = () => {
    if (type === "category") {
      return [
        { field: "year", header: "Año" },
        { field: "month", header: "Mes" },
        { field: "category", header: "Categoría" },
        { field: "total", header: "Total" },
      ];
    } else {
      return [
        { field: "year", header: "Año" },
        { field: "month", header: "Mes" },
        { field: "client", header: "Cliente" },
        { field: "total", header: "Total" },
      ];
    }
  };

  return (
    <div className="card p-4 py-5" style={tableStyle}>
      <h3 className="text-gray-400 mt-0 mb-4">{title}</h3>
      <DataTable
        value={data}
        responsiveLayout="scroll"
      >
        {getColumns().map((col, index) => (
          <Column
            key={index}
            field={col.field}
            header={col.header}
            headerStyle={headerStyle}
            bodyStyle={rowStyle}
          />
        ))}
      </DataTable>
      {/* <div className="text-xs text-gray-500 mt-2 text-center">... HASTA 10</div> */}
    </div>
  );
};

// Nuevo componente para datos de API
const DataTableAPI: React.FC<DataTableAPIProps> = ({ title, data, type }) => {
  const tableStyle = {
    borderRadius: "16px",
    boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0",
    position: "relative" as const,
    overflow: "hidden" as const,
  } as React.CSSProperties;

  const headerStyle = {};

  const rowStyle = {};

  const getColumns = () => {
    if (type === "category") {
      return [
        { field: "posicion", header: "Posición" },
        { field: "categoria", header: "Categoría" },
        { field: "total", header: "Total" },
        { field: "porcentaje", header: "Porcentaje %" },
      ];
    } else {
      return [
        { field: "posicion", header: "Posición" },
        { field: "cliente", header: "Cliente" },
        { field: "total", header: "Total" },
        { field: "porcentaje", header: "Porcentaje %" },
      ];
    }
  };

  // Función para formatear el porcentaje
  const formatPercentage = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <div className="card p-4 py-5" style={tableStyle}>
      <h3 className="text-gray-400 mt-0 mb-4">{title}</h3>
      <DataTable
        value={data}
        responsiveLayout="scroll"
        emptyMessage="No hay datos disponibles"
      >
        {getColumns().map((col, index) => (
          <Column
            key={index}
            field={col.field}
            header={col.header}
            headerStyle={headerStyle}
            bodyStyle={rowStyle}
            body={col.field === "porcentaje" ? (rowData) => formatPercentage(rowData[col.field]) : undefined}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default CustomDataTable;
export { DataTableAPI };
