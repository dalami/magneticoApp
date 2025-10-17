// src/Lib/currency.js

/**
 * 🎯 Formatea un número como moneda Argentina (ARS) de forma segura y optimizada
 * 
 * @param {number|string} amount - Cantidad a formatear
 * @param {Object} options - Opciones adicionales de formato
 * @returns {string} Cantidad formateada como moneda ARS
 * 
 * @example
 * fmtARS(2500) // "$ 2.500"
 * fmtARS(1999.99) // "$ 1.999,99"
 * fmtARS("invalid", { fallback: "Gratis" }) // "Gratis"
 */
export const fmtARS = (amount, options = {}) => {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    fallback = "$ --",
    locale = "es-AR",
    currency = "ARS",
    compact = false,
    showSymbol = true
  } = options;

  try {
    // 🛡️ Validación y sanitización de entrada
    const numericAmount = parseFloat(amount);
    
    if (isNaN(numericAmount) || !isFinite(numericAmount)) {
      console.warn(`⚠️ Valor no numérico proporcionado a fmtARS:`, amount);
      return fallback;
    }

    // 🔢 Opciones base de formato
    const baseOptions = {
      style: showSymbol ? "currency" : "decimal",
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping: true,
    };

    // 📱 Formato compacto para números grandes
    if (compact && numericAmount >= 10000) {
      baseOptions.notation = "compact";
      baseOptions.compactDisplay = "short";
      baseOptions.maximumFractionDigits = 1;
    }

    // 🎨 Formatear con Intl.NumberFormat
    const formatter = new Intl.NumberFormat(locale, baseOptions);
    return formatter.format(numericAmount);

  } catch (error) {
    console.error("❌ Error en fmtARS:", error.message, { amount, options });
    return fallback;
  }
};

/**
 * 💰 Formatea un número como moneda sin símbolo (solo números formateados)
 * 
 * @param {number|string} amount - Cantidad a formatear
 * @param {Object} options - Opciones adicionales de formato
 * @returns {string} Cantidad formateada sin símbolo de moneda
 * 
 * @example
 * fmtNumber(2500) // "2.500"
 * fmtNumber(1999.99) // "1.999,99"
 */
export const fmtNumber = (amount, options = {}) => {
  return fmtARS(amount, { 
    ...options, 
    showSymbol: false,
    fallback: options.fallback || "--"
  });
};

/**
 * 🔢 Formatea un número como cantidad de productos (sin decimales)
 * 
 * @param {number|string} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada para productos
 * 
 * @example
 * fmtQuantity(5) // "5"
 * fmtQuantity(1500) // "1.500"
 */
export const fmtQuantity = (amount) => {
  return fmtNumber(amount, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    fallback: "0"
  });
};

/**
 * 📦 Formatea el precio unitario con símbolo opcional
 * 
 * @param {number|string} price - Precio unitario
 * @param {boolean} showSymbol - Mostrar símbolo de moneda
 * @returns {string} Precio unitario formateado
 * 
 * @example
 * fmtUnitPrice(2500) // "$ 2.500"
 * fmtUnitPrice(2500, false) // "2.500"
 */
export const fmtUnitPrice = (price, showSymbol = true) => {
  return fmtARS(price, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    showSymbol,
    fallback: showSymbol ? "$ --" : "--"
  });
};

/**
 * 🧮 Calcula y formatea el total basado en cantidad y precio unitario
 * 
 * @param {number} quantity - Cantidad de productos
 * @param {number} unitPrice - Precio unitario
 * @param {Object} options - Opciones de formato
 * @returns {string} Total formateado
 * 
 * @example
 * fmtTotal(5, 2500) // "$ 12.500"
 * fmtTotal(3, 1999.99) // "$ 5.999,97"
 */
export const fmtTotal = (quantity, unitPrice, options = {}) => {
  try {
    const qty = parseInt(quantity) || 0;
    const price = parseFloat(unitPrice) || 0;
    const total = qty * price;
    
    return fmtARS(total, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      fallback: "$ --",
      ...options
    });
  } catch (error) {
    console.error("❌ Error en fmtTotal:", error.message, { quantity, unitPrice });
    return options.fallback || "$ --";
  }
};

/**
 * 📊 Formatea un rango de precios
 * 
 * @param {number} min - Precio mínimo
 * @param {number} max - Precio máximo
 * @returns {string} Rango de precios formateado
 * 
 * @example
 * fmtPriceRange(2000, 5000) // "$ 2.000 - $ 5.000"
 */
export const fmtPriceRange = (min, max) => {
  const minFormatted = fmtARS(min, { fallback: "--" });
  const maxFormatted = fmtARS(max, { fallback: "--" });
  
  return `${minFormatted} - ${maxFormatted}`;
};

/**
 * 🔍 Valida si un valor puede ser formateado como moneda
 * 
 * @param {*} value - Valor a validar
 * @returns {boolean} True si es un valor numérico válido
 */
export const isValidCurrencyValue = (value) => {
  if (value === null || value === undefined) return false;
  
  const numericValue = parseFloat(value);
  return !isNaN(numericValue) && isFinite(numericValue) && numericValue >= 0;
};

/**
 * 🎯 Configuración por defecto para formateo de moneda
 */
export const CURRENCY_CONFIG = {
  locale: "es-AR",
  currency: "ARS",
  symbol: "$",
  decimalSeparator: ",",
  thousandSeparator: ".",
  precision: 2
};

// 🧪 Tests básicos para desarrollo
if (process.env.NODE_ENV === 'development') {
  const testCases = [
    { input: 2500, expected: "$ 2.500" },
    { input: 1999.99, expected: "$ 1.999,99" },
    { input: 0, expected: "$ 0" },
    { input: "invalid", expected: "$ --" },
    { input: null, expected: "$ --" }
  ];

  testCases.forEach(({ input, expected }) => {
    const result = fmtARS(input);
    if (result !== expected) {
      console.warn(`⚠️ Test fallido: fmtARS(${input}) = "${result}", esperado: "${expected}"`);
    }
  });
}

export default {
  fmtARS,
  fmtNumber,
  fmtQuantity,
  fmtUnitPrice,
  fmtTotal,
  fmtPriceRange,
  isValidCurrencyValue,
  CURRENCY_CONFIG
};