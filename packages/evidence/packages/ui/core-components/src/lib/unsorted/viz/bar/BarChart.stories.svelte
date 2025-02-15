<script context="module">
	/** @type {import("@storybook/svelte").Meta}*/
	export const meta = {
		title: 'Charts/BarCharts',
		argTypes: {
			xHasGaps: {
				type: 'boolean',
				description: 'Determines if every series has every x value',
				defaultValue: false
			},
			yHasNulls: {
				type: 'boolean',
				description: 'Determines if y can have nulls',
				defaultValue: false
			},
			seriesAlwaysExists: {
				type: 'boolean',
				description: 'Determines if the series prop can be null',
				defaultValue: true
			},
			type: {
				type: 'string',
				options: ['stacked', 'grouped', 'stacked100'],
				control: { type: 'select' }
			},
			labels: {
				type: 'boolean',
				control: { type: 'boolean' }
			},
			stackTotalLabel: {
				type: 'boolean',
				control: { type: 'boolean' }
			},
			seriesLabels: {
				type: 'boolean',
				control: { type: 'boolean' }
			},
			downloadableData: {
				control: 'boolean',
				options: [true, false]
			},
			downloadableImage: {
				control: 'boolean',
				options: [true, false]
			},
			seriesOrder: {
				control: 'array'
			}
		}
	};
</script>

<script>
	import { Story } from '@storybook/addon-svelte-csf';
	import { Query } from '@evidence-dev/sdk/usql';
	import { query } from '@evidence-dev/universal-sql/client-duckdb';

	import BarChart from './BarChart.svelte';
</script>

<Story name="Base" args={{ x: 'x', y: 'y', series: 'series' }} let:args>
	{@const data = Query.create(`select * from numeric_series`, query)}
	<BarChart {data} {...args} />
</Story>

<Story name="Labels" args={{ x: 'x', y: 'y', series: 'series', labels: true }} let:args>
	{@const data = Query.create(`select * from numeric_series`, query)}
	<BarChart {data} {...args} />
</Story>

<Story
	name="Total Labels Only"
	args={{ x: 'x', y: 'y', series: 'series', labels: true, seriesLabels: false }}
	let:args
>
	{@const data = Query.create(`select * from numeric_series`, query)}
	<BarChart {data} {...args} />
</Story>

<Story
	name="With seriesOrder"
	args={{ x: 'x', y: 'y', series: 'series', seriesOrder: ['ivory', 'blue', 'violet', 'olive'] }}
	let:args
>
	{@const data = Query.create(`select * from numeric_series`, query)}
	<BarChart {data} {...args} />
</Story>
<Story
	name="With seriesLabelFmt"
	args={{ x: 'x', y: 'y', series: 'series', seriesOrder: [0.1, 0.5] }}
	let:args
>
	{@const data = Query.create(
		`SELECT 0.1 AS series, 1 AS x, 10 AS y
UNION
SELECT 0.1 AS series, 2 AS x, 20 AS y
UNION
SELECT 0.1 AS series, 3 AS x, 30 AS y
UNION
SELECT 0.5 AS series, 1 AS x, 5 AS y
UNION
SELECT 0.5 AS series, 2 AS x, 15 AS y
UNION
SELECT 0.5 AS series, 3 AS x, 25 AS y`,
		query
	)}
	<BarChart {data} seriesLabelFmt="pct" {...args} />
</Story>
