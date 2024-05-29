import { SUPPORTED_CURRENCIES } from "./variables";

export const roundFloat = (num: number, dp = 2): number =>
  Math.round(num * 10 ** dp) / 10 ** dp;
export const formatFloat = (num: number, dp = 2, sf = 10): string =>
  parseFloat(roundFloat(num, dp).toPrecision(sf)).toFixed(dp);


const formatShortenedNumber = (num: number, dp: number): string => {
  const absNum = Math.abs(num);
  if (absNum >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(dp)}m`;
  } else if (absNum >= 1000) {
    return `${(num / 1000).toFixed(dp)}k`;
  } else {
    return num.toFixed(dp);
  }
};

export const formatAmount = (
  value: number,
  unit: string,
  options?: { dp?: number; shorthand?: boolean }
): string => {
  const { dp = 2, shorthand = false } = options || {};
  const valueString = isNaN(value)
    ? "-"
    : shorthand && unit !== "h"
    ? formatShortenedNumber(parseFloat(formatFloat(Math.abs(value), dp)), dp)
    : parseFloat(formatFloat(Math.abs(value), dp)).toFixed(dp);

  const currency = SUPPORTED_CURRENCIES.find(
    (currency) => currency.code === unit
  );

  if (currency) {
    return `${value < 0 ? "-" : ""}${currency.symbol}${valueString}`;
  }
  if (unit === "$" || unit === "£" || unit === "R$" || unit === "€") {
    return `${value < 0 ? "-" : ""}${unit}${valueString}`;
  } else {
    // this is due to shorthand notation ending in k or m
    return `${value < 0 ? "-" : ""}${valueString}${unit}`;
  }
};
