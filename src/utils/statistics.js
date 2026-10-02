/**
 * Statistical Data Science Utility Functions
 * Descriptive statistics, frequency distributions, observed vs expected logic
 */

import { poissonPMF } from './poisson';
import { binomialPMF } from './binomial';

/**
 * Parses user text input into an array of clean numerical values
 */
export function parseObservations(inputStr) {
  if (!inputStr || typeof inputStr !== 'string') return [];
  
  return inputStr
    .split(/[\s,;\n\t]+/)
    .map(val => val.trim())
    .filter(val => val !== '' && !isNaN(val))
    .map(Number);
}

/**
 * Calculates complete summary statistics for an array of numbers
 */
export function calculateDescriptiveStats(data) {
  if (!data || data.length === 0) {
    return {
      count: 0,
      sum: 0,
      mean: 0,
      median: 0,
      mode: [],
      min: 0,
      max: 0,
      range: 0,
      sampleVariance: 0,
      popVariance: 0,
      sampleStdDev: 0,
      popStdDev: 0,
      skewness: 0
    };
  }

  const n = data.length;
  const sum = data.reduce((acc, val) => acc + val, 0);
  const mean = sum / n;

  // Sorted array for median, min, max
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[1] ? sorted[n - 1] : sorted[0];
  const range = max - min;

  // Median
  let median = 0;
  if (n % 2 === 0) {
    median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  } else {
    median = sorted[Math.floor(n / 2)];
  }

  // Mode
  const freqMap = {};
  let maxFreq = 0;
  data.forEach(val => {
    freqMap[val] = (freqMap[val] || 0) + 1;
    if (freqMap[val] > maxFreq) maxFreq = freqMap[val];
  });
  const mode = Object.keys(freqMap)
    .filter(key => freqMap[key] === maxFreq)
    .map(Number);

  // Variances
  const sumSqDiff = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  const popVariance = sumSqDiff / n;
  const sampleVariance = n > 1 ? sumSqDiff / (n - 1) : 0;
  const popStdDev = Math.sqrt(popVariance);
  const sampleStdDev = Math.sqrt(sampleVariance);

  // Skewness (Fisher-Pearson coefficient)
  let skewness = 0;
  if (n > 2 && popStdDev > 0) {
    const sumCubedDiff = data.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0);
    skewness = (sumCubedDiff / n) / Math.pow(popStdDev, 3);
  }

  return {
    count: n,
    sum: Number(sum.toFixed(4)),
    mean: Number(mean.toFixed(4)),
    median: Number(median.toFixed(4)),
    mode,
    min,
    max,
    range,
    sampleVariance: Number(sampleVariance.toFixed(4)),
    popVariance: Number(popVariance.toFixed(4)),
    sampleStdDev: Number(sampleStdDev.toFixed(4)),
    popStdDev: Number(popStdDev.toFixed(4)),
    skewness: Number(skewness.toFixed(4))
  };
}

/**
 * Builds observed vs expected frequencies for a Poisson model given raw observations
 */
export function calculatePoissonObservedVsExpected(observations) {
  if (!observations || observations.length === 0) return { data: [], lambda: 0, chiSquare: 0 };

  const stats = calculateDescriptiveStats(observations);
  const lambda = stats.mean;
  const nTotal = stats.count;

  // Observed frequency count map
  const obsMap = {};
  observations.forEach(val => {
    obsMap[val] = (obsMap[val] || 0) + 1;
  });

  const maxObs = stats.max;
  const maxK = Math.max(maxObs, Math.ceil(lambda + 3 * Math.sqrt(lambda)));

  const chartData = [];
  let chiSquare = 0;

  for (let k = 0; k <= maxK; k++) {
    const observed = obsMap[k] || 0;
    const probability = poissonPMF(lambda, k);
    const expected = nTotal * probability;

    // Chi-square contribution if expected >= 0.5 to avoid division by near-zero
    if (expected > 0.1) {
      chiSquare += Math.pow(observed - expected, 2) / expected;
    }

    chartData.push({
      x: k,
      observed,
      expected: Number(expected.toFixed(2)),
      probability: Number(probability.toFixed(4)),
      diff: Number((observed - expected).toFixed(2))
    });
  }

  return {
    data: chartData,
    lambda: Number(lambda.toFixed(4)),
    chiSquare: Number(chiSquare.toFixed(4)),
    nTotal
  };
}

/**
 * Sample Datasets for interactive exploration
 */
export const SAMPLE_DATASETS = {
  customerArrivals: {
    title: 'Illustrative Project Dataset: Customer Arrivals (10-min Intervals)',
    rawStr: '4, 6, 5, 7, 3, 4, 6, 5, 4, 6',
    description: 'Illustrative project dataset of simulated customer arrivals across 10 consecutive 10-minute intervals for Poisson model fitting.',
    type: 'Poisson'
  },
  examScores: {
    title: 'Illustrative Binomial Scenario: Student Exam Outcomes (n = 20, p = 0.60)',
    rawStr: '3, 4, 2, 3, 5, 3, 4, 3, 2, 4, 3, 3, 4, 2, 3, 5, 4, 3, 2, 4',
    description: 'Illustrative binomial scenario modeling student test question successes across trials.',
    type: 'Binomial'
  },
  callCenter: {
    title: 'Illustrative Project Dataset: Call Center Inbound Volume',
    rawStr: '2, 5, 3, 4, 1, 6, 3, 2, 4, 3, 5, 2, 4, 3, 1, 7, 3, 4, 2, 5',
    description: 'Illustrative project dataset representing simulated inbound call arrival frequencies per minute.',
    type: 'Poisson'
  },
  manufacturingDefects: {
    title: 'Illustrative Project Dataset: PCB Defect Counts',
    rawStr: '0, 1, 0, 0, 2, 1, 0, 0, 3, 1, 0, 2, 0, 1, 0, 0, 1, 0, 2, 0',
    description: 'Illustrative project dataset representing rare soldering defects per 100 printed circuit boards inspected.',
    type: 'Poisson'
  }
};
