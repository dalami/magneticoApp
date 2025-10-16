/**
 * Formatea un valor numérico como moneda argentina (ARS)
 * Ejemplo: fmtARS(2500) => "$ 2.500"
 */
export function fmtARS(value) {
  if (isNaN(value) || value == null) return "$ 0";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * (Opcional) formato genérico para otras monedas.
 * Ejemplo: fmtCurrency(12.5, "USD", "en-US") => "$12.50"
 */
export function fmtCurrency(value, currency = "ARS", locale = "es-AR") {
  if (isNaN(value) || value == null) return "—";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
