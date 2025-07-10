import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

interface FilterOption {
  label: string;
  value: string;
}

interface DashboardFiltersProps {
  filters: {
    anio: number;
    mes: number;
    categoria?: string;
  };
  onFiltersChange: (filters: { anio?: number; mes?: number; categoria?: string }) => void;
  onClearCategoria: () => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  onClearCategoria 
}) => {
  const filterOptions: FilterOption[] = [
    { label: "Daños naturales", value: "Daños naturales" },
    { label: "Colisión", value: "Colisión" },
    { label: "Robo", value: "Robo" },
    { label: "Incendio", value: "Incendio" },
    { label: "Rotura de lunas", value: "Rotura de lunas" },
  ];

  // Crear fecha basada en los filtros actuales
  const selectedDate = new Date(filters.anio, filters.mes - 1); // mes - 1 porque Date es 0-indexed

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onFiltersChange({
        anio: date.getFullYear(),
        mes: date.getMonth() + 1 // +1 porque Date es 0-indexed pero API espera 1-indexed
      });
    }
  };

  const handleCategoriaChange = (categoria: string | null) => {
    if (categoria) {
      onFiltersChange({ categoria });
    } else {
      onClearCategoria();
    }
  };

  return (
    <div className="dashboard-filters py-4">
      <div className="flex justify-content-end align-items-center">
        <div className="flex gap-3">
          <Dropdown
            value={filters.categoria || null}
            options={filterOptions}
            onChange={(e) => handleCategoriaChange(e.value)}
            placeholder="Categoría (opcional)"
            className="w-15rem"
            showClear
          />
          <Calendar
            value={selectedDate}
            onChange={(e) => handleDateChange(e.value || null)}
            view="month"
            dateFormat="mm/yy"
            showIcon
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;
