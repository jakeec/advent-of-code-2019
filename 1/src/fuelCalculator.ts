export const fuelCalculator = (mass: number): number => {
  const fuel = Math.floor(mass / 3) - 2;
  if (fuel < 0) return 0;
  return fuel + fuelCalculator(fuel);
};
