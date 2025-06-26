export const formatCurrencyBRL = (value) => {
  if (isNaN(value)) return "R$ 0,00";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatDateBR = (isoDate) => {
  if (!isoDate) return "";
  const [ano, mes, dia] = isoDate.split("-");
  return `${dia}/${mes}/${ano}`;
};

export const formatInputDate = (text) => {
  const cleaned = text.replace(/\D/g, "").slice(0, 8);
  const day = cleaned.slice(0, 2);
  const month = cleaned.slice(2, 4);
  const year = cleaned.slice(4, 8);
  let formatted = day;
  if (month) formatted += '/' + month;
  if (year) formatted += '/' + year;
  return formatted;
};

export const formatInputToCurrency = (text) => {
  const cleaned = text.replace(/\D/g, "");
  const numericValue = parseFloat(cleaned) / 100;
  if (isNaN(numericValue)) return "0,00";
  return numericValue.toFixed(2).replace(".", ",");
};
