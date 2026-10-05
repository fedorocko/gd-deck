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

/** Query engines, not the model: how our compute compares on the same data. */
export const CLICKHOUSE = {
  value: '2.2×',
  label: 'faster than ClickHouse on the MPP engine',
}

export const IN_MEMORY_P90 = {
  value: '<1s',
  // a non-breaking hyphen keeps "in-memory" whole when the label wraps
  label: 'P90 latency for in\u2011memory datamarts under 5GB',
}
