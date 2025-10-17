import { useEffect, useCallback, memo } from "react";

/**
 * Componente de cuadrícula para mostrar fotos seleccionadas con opción de eliminar.
 * Optimizado para performance y manejo seguro de memoria.
 * 
 * @param {Array} files - Archivos con { preview, id, file }.
 * @param {Function} onRemove - Callback que recibe el índice a eliminar.
 * @param {boolean} disabled - Si está deshabilitado para eliminar fotos.
 */
function PhotoGrid({ files = [], onRemove, disabled = false }) {
  // 🧹 Limpieza segura de URLs temporales
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file?.preview && typeof file.preview === 'string') {
          try {
            URL.revokeObjectURL(file.preview);
          } catch (error) {
            console.warn('Error revoking URL:', error);
          }
        }
      });
    };
  }, [files]);

  // 🎯 Callback optimizado para eliminar fotos
  const handleRemove = useCallback((index) => {
    if (disabled) return;
    
    // Revocar URL antes de eliminar
    const fileToRemove = files[index];
    if (fileToRemove?.preview) {
      try {
        URL.revokeObjectURL(fileToRemove.preview);
      } catch (error) {
        console.warn('Error revoking URL on remove:', error);
      }
    }
    
    onRemove?.(index);
  }, [files, onRemove, disabled]);

  // 🃏 Generar ID único para cada foto si no existe
  const getFileId = useCallback((file, index) => {
    return file?.id || file?.name || `photo-${index}-${Date.now()}`;
  }, []);

  if (!files.length) return null;

  // 🎨 Estilos base con mejoras
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))",
    gap: "10px",
    marginBottom: "20px",
    padding: "5px",
  };

  const itemStyle = {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.2s ease",
    aspectRatio: "1.47/1", // Mantener proporción del imán
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    borderRadius: "10px",
    border: "2px solid #e5e7eb",
    backgroundColor: "#f9fafb", // Color de fondo mientras carga
  };

  const btnStyle = {
    position: "absolute",
    top: "6px",
    right: "6px",
    background: "rgba(255, 255, 255, 0.95)",
    border: "none",
    borderRadius: "50%",
    width: "26px",
    height: "26px",
    cursor: disabled ? "not-allowed" : "pointer",
    color: "#dc2626",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "1",
    textAlign: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    opacity: disabled ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  };

  const hoverStyles = {
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  };

  const btnHoverStyles = {
    background: "#ffffff",
    transform: "scale(1.1)",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
  };

  // 📸 Manejo de errores de carga de imagen
  const handleImageError = useCallback((e) => {
    console.warn('Error loading image preview');
    e.target.style.backgroundColor = '#f3f4f6';
    e.target.style.border = '2px dashed #d1d5db';
  }, []);

  // 🔄 Indicador de carga para imágenes
  const handleImageLoad = useCallback((e) => {
    e.target.style.backgroundColor = 'transparent';
  }, []);

  return (
    <div style={gridStyle}>
      {files.map((file, index) => (
        <div
          key={getFileId(file, index)}
          style={itemStyle}
          onMouseEnter={(e) => {
            if (!disabled) {
              Object.assign(e.currentTarget.style, hoverStyles);
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1.0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          title={file?.name || `Foto ${index + 1}`}
        >
          <img 
            src={file.preview} 
            alt={`Foto ${index + 1} - ${file?.name || 'sin nombre'}`}
            style={imgStyle}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy" // Lazy loading para mejor performance
          />
          
          <button
            type="button"
            onClick={() => handleRemove(index)}
            aria-label={`Eliminar foto ${index + 1}`}
            title={disabled ? "No se pueden eliminar fotos durante el procesamiento" : "Eliminar foto"}
            style={btnStyle}
            onMouseEnter={(e) => {
              if (!disabled) {
                Object.assign(e.currentTarget.style, btnHoverStyles);
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
              e.currentTarget.style.transform = "scale(1.0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
            }}
            disabled={disabled}
          >
            ×
          </button>

          {/* 🔢 Indicador de número de foto */}
          <div style={{
            position: "absolute",
            bottom: "6px",
            left: "6px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            borderRadius: "4px",
            padding: "2px 6px",
            fontSize: "10px",
            fontWeight: "600",
            lineHeight: "1",
          }}>
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

// 🚀 Optimización con memo para evitar re-renders innecesarios
export default memo(PhotoGrid, (prevProps, nextProps) => {
  // Solo re-renderizar si cambia el número de archivos o el estado disabled
  return (
    prevProps.files.length === nextProps.files.length &&
    prevProps.disabled === nextProps.disabled
  );
});