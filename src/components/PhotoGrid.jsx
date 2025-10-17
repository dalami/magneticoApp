import { useEffect } from "react";

/**
 * Componente de cuadrícula para mostrar fotos seleccionadas con opción de eliminar.
 * @param {Array} files - Archivos con { preview, id }.
 * @param {Function} onRemove - Callback que recibe el índice a eliminar.
 */
export default function PhotoGrid({ files = [], onRemove }) {
  // 🧹 Limpieza de URLs temporales al desmontar o cambiar archivos
  useEffect(() => {
    return () => {
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  if (!files.length) return null;

  // 🎨 Estilos base
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
    gap: 8,
    marginBottom: 15,
  };

  const itemStyle = {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  };

  const imgStyle = {
    width: "100%",
    height: 80,
    objectFit: "cover",
    display: "block",
    borderRadius: 8,
    border: "1px solid #ddd",
  };

  const btnStyle = {
    position: "absolute",
    top: 4,
    right: 6,
    background: "rgba(255,255,255,0.7)",
    border: "none",
    borderRadius: "50%",
    width: 22,
    height: 22,
    cursor: "pointer",
    color: "#e11d48",
    fontSize: 16,
    fontWeight: 800,
    lineHeight: "18px",
    textAlign: "center",
    transition: "all 0.2s ease",
  };

  return (
    <div style={gridStyle}>
      {files.map((f, i) => (
        <div
          key={f.id || i}
          style={itemStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          <img src={f.preview} alt={`foto-${i}`} style={imgStyle} />
          <button
            type="button"
            onClick={() => onRemove(i)}
            aria-label={`Eliminar foto ${i + 1}`}
            title="Eliminar"
            style={btnStyle}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.7)")}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
