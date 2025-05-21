export const formatNumber = (value, locale = "id-ID", currency) => {
  const options = currency
    ? { style: "currency", currency }
    : { maximumFractionDigits: 2 };

  return value.toLocaleString(locale, options);
};
