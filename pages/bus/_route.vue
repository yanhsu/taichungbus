<template>
	<div class="busInfo">
		<b-navbar type="dark" variant="info">
			<b-navbar-nav :justified=true>
				<b-btn variant="outline-warning" @click="()=>{$router.push('/bus')}">返回</b-btn>
			</b-navbar-nav>
		</b-navbar>
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


		for (var i = 1; i < 99999; i++)
		clearInterval(i)
	},
	created: async function(){
		const id = this.$route.params.route
		const q = this.$route.query.q
		console.log(id);
		console.log(q);
		await this.$store.dispatch('bus/getBusInfo',{id, q})
	},
	computed: {
		busInfo: function() {
			return this.$store.state.bus.info
		}
	},
}
</script>