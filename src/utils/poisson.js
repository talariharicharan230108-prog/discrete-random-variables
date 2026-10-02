/**
 * Poisson Distribution Utility Functions
 * Numerically stable implementations for discrete count probability calculations
 */

// Log factorial helper to prevent overflow for large k
export function logFactorial(k) {
  if (k < 0) return -Infinity;
  if (k === 0 || k === 1) return 0;
  
  let sum = 0;
  for (let i = 2; i <= k; i++) {
    sum += Math.log(i);
  }
  return sum;
}

export function factorial(k) {
  if (k < 0) return 0;
  if (k === 0 || k === 1) return 1;
  let res = 1;
  for (let i = 2; i <= k; i++) res *= i;
  return res;
}

/**
 * Poisson Probability Mass Function P(X = k)
 * P(X = k) = (e^-lambda * lambda^k) / k!
 */
export function poissonPMF(lambda, k) {
  if (k < 0 || lambda <= 0) return 0;
  if (k === 0) return Math.exp(-lambda);

  const logP = -lambda + k * Math.log(lambda) - logFactorial(k);
  return Math.exp(logP);
}

/**
 * Poisson Cumulative Distribution Function P(X <= k)
 */
export function poissonCDF(lambda, k) {
  if (k < 0) return 0;
  let sum = 0;
  for (let i = 0; i <= k; i++) {
    sum += poissonPMF(lambda, i);
  }
  return Math.min(1, sum);
}

/**
 * Mean E(X) = lambda
 */
export function poissonMean(lambda) {
  return lambda;
}

/**
 * Variance Var(X) = lambda
 */
export function poissonVariance(lambda) {
  return lambda;
}

/**
 * Standard Deviation σ = sqrt(lambda)
 */
export function poissonStdDev(lambda) {
  return Math.sqrt(lambda);
}

/**
 * Poisson Moment Generating Function M_X(t) = exp(lambda * (e^t - 1))
 */
export function poissonMGF(lambda, t) {
  return Math.exp(lambda * (Math.exp(t) - 1));
}

/**
 * MGF First derivative: M'_X(t) = lambda * e^t * exp(lambda * (e^t - 1))
 */
export function poissonMGFPrime(lambda, t) {
  const et = Math.exp(t);
  return lambda * et * Math.exp(lambda * (et - 1));
}

/**
 * MGF Second derivative: M''_X(t) = (lambda^2 * e^(2t) + lambda * e^t) * exp(lambda * (e^t - 1))
 */
export function poissonMGFDoublePrime(lambda, t) {
  const et = Math.exp(t);
  const factor = lambda * lambda * et * et + lambda * et;
  return factor * Math.exp(lambda * (et - 1));
}

/**
 * Generate Poisson probability distribution data array for Recharts
 * Auto-scales maximum k based on lambda
 */
export function generatePoissonData(lambda, selectedX = null, maxKOverride = null) {
  const data = [];
  const maxK = maxKOverride !== null 
    ? maxKOverride 
    : Math.max(15, Math.ceil(lambda + 4 * Math.sqrt(lambda)));
    
  let cumulative = 0;

  for (let k = 0; k <= maxK; k++) {
    const pmf = poissonPMF(lambda, k);
    cumulative += pmf;
    data.push({
      x: k,
      pmf: Number(pmf.toFixed(6)),
      cdf: Number(Math.min(1, cumulative).toFixed(6)),
      formattedPmf: (pmf * 100).toFixed(2) + '%',
      isSelected: selectedX !== null && k === selectedX
    });
  }

  return data;
}
