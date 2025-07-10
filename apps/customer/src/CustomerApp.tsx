import React, { useEffect, useState } from 'react';
import  ReactDOM  from 'react-dom/client';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase.config';


interface CustomerData {
  id: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  age: number;
  riskLevel: 'BAJO' | 'MEDIO' | 'ALTO';
  totalClaims: number;
  customerSeniority: number;
  claimRatio: number;
  lastClaimDate?: string;
  daysSinceLastClaim?: number;
  totalClaimAmount?: number;
  averageSeverity?: number;
  totalPolicies?: number;
  averagePremium?: number;
  totalPremiums?: number;
  historicalProfitability?: number;
}

const InsuranceEvaluationDashboard: React.FC = () => {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState('DNI');
  const [documentNumber, setDocumentNumber] = useState('');

  const searchCustomer = async () => {
    if (!documentNumber.trim()) return;
    
    setLoading(true);
    try {
    // Llamada al API Gateway
    const response = await fetch(
      `https://dfg14pnosb.execute-api.us-east-1.amazonaws.com/RiesgoClienteStage/riesgoClientes?tipo_documento=${documentType}&numero_documento=${documentNumber}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Mapear los datos de la API a tu interfaz CustomerData
    const customerData: CustomerData = {
      id: data.numero_documento, // o algún ID único de la respuesta
      fullName: data.nombre_completo || '',
      documentType: data.tipo_documento || documentType,
      documentNumber: data.numero_documento || documentNumber,
      age: data.edad_persona || 0,
      riskLevel: data.nivel_riesgo || 'MEDIO', // Asegúrate que coincidan los valores
      totalClaims: data.total_siniestros || 0,
      customerSeniority: data.antiguedad_anios || 0,
      claimRatio: data.ratio_siniestralidad || 0,
      lastClaimDate: data.ultimo_siniestro,
      daysSinceLastClaim: data.dias_desde_ultimo_siniestro,
      totalClaimAmount: data.monto_total_siniestros,
      averageSeverity: data.severidad_promedio,
      totalPolicies: data.total_polizas,
      averagePremium: data.prima_promedio,
      totalPremiums: data.total_primas,
      historicalProfitability: data.rentabilidad_historica
    };

    setCustomer(customerData);
    } catch (error) {
      console.error('Error fetching customer:', error);
      alert('Error al buscar cliente');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px', 
      backgroundColor: '#f8f9fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
      color: '#212529'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1a3e72',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '25px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1>Evaluación de Clientes - Seguro Vehicular</h1>
        <div style={{ display: 'flex', gap: '15px', marginTop: '15px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: '200px' }}>
            <label style={{ marginBottom: '5px', fontWeight: 600, color: 'white' }}>
              Tipo de Documento
            </label>
            <select 
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                fontSize: '16px'
              }}
            >
              <option value="DNI">DNI</option>
              <option value="PASAPORTE">Pasaporte</option>
              <option value="CARNET_EXTRANJERIA">Carnet de Extranjería</option>
              <option value="LIBRETA_ELECTORAL">Libreta Electoral</option>
              <option value="RUC">RUC</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: '200px' }}>
            <label style={{ marginBottom: '5px', fontWeight: 600, color: 'white' }}>
              Número de Documento
            </label>
            <input 
              type="text" 
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="Ingrese número de documento"
              style={{
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                fontSize: '16px'
              }}
            />
          </div>
          <button 
            onClick={searchCustomer}
            style={{
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
              alignSelf: 'flex-end',
              transition: 'background-color 0.3s'
            }}
          >
            Buscar Cliente
          </button>
        </div>
      </div>

      {customer ? (
        <div>
          {/* Summary Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #4a90e2'
            }}>
              <div style={{ fontWeight: 600, color: '#6c757d', marginBottom: '10px', fontSize: '0.9rem' }}>
                Nivel de Riesgo
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a3e72' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontWeight: 600,
                  color: 'white',
                  backgroundColor: customer.riskLevel === 'BAJO' ? '#27ae60' : 
                                  customer.riskLevel === 'MEDIO' ? '#f39c12' : '#e74c3c'
                }}>
                  {customer.riskLevel}
                </span>
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #4a90e2'
            }}>
              <div style={{ fontWeight: 600, color: '#6c757d', marginBottom: '10px', fontSize: '0.9rem' }}>
                Total Siniestros
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a3e72' }}>
                {customer.totalClaims}
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #4a90e2'
            }}>
              <div style={{ fontWeight: 600, color: '#6c757d', marginBottom: '10px', fontSize: '0.9rem' }}>
                Antigüedad del Cliente
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a3e72' }}>
                {customer.customerSeniority} años
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #4a90e2'
            }}>
              <div style={{ fontWeight: 600, color: '#6c757d', marginBottom: '10px', fontSize: '0.9rem' }}>
                Ratio de Siniestralidad
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a3e72' }}>
                {customer.claimRatio}
              </div>
            </div>
          </div>

          {/* Customer Data Section */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            marginBottom: '25px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              backgroundColor: '#e9ecef',
              padding: '12px 20px',
              borderBottom: '1px solid #dee2e6',
              fontWeight: 600,
              color: '#1a3e72',
              fontSize: '1.1rem'
            }}>
              Datos del Cliente
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <span style={{
                    fontWeight: 600,
                    color: '#1a3e72',
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '0.9rem'
                  }}>
                    Nombre Completo
                  </span>
                  <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                    {customer.fullName}
                  </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <span style={{
                    fontWeight: 600,
                    color: '#1a3e72',
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '0.9rem'
                  }}>
                    Tipo de Documento
                  </span>
                  <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                    {customer.documentType}
                  </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <span style={{
                    fontWeight: 600,
                    color: '#1a3e72',
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '0.9rem'
                  }}>
                    Número de Documento
                  </span>
                  <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                    {customer.documentNumber}
                  </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <span style={{
                    fontWeight: 600,
                    color: '#1a3e72',
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '0.9rem'
                  }}>
                    Edad
                  </span>
                  <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                    {customer.age} años
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Claims History Section */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            marginBottom: '25px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              backgroundColor: '#e9ecef',
              padding: '12px 20px',
              borderBottom: '1px solid #dee2e6',
              fontWeight: 600,
              color: '#1a3e72',
              fontSize: '1.1rem'
            }}>
              Historial de Siniestros
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <span style={{
                    fontWeight: 600,
                    color: '#1a3e72',
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '0.9rem'
                  }}>
                    Total de Siniestros
                  </span>
                  <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                    {customer.totalClaims}
                  </div>
                </div>
                {customer.lastClaimDate && (
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{
                      fontWeight: 600,
                      color: '#1a3e72',
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '0.9rem'
                    }}>
                      Último Siniestro
                    </span>
                    <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                      {customer.lastClaimDate}
                    </div>
                  </div>
                )}
                {customer.daysSinceLastClaim && (
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{
                      fontWeight: 600,
                      color: '#1a3e72',
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '0.9rem'
                    }}>
                      Días desde último siniestro
                    </span>
                    <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                      {customer.daysSinceLastClaim}
                    </div>
                  </div>
                )}
                {customer.totalClaimAmount && (
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{
                      fontWeight: 600,
                      color: '#1a3e72',
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '0.9rem'
                    }}>
                      Monto Total Siniestros
                    </span>
                    <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                      S/ {customer.totalClaimAmount.toLocaleString()}
                    </div>
                  </div>
                )}
                {customer.averageSeverity && (
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{
                      fontWeight: 600,
                      color: '#1a3e72',
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '0.9rem'
                    }}>
                      Severidad Promedio
                    </span>
                    <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                      S/ {customer.averageSeverity.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Policy Information Section */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            marginBottom: '25px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              backgroundColor: '#e9ecef',
              padding: '12px 20px',
              borderBottom: '1px solid #dee2e6',
              fontWeight: 600,
              color: '#1a3e72',
              fontSize: '1.1rem'
            }}>
              Información de Pólizas
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {customer.totalPolicies && (
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{
                      fontWeight: 600,
                      color: '#1a3e72',
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '0.9rem'
                    }}>
                      Total de Pólizas
                    </span>
                    <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                      {customer.totalPolicies}
                    </div>
                  </div>
                )}
                {customer.averagePremium && (
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{
                      fontWeight: 600,
                      color: '#1a3e72',
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '0.9rem'
                    }}>
                      Prima Promedio
                    </span>
                    <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                      S/ {customer.averagePremium.toLocaleString()}
                    </div>
                  </div>
                )}
                {customer.totalPremiums && (
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{
                      fontWeight: 600,
                      color: '#1a3e72',
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '0.9rem'
                    }}>
                      Total de Primas
                    </span>
                    <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                      S/ {customer.totalPremiums.toLocaleString()}
                    </div>
                  </div>
                )}
                {customer.historicalProfitability && (
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{
                      fontWeight: 600,
                      color: '#1a3e72',
                      display: 'block',
                      marginBottom: '5px',
                      fontSize: '0.9rem'
                    }}>
                      Rentabilidad Histórica
                    </span>
                    <div style={{ padding: '8px 0', fontSize: '1rem' }}>
                      S/ {customer.historicalProfitability.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Evaluation Parameters Section */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            marginBottom: '25px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              backgroundColor: '#e9ecef',
              padding: '12px 20px',
              borderBottom: '1px solid #dee2e6',
              fontWeight: 600,
              color: '#1a3e72',
              fontSize: '1.1rem'
            }}>
              Parámetros de Evaluación
            </div>
            <div style={{ padding: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', margin: '15px 0' }}>
                <thead>
                  <tr>
                    <th style={{
                      padding: '12px 15px',
                      textAlign: 'left',
                      borderBottom: '1px solid #dee2e6',
                      backgroundColor: '#e9ecef',
                      fontWeight: 600,
                      color: '#1a3e72'
                    }}>
                      Código
                    </th>
                    <th style={{
                      padding: '12px 15px',
                      textAlign: 'left',
                      borderBottom: '1px solid #dee2e6',
                      backgroundColor: '#e9ecef',
                      fontWeight: 600,
                      color: '#1a3e72'
                    }}>
                      Descripción
                    </th>
                    <th style={{
                      padding: '12px 15px',
                      textAlign: 'left',
                      borderBottom: '1px solid #dee2e6',
                      backgroundColor: '#e9ecef',
                      fontWeight: 600,
                      color: '#1a3e72'
                    }}>
                      Valor
                    </th>
                    <th style={{
                      padding: '12px 15px',
                      textAlign: 'left',
                      borderBottom: '1px solid #dee2e6',
                      backgroundColor: '#e9ecef',
                      fontWeight: 600,
                      color: '#1a3e72'
                    }}>
                      Impacto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      P1
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      Penaliza edades extremas
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      2.0
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      Bajo
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      P2
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      Penaliza frecuencia de siniestros
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      15.0
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      Moderado
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      P3
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      Penaliza altos montos de siniestros
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      5.0
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      Moderado
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      P4
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      Penaliza antigüedad del vehículo
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      1.5
                    </td>
                    <td style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                      Bajo
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#6c757d', marginTop: '10px' }}>
            Última actualización: <span>01/07/2025 03:51</span>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
          Ingrese los datos del cliente para realizar la búsqueda
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <InsuranceEvaluationDashboard />
    </React.StrictMode>
  );
}

export default InsuranceEvaluationDashboard;