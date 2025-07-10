import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { useSiniestroData } from '../hooks/useSiniestroData';

const SiniestroDetalle: React.FC = () => {
  const { idSiniestro } = useParams<{ idSiniestro: string }>();
  const navigate = useNavigate();
  const { siniestro, cliente, siniestro_pago, vehiculo, poliza, loading, error } = useSiniestroData(idSiniestro || '');

  const cardStyle = {
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    marginBottom: "20px",
  } as React.CSSProperties;

  const sectionHeaderStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "16px",
    borderBottom: "2px solid #f3f4f6",
    paddingBottom: "8px",
  } as React.CSSProperties;

  const fieldStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    padding: "8px 0",
  } as React.CSSProperties;

  const labelStyle = {
    fontWeight: "500",
    color: "#6b7280",
    fontSize: "14px",
  } as React.CSSProperties;

  const valueStyle = {
    fontWeight: "600",
    color: "#111827",
    fontSize: "14px",
  } as React.CSSProperties;

  const formatCurrency = (value: number) => {
    return `S/. ${value.toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE");
  };

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Message severity="error" text={error} />
        <Button 
          label="Volver al Dashboard" 
          onClick={() => navigate('/')} 
          className="mt-3"
        />
      </div>
    );
  }

  return (
    <div className="siniestro-detalle-container" style={{ padding: '20px', minHeight: '100vh' }}>
      {/* Header */}
      <div className="flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#111827', fontSize: '28px', fontWeight: '700' }}>
          Detalles del Siniestro #{siniestro?.index}
        </h1>
        <Button 
          label="Volver" 
          icon="pi pi-arrow-left"
          onClick={() => navigate('/')} 
          className="p-button-outlined"
        />
      </div>

      <div className="grid">
        {/* Datos del Cliente */}
        <div className="col-12 md:col-6">
          <Card style={cardStyle}>
            <div style={sectionHeaderStyle}>Datos del Cliente</div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Nombre:</span>
              <span style={valueStyle}>{cliente?.nombre || 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>ID Cliente:</span>
              <span style={valueStyle}>{cliente?.cliente_key || 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Email:</span>
              <span style={valueStyle}>{cliente?.email || 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Teléfono:</span>
              <span style={valueStyle}>{cliente?.telefono || 'N/A'}</span>
            </div>
          </Card>
        </div>

        {/* Datos de la Póliza */}
        <div className="col-12 md:col-6">
          <Card style={cardStyle}>
            <div style={sectionHeaderStyle}>Datos de la Póliza</div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Número Póliza:</span>
              <span style={valueStyle}>{poliza?.numero_poliza || 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Tipo Cobertura:</span>
              <span style={valueStyle}>{poliza?.tipo_cobertura || 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Inicio Vigencia:</span>
              <span style={valueStyle}>{poliza?.fecha_inicio ? formatDate(poliza.fecha_inicio) : 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Fin Vigencia:</span>
              <span style={valueStyle}>{poliza?.fecha_fin ? formatDate(poliza.fecha_fin) : 'N/A'}</span>
            </div>
          </Card>
        </div>

        {/* Datos del Vehículo */}
        {vehiculo && (
          <div className="col-12 md:col-6">
            <Card style={cardStyle}>
              <div style={sectionHeaderStyle}>Datos del Vehículo</div>
              <div style={fieldStyle}>
                <span style={labelStyle}>Placa:</span>
                <span style={valueStyle}>{vehiculo.placa}</span>
              </div>
              <div style={fieldStyle}>
                <span style={labelStyle}>Marca:</span>
                <span style={valueStyle}>{vehiculo.marca}</span>
              </div>
              <div style={fieldStyle}>
                <span style={labelStyle}>Modelo:</span>
                <span style={valueStyle}>{vehiculo.modelo}</span>
              </div>
              <div style={fieldStyle}>
                <span style={labelStyle}>Año:</span>
                <span style={valueStyle}>{vehiculo.anio}</span>
              </div>
            </Card>
          </div>
        )}

        {/* Datos del Siniestro */}
        <div className="col-12 md:col-6">
          <Card style={cardStyle}>
            <div style={sectionHeaderStyle}>Datos del Siniestro</div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Categoría:</span>
              <span style={valueStyle}>{siniestro?.categoria || 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Estado Solicitud:</span>
              <span style={valueStyle}>{siniestro?.estado_solicitud || 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Estado Evaluación:</span>
              <span style={valueStyle}>{siniestro?.estado_evaluacion || 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Fecha Solicitud:</span>
              <span style={valueStyle}>{siniestro?.fecha_solicitud ? formatDate(siniestro.fecha_solicitud) : 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Fecha Evaluación:</span>
              <span style={valueStyle}>{siniestro?.fecha_evaluacion ? formatDate(siniestro.fecha_evaluacion) : 'N/A'}</span>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>Monto Solicitado:</span>
              <span style={valueStyle}>{siniestro?.monto_solicitado ? formatCurrency(siniestro.monto_solicitado) : 'N/A'}</span>
            </div>
          </Card>
        </div>

        {/* Datos del Pago */}
        {siniestro_pago && (
          <div className="col-12">
            <Card style={cardStyle}>
              <div style={sectionHeaderStyle}>Datos del Pago</div>
              <div className="grid">
                <div className="col-12 md:col-4">
                  <div style={fieldStyle}>
                    <span style={labelStyle}>Monto Pagado:</span>
                    <span style={valueStyle}>{formatCurrency(siniestro_pago.monto_pagado)}</span>
                  </div>
                </div>
                <div className="col-12 md:col-4">
                  <div style={fieldStyle}>
                    <span style={labelStyle}>Fecha Pago:</span>
                    <span style={valueStyle}>{formatDate(siniestro_pago.fecha_pago)}</span>
                  </div>
                </div>
                <div className="col-12 md:col-4">
                  <div style={fieldStyle}>
                    <span style={labelStyle}>Método Pago:</span>
                    <span style={valueStyle}>{siniestro_pago.metodo_pago}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiniestroDetalle; 