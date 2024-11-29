export function lbsToKg(lbs: number): number {
  return Number((lbs * 0.45359237).toFixed(2))
}

export function parseWeightToKg(weight: string | number): number {
  if(typeof weight === 'number') return weight
  if(weight.toLowerCase().endsWith('lb') || weight.toLowerCase().endsWith('磅')) {
    return lbsToKg(Number(weight.replace(/lb|磅/i, '')))
  }
  return Number(weight)
}
