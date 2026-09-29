/**
 * Figures from our benchmark, shared by every slide that quotes them so the
 * number and its footnote can only change together.
 */
// a non-breaking hyphen keeps "GPT-5.2" on one line in a narrow column
export const BENCHMARK_NOTE =
  'Benchmarked on production customer data, compared to GPT\u20115.2.'

export const ACCURACY = {
  value: '25%',
  label: 'higher accuracy',
  footnote: BENCHMARK_NOTE,
}

export const LATENCY = {
  value: '60%',
  label: 'lower latency',
  footnote: BENCHMARK_NOTE,
}
