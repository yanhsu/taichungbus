<template>
	<div class="busInfo">
		<no-ssr>
 			<hzqing-vue-timeline :dataList="busInfo">

			 </hzqing-vue-timeline>
		</no-ssr>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import NoSSR from 'vue-no-ssr'
import hzqingVueTimeline from 'hzqing-vue-timeline'
Vue.use(hzqingVueTimeline)
export default {
	watchQuery: ['q'],
	  components: {
    'no-ssr': NoSSR,
  },
	async fetch ({ env, store, req, params, query }) {
		const id = params.route
		const q = query.q
		if(store.state.bus.IntervalID) {
			const id = store.state.bus.IntervalID
			console.log(id)
			clearInterval(id)
		}
		await store.dispatch('bus/getBusInfo',{id, q})
		const intervalId = setInterval(async function () {
			await store.dispatch('bus/getBusInfo',{id, q})
		},60000)
		store.commit('bus/setIntervalId', intervalId);
	},
	computed: {
		busInfo: function() {
			return this.$store.state.bus.info
		}
	},
}
</script>