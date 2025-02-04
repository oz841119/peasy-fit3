export const parseToNumber = <T, F = undefined>(target: T, fallback?: F): number | F => {
  const ignores = ['', null, true, false]
  if (ignores.some(item => item === target)) {
    return fallback as F
  }
  if (Array.isArray(target)) {
    return fallback as F;
  }
  if (Object.is(target, -0) || target === '-0') {
    return 0;
  }
  const num = Number(target)
  return isNaN(num) ? fallback as F : num
};