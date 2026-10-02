/**
 * Combined Calculations & Dynamic Insight Generator
 */

import { binomialPMF, binomialCDF, binomialMean, binomialVariance, binomialStdDev } from './binomial';
import { poissonPMF, poissonCDF, poissonMean, poissonVariance, poissonStdDev } from './poisson';

/**
 * Generate side-by-side data comparing Binomial(n, p) and Poisson(lambda = n*p)
 */
export function generateBinomialPoissonComparisonData(n, p) {
  const lambda = n * p;
  const maxK = Math.min(n, Math.max(15, Math.ceil(lambda + 4 * Math.sqrt(lambda))));
  
  const data = [];
  let maxDiff = 0;
  let totalAbsDiff = 0;

  for (let k = 0; k <= maxK; k++) {
    const bProb = binomialPMF(n, k, p);
    const pProb = poissonPMF(lambda, k);
    const diff = Math.abs(bProb - pProb);
    const pctDiff = bProb > 0 ? (diff / bProb) * 100 : 0;

    if (diff > maxDiff) maxDiff = diff;
    totalAbsDiff += diff;

    data.push({
      x: k,
      binomial: Number(bProb.toFixed(6)),
      poisson: Number(pProb.toFixed(6)),
      formattedBinomial: (bProb * 100).toFixed(2) + '%',
      formattedPoisson: (pProb * 100).toFixed(2) + '%',
      diff: Number(diff.toFixed(6)),
      pctDiff: Number(pctDiff.toFixed(2))
    });
  }

  return {
    data,
    lambda: Number(lambda.toFixed(4)),
    maxDiff: Number(maxDiff.toFixed(6)),
    avgDiff: Number((totalAbsDiff / (maxK + 1)).toFixed(6))
  };
}

/**
 * Multi-operator range probability solver for Binomial or Poisson
 */
export function calculateRangeProbability(distType, params, operator, xVal, minVal = 0, maxVal = 0) {
  const { n = 10, p = 0.5, lambda = 5 } = params;

  let result = 0;
  let explanation = '';

  const getPMF = (k) => distType === 'binomial' ? binomialPMF(n, k, p) : poissonPMF(lambda, k);
  const maxK = distType === 'binomial' ? n : Math.max(30, Math.ceil(lambda + 5 * Math.sqrt(lambda)));

  switch (operator) {
    case 'equals': // P(X = x)
      result = getPMF(xVal);
      explanation = `P(X = ${xVal})`;
      break;

    case 'lessThanEq': // P(X <= x)
      for (let k = 0; k <= Math.min(xVal, maxK); k++) result += getPMF(k);
      explanation = `P(X ≤ ${xVal}) = Σ P(X = k) for k = 0 to ${xVal}`;
      break;

    case 'lessThan': // P(X < x)
      for (let k = 0; k < Math.min(xVal, maxK); k++) result += getPMF(k);
      explanation = `P(X < ${xVal}) = Σ P(X = k) for k = 0 to ${xVal - 1}`;
      break;

    case 'greaterThanEq': // P(X >= x)
      for (let k = xVal; k <= maxK; k++) result += getPMF(k);
      explanation = `P(X ≥ ${xVal}) = 1 - P(X < ${xVal})`;
      break;

    case 'greaterThan': // P(X > x)
      for (let k = xVal + 1; k <= maxK; k++) result += getPMF(k);
      explanation = `P(X > ${xVal}) = 1 - P(X ≤ ${xVal})`;
      break;

    case 'between': // P(a <= X <= b)
      for (let k = Math.max(0, minVal); k <= Math.min(maxVal, maxK); k++) result += getPMF(k);
      explanation = `P(${minVal} ≤ X ≤ ${maxVal}) = Σ P(X = k) for k = ${minVal} to ${maxVal}`;
      break;

    default:
      result = getPMF(xVal);
      explanation = `P(X = ${xVal})`;
  }

  return {
    probability: Number(Math.min(1, Math.max(0, result)).toFixed(6)),
    percentage: (Math.min(1, Math.max(0, result)) * 100).toFixed(3) + '%',
    explanation
  };
}

/**
 * Dynamic Insights Generator for "What the Model Tells Us" (Section 20)
 * Evaluates live lab parameters and produces academic analytical findings.
 */
export function generateDynamicInsights(binomParams, poissonParams) {
  const { n, p, selectedX: binomX } = binomParams;
  const { lambda, selectedX: poissonX } = poissonParams;

  const bMean = binomialMean(n, p);
  const bVar = binomialVariance(n, p);
  const bStd = binomialStdDev(n, p);
  const bProb = binomialPMF(n, binomX, p);

  const pMean = poissonMean(lambda);
  const pVar = poissonVariance(lambda);
  const pStd = poissonStdDev(lambda);
  const pProb = poissonPMF(lambda, poissonX);

  const bPApprox = generateBinomialPoissonComparisonData(n, p);

  // Determine Binomial Skewness
  let binomSkewDesc = 'symmetrical';
  if (p < 0.45) binomSkewDesc = 'right-skewed (positive skew)';
  else if (p > 0.55) binomSkewDesc = 'left-skewed (negative skew)';

  // Poisson Skewness
  let poissonSkewDesc = lambda < 5 ? 'noticeably right-skewed' : lambda < 15 ? 'moderately skewed' : 'nearly bell-shaped (normal approximation)';

  return [
    {
      id: 1,
      title: `Binomial Expectation & Variability (n = ${n}, p = ${p})`,
      metric: `E(X) = ${bMean.toFixed(2)} | Var(X) = ${bVar.toFixed(2)}`,
      badge: 'Binomial Model',
      badgeColor: 'blue',
      description: `For a process with ${n} independent trials and success probability ${p}, the theoretical average count of successes is exactly ${bMean.toFixed(2)} with a spread of σ = ${bStd.toFixed(2)}. The shape is ${binomSkewDesc}.`,
      highlight: `P(X = ${binomX}) = ${(bProb * 100).toFixed(2)}%`
    },
    {
      id: 2,
      title: `Poisson Event Rate Analysis (λ = ${lambda.toFixed(1)})`,
      metric: `E(X) = Var(X) = ${pMean.toFixed(2)}`,
      badge: 'Poisson Model',
      badgeColor: 'purple',
      description: `In a Poisson model with intensity rate λ = ${lambda.toFixed(1)}, the expected value and variance are identical (${pMean.toFixed(2)}). The distribution is ${poissonSkewDesc}.`,
      highlight: `P(X = ${poissonX}) = ${(pProb * 100).toFixed(2)}%`
    },
    {
      id: 3,
      title: `Binomial → Poisson Convergence Quality`,
      metric: `Max Abs Error = ${bPApprox.maxDiff}`,
      badge: bPApprox.maxDiff < 0.01 ? 'Excellent Fit' : bPApprox.maxDiff < 0.05 ? 'Good Fit' : 'Moderate Divergence',
      badgeColor: bPApprox.maxDiff < 0.01 ? 'emerald' : bPApprox.maxDiff < 0.05 ? 'amber' : 'rose',
      description: `Comparing Binomial(${n}, ${p}) against Poisson(λ = ${(n * p).toFixed(2)}): As n increases (${n}) and p decreases (${p}), the maximum probability discrepancy is ${bPApprox.maxDiff}.`,
      highlight: bPApprox.maxDiff < 0.01 ? 'Poisson approximation is highly accurate for this dataset!' : 'Increase n and decrease p to see stronger convergence.'
    }
  ];
}

/**
 * Formula Vault Cards Metadata
 */
