import { useEffect } from "react";

export default function PhotoGrid({ files, onRemove }) {
  // ✅ Liberar las URLs de vista previa cuando se desmonta o cambian los archivos
  useEffect(() => {
    return () => {
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  if (!files.length) return null;

  // ✅ Estilos compartidos
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
    gap: 8,
    marginBottom: 15,
  };

  const imgStyle = {
    width: "100%",
    height: 70,
    objectFit: "cover",
    borderRadius: 8,
    border: "1px solid #ddd",
  };

  const btnStyle = {
    position: "absolute",
    top: 4,
    right: 6,
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: "#e11d48", // rojo vibrante
    fontSize: 18,
    fontWeight: 800,
    lineHeight: 1,
  };

  return (
    <div style={gridStyle}>
      {files.map((f, i) => (
        <div key={f.id || i} style={{ position: "relative" }}>
          <img src={f.preview} alt={`foto-${i}`} style={imgStyle} />
          <button
            type="button"
            onClick={() => onRemove(i)}
            aria-label="Eliminar foto"
            title="Eliminar"
            style={btnStyle}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
