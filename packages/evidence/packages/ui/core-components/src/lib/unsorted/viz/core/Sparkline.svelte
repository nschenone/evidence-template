<script context="module">
	export const evidenceInclude = true;
</script>

<script>
	import { QueryLoad } from '../../../atoms/query-load/index.js';
	import { Query } from '@evidence-dev/sdk/usql';
	import Sparkline from './_Sparkline.svelte';
	import EmptyChart from './EmptyChart.svelte';
	import ErrorChart from './ErrorChart.svelte';

	/** @type {import("@evidence-dev/sdk/usql).Query | unknown}*/
	export let data;

	const initialHash = Query.isQuery(data) ? data.hash : undefined;

	let isInitial = data?.hash === initialHash;
	$: isInitial = data?.hash === initialHash;

	/** @type {'pass' | 'warn' | 'error'}*/
	export let emptySet = undefined;

	/** @type {string}*/
	export let emptyMessage = undefined;

	let chartType = 'Sparkline';

	// Remove any undefined props (e.g. w/o defaults) to prevent them from being passed
	$: spreadProps = {
		...Object.fromEntries(Object.entries($$props).filter(([, v]) => v !== undefined))
	};

	let queryID = data?.id;
</script>

<!-- Pass all the props through-->
<QueryLoad {data} let:loaded>
	<EmptyChart
		slot="empty"
		{emptyMessage}
		{emptySet}
		chartType={spreadProps.chartType}
		{isInitial}
	/>
	<ErrorChart let:loaded slot="error" title={chartType} error={loaded.error.message} />
	<Sparkline {...spreadProps} data={Query.isQuery(loaded) ? Array.from(loaded) : loaded} {queryID}>
		<slot />
	</Sparkline>
</QueryLoad>
