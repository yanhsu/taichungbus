<template>
		<div class="bus">
				<b-col cols='12' v-for="(route, index) in busRoute" :key="index">
						<b-row>
								<b-col cols='3'></b-col>
								<b-col cols='6' class="px-0">
										<b-list-group-item variant="success" class="mt-3 d-flex align-items-center list-item">
												<b-col cols=9>
														<label class="mr-2 my-0"> {{route.RouteName}} </label> 
														<label class="mr-2 my-0">{{ route.Departure }}</label> 
														<i class="fa fa-arrows-h"></i>
														<label class="mr-2 my-0">{{ route.Destination }}</label>
												</b-col>
												<b-col cols=3>
													<b-button variant="outline-primary" class="mr-2" @click="getOneBusInfo(route.RouteID,0)">去程</b-button>
													<b-button variant="outline-primary" @click="getOneBusInfo(route.RouteID,1)">回程</b-button>
												</b-col>
										</b-list-group-item>                      
								</b-col>
								<b-col cols='3'></b-col>
						</b-row>
				</b-col>
		</div>
</template>

<script>
import axios from 'axios'
export default {
		async fetch ({ env, store, req, params, query }) {
				await store.dispatch('bus/getBusList',{})
		},
		computed: {
				busRoute: function() {
						return this.$store.state.bus.list
				}
		},
		methods: {
			getOneBusInfo: function (id,q) {
				this.$router.push(`/${id}?q=${q}`)
			}
		}
}
</script>