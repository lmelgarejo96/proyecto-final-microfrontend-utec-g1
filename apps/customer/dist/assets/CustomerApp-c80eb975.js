import { importShared } from './__federation_fn_import-52e70e7c.js';
import { reactExports } from './index-8967cf4c.js';
import { reactDomExports } from './index-d7920e96.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m$1=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m$1.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const React = await importShared('react');
const {useState} = React;
const InsuranceEvaluationDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState("DNI");
  const [documentNumber, setDocumentNumber] = useState("");
  const searchCustomer = async () => {
    if (!documentNumber.trim())
      return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://dfg14pnosb.execute-api.us-east-1.amazonaws.com/RiesgoClienteStage/riesgoClientes?tipo_documento=${documentType}&numero_documento=${documentNumber}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const customerData = {
        id: data.numero_documento,
        // o algún ID único de la respuesta
        fullName: data.nombre_completo || "",
        documentType: data.tipo_documento || documentType,
        documentNumber: data.numero_documento || documentNumber,
        age: data.edad_persona || 0,
        riskLevel: data.nivel_riesgo || "MEDIO",
        // Asegúrate que coincidan los valores
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
      console.error("Error fetching customer:", error);
      alert("Error al buscar cliente");
    } finally {
      setLoading(false);
    }
  };
  if (loading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Cargando..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    lineHeight: 1.6,
    color: "#212529"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      backgroundColor: "#1a3e72",
      color: "white",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "25px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Evaluación de Clientes - Seguro Vehicular" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "15px", marginTop: "15px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", minWidth: "200px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { marginBottom: "5px", fontWeight: 600, color: "white" }, children: "Tipo de Documento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: documentType,
              onChange: (e) => setDocumentType(e.target.value),
              style: {
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #dee2e6",
                fontSize: "16px"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "DNI", children: "DNI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PASAPORTE", children: "Pasaporte" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CARNET_EXTRANJERIA", children: "Carnet de Extranjería" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "LIBRETA_ELECTORAL", children: "Libreta Electoral" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "RUC", children: "RUC" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", minWidth: "200px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { marginBottom: "5px", fontWeight: 600, color: "white" }, children: "Número de Documento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: documentNumber,
              onChange: (e) => setDocumentNumber(e.target.value),
              placeholder: "Ingrese número de documento",
              style: {
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #dee2e6",
                fontSize: "16px"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: searchCustomer,
            style: {
              backgroundColor: "#4a90e2",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 600,
              alignSelf: "flex-end",
              transition: "background-color 0.3s"
            },
            children: "Buscar Cliente"
          }
        )
      ] })
    ] }),
    customer ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        marginBottom: "20px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "15px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderLeft: "4px solid #4a90e2"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, color: "#6c757d", marginBottom: "10px", fontSize: "0.9rem" }, children: "Nivel de Riesgo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.5rem", fontWeight: 600, color: "#1a3e72" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            display: "inline-block",
            padding: "5px 10px",
            borderRadius: "4px",
            fontWeight: 600,
            color: "white",
            backgroundColor: customer.riskLevel === "BAJO" ? "#27ae60" : customer.riskLevel === "MEDIO" ? "#f39c12" : "#e74c3c"
          }, children: customer.riskLevel }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "15px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderLeft: "4px solid #4a90e2"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, color: "#6c757d", marginBottom: "10px", fontSize: "0.9rem" }, children: "Total Siniestros" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.5rem", fontWeight: 600, color: "#1a3e72" }, children: customer.totalClaims })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "15px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderLeft: "4px solid #4a90e2"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, color: "#6c757d", marginBottom: "10px", fontSize: "0.9rem" }, children: "Antigüedad del Cliente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "1.5rem", fontWeight: 600, color: "#1a3e72" }, children: [
            customer.customerSeniority,
            " años"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "15px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderLeft: "4px solid #4a90e2"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, color: "#6c757d", marginBottom: "10px", fontSize: "0.9rem" }, children: "Ratio de Siniestralidad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.5rem", fontWeight: 600, color: "#1a3e72" }, children: customer.claimRatio })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        backgroundColor: "white",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        marginBottom: "25px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          backgroundColor: "#e9ecef",
          padding: "12px 20px",
          borderBottom: "1px solid #dee2e6",
          fontWeight: 600,
          color: "#1a3e72",
          fontSize: "1.1rem"
        }, children: "Datos del Cliente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "20px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Nombre Completo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: customer.fullName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Tipo de Documento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: customer.documentType })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Número de Documento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: customer.documentNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Edad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: [
              customer.age,
              " años"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        backgroundColor: "white",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        marginBottom: "25px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          backgroundColor: "#e9ecef",
          padding: "12px 20px",
          borderBottom: "1px solid #dee2e6",
          fontWeight: 600,
          color: "#1a3e72",
          fontSize: "1.1rem"
        }, children: "Historial de Siniestros" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "20px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Total de Siniestros" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: customer.totalClaims })
          ] }),
          customer.lastClaimDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Último Siniestro" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: customer.lastClaimDate })
          ] }),
          customer.daysSinceLastClaim && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Días desde último siniestro" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: customer.daysSinceLastClaim })
          ] }),
          customer.totalClaimAmount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Monto Total Siniestros" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: [
              "S/ ",
              customer.totalClaimAmount.toLocaleString()
            ] })
          ] }),
          customer.averageSeverity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Severidad Promedio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: [
              "S/ ",
              customer.averageSeverity.toLocaleString()
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        backgroundColor: "white",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        marginBottom: "25px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          backgroundColor: "#e9ecef",
          padding: "12px 20px",
          borderBottom: "1px solid #dee2e6",
          fontWeight: 600,
          color: "#1a3e72",
          fontSize: "1.1rem"
        }, children: "Información de Pólizas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "20px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }, children: [
          customer.totalPolicies && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Total de Pólizas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: customer.totalPolicies })
          ] }),
          customer.averagePremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Prima Promedio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: [
              "S/ ",
              customer.averagePremium.toLocaleString()
            ] })
          ] }),
          customer.totalPremiums && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Total de Primas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: [
              "S/ ",
              customer.totalPremiums.toLocaleString()
            ] })
          ] }),
          customer.historicalProfitability && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 600,
              color: "#1a3e72",
              display: "block",
              marginBottom: "5px",
              fontSize: "0.9rem"
            }, children: "Rentabilidad Histórica" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 0", fontSize: "1rem" }, children: [
              "S/ ",
              customer.historicalProfitability.toLocaleString()
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        backgroundColor: "white",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        marginBottom: "25px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          backgroundColor: "#e9ecef",
          padding: "12px 20px",
          borderBottom: "1px solid #dee2e6",
          fontWeight: 600,
          color: "#1a3e72",
          fontSize: "1.1rem"
        }, children: "Parámetros de Evaluación" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "20px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse", margin: "15px 0" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: {
              padding: "12px 15px",
              textAlign: "left",
              borderBottom: "1px solid #dee2e6",
              backgroundColor: "#e9ecef",
              fontWeight: 600,
              color: "#1a3e72"
            }, children: "Código" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: {
              padding: "12px 15px",
              textAlign: "left",
              borderBottom: "1px solid #dee2e6",
              backgroundColor: "#e9ecef",
              fontWeight: 600,
              color: "#1a3e72"
            }, children: "Descripción" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: {
              padding: "12px 15px",
              textAlign: "left",
              borderBottom: "1px solid #dee2e6",
              backgroundColor: "#e9ecef",
              fontWeight: 600,
              color: "#1a3e72"
            }, children: "Valor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: {
              padding: "12px 15px",
              textAlign: "left",
              borderBottom: "1px solid #dee2e6",
              backgroundColor: "#e9ecef",
              fontWeight: 600,
              color: "#1a3e72"
            }, children: "Impacto" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "P1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "Penaliza edades extremas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "2.0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "Bajo" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { backgroundColor: "#f8f9fa" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "P2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "Penaliza frecuencia de siniestros" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "15.0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "Moderado" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { backgroundColor: "#f8f9fa" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "P3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "Penaliza altos montos de siniestros" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "5.0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "Moderado" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "P4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "Penaliza antigüedad del vehículo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "1.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }, children: "Bajo" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right", fontSize: "0.8rem", color: "#6c757d", marginTop: "10px" }, children: [
        "Última actualización: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "01/07/2025 03:51" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", padding: "40px", color: "#6c757d" }, children: "Ingrese los datos del cliente para realizar la búsqueda" })
  ] });
};
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = client.createRoot(rootElement);
  root.render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InsuranceEvaluationDashboard, {}) })
  );
}

export { InsuranceEvaluationDashboard, client, jsxRuntimeExports };
