export function logCombinations(n, r) {
  if (r < 0 || r > n) return -Infinity;
  if (r === 0 || r === n) return 0;
  
  let logComb = 0;
  for (let i = 1; i <= r; i++) {
    logComb += Math.log(n - r + i) - Math.log(i);
  }
  return logComb;
}

export function combinations(n, r) {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  return Math.round(Math.exp(logCombinations(n, r)));
}

export function binomialPMF(n, k, p) {
  if (k < 0 || k > n || p < 0 || p > 1) return 0;
  if (p === 0) return k === 0 ? 1 : 0;
  if (p === 1) return k === n ? 1 : 0;

  const logP = logCombinations(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p);
  return Math.exp(logP);
}
export function binomialCDF(n, k, p) {
  if (k < 0) return 0;
  if (k >= n) return 1;

  let sum = 0;
  for (let i = 0; i <= k; i++) {
    sum += binomialPMF(n, i, p);
  }
  return Math.min(1, sum);
}

/**
 * Mean E(X) = n * p
 */
export function binomialMean(n, p) {
  return n * p;
}

/**
 * Variance Var(X) = n * p * (1 - p)
 */
export function binomialVariance(n, p) {
  return n * p * (1 - p);
}

/**
 * Standard Deviation σ = sqrt(n * p * (1 - p))
 */
export function binomialStdDev(n, p) {
  return Math.sqrt(binomialVariance(n, p));
}

/**
 * Moment Generating Function M_X(t) = (1 - p + p * e^t)^n
 */
export function binomialMGF(n, p, t) {
  const term = 1 - p + p * Math.exp(t);
  return Math.pow(term, n);
}

/**
 * First derivative of MGF evaluated at t: M'_X(t)
 */
export function binomialMGFPrime(n, p, t) {
  const et = Math.exp(t);
  const base = 1 - p + p * et;
  return n * Math.pow(base, n - 1) * p * et;
}

/**
 * Second derivative of MGF evaluated at t: M''_X(t)
 */
export function binomialMGFDoublePrime(n, p, t) {
  const et = Math.exp(t);
  const base = 1 - p + p * et;
  const term1 = n * (n - 1) * Math.pow(base, n - 2) * Math.pow(p * et, 2);
  const term2 = n * Math.pow(base, n - 1) * p * et;
  return term1 + term2;
}

/**
 * Generate full probability distribution array for Recharts
 */
export function generateBinomialData(n, p, selectedX = null) {
  const data = [];
  let cumulative = 0;

  for (let k = 0; k <= n; k++) {
    const pmf = binomialPMF(n, k, p);
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