export const FORMULA_VAULT = [
  {
    id: 'bin-pmf',
    title: 'Binomial Probability PMF',
    category: 'Binomial',
    formula: 'P(X = x) = \\binom{n}{x} p^x (1-p)^{n-x}',
    plainText: 'P(X = x) = C(n, x) * p^x * (1-p)^(n-x)',
    description: 'Calculates the exact probability of obtaining x successes in n independent Bernoulli trials.',
    variables: [
      { name: 'n', desc: 'Number of trials' },
      { name: 'p', desc: 'Probability of success per trial' },
      { name: 'x', desc: 'Number of observed successes (0 ≤ x ≤ n)' }
    ]
  },
  {
    id: 'bin-mean',
    title: 'Binomial Mean (Expected Value)',
    category: 'Binomial',
    formula: 'E(X) = n \\cdot p',
    plainText: 'E(X) = n * p',
    description: 'The expected (mean) number of successful outcomes over n repeated independent trials.',
    variables: [
      { name: 'n', desc: 'Number of trials' },
      { name: 'p', desc: 'Probability of success' }
    ]
  },
  {
    id: 'bin-var',
    title: 'Binomial Variance & Std Dev',
    category: 'Binomial',
    formula: '\\text{Var}(X) = n p (1-p), \\quad \\sigma = \\sqrt{n p (1-p)}',
    plainText: 'Var(X) = n*p*(1-p), σ = sqrt(n*p*(1-p))',
    description: 'Measures the dispersion or spread of trial outcomes around the expected mean.',
    variables: [
      { name: 'n', desc: 'Number of trials' },
      { name: 'p', desc: 'Probability of success' }
    ]
  },
  {
    id: 'poi-pmf',
    title: 'Poisson Probability PMF',
    category: 'Poisson',
    formula: 'P(X = x) = \\frac{e^{-\\lambda} \\lambda^x}{x!}',
    plainText: 'P(X = x) = (e^-λ * λ^x) / x!',
    description: 'Models the probability of observing x events in a fixed time interval or space.',
    variables: [
      { name: 'λ', desc: 'Average event rate per interval' },
      { name: 'x', desc: 'Number of occurred events (x = 0, 1, 2, ...)' }
    ]
  },
  {
    id: 'poi-mean-var',
    title: 'Poisson Mean & Variance Equivalence',
    category: 'Poisson',
    formula: 'E(X) = \\text{Var}(X) = \\lambda',
    plainText: 'E(X) = Var(X) = λ',
    description: 'Key hallmark property of the Poisson process: expected count equals variance.',
    variables: [
      { name: 'λ', desc: 'Average event rate' }
    ]
  },
  {
    id: 'mgf-bin',
    title: 'Binomial Moment Generating Function',
    category: 'Moment Generating Function',
    formula: 'M_X(t) = \\left(1 - p + p e^t\\right)^n',
    plainText: 'M_X(t) = (1 - p + p*e^t)^n',
    description: 'Used to derive all raw moments E(X^k) of the Binomial distribution by taking derivatives at t = 0.',
    variables: [
      { name: 't', desc: 'Real parameter in small neighborhood of 0' },
      { name: 'n', desc: 'Number of trials' },
      { name: 'p', desc: 'Success probability' }
    ]
  },
  {
    id: 'mgf-poi',
    title: 'Poisson Moment Generating Function',
    category: 'Moment Generating Function',
    formula: 'M_X(t) = \\exp\\left(\\lambda (e^t - 1)\\right)',
    plainText: 'M_X(t) = exp(λ * (e^t - 1))',
    description: 'MGF for Poisson distribution enabling computation of higher-order moments.',
    variables: [
      { name: 'λ', desc: 'Poisson rate parameter' },
      { name: 't', desc: 'MGF parameter' }
    ]
  },
  {
    id: 'approx-limit',
    title: 'Binomial → Poisson Limit Theorem',
    category: 'Approximation',
    formula: '\\lim_{n \\to \\infty, p \\to 0, np = \\lambda} \\binom{n}{x} p^x (1-p)^{n-x} = \\frac{e^{-\\lambda} \\lambda^x}{x!}',
    plainText: 'Lim (n->∞, p->0, np=λ): Binomial(n,p) -> Poisson(λ)',
    description: 'Poisson distribution as the limiting case of Binomial for large n and small p.',
    variables: [
      { name: 'n', desc: 'Large number of trials (n ≥ 20)' },
      { name: 'p', desc: 'Small success probability (p ≤ 0.05)' },
      { name: 'λ', desc: 'Constant product λ = np' }
    ]
  }
];
