<template>
		<div class="bus">
				<b-navbar type="dark" variant="info">
					<b-navbar-nav :justified=true>
						<b-nav-form>
							<b-form-input  class="mr-sm-2" type="text" v-model="search" placeholder="搜尋公車路線"/>
						</b-nav-form>
					</b-navbar-nav>
				</b-navbar>
				<b-col cols='12' class="card-item" v-for="(route, index) in busRoute" :key="index" v-show="(search == null || search == '') || (route.RouteName.indexOf(search) >= 0) && route.RouteName.indexOf(search[0]) == 0">
						<b-row>
								<b-col cols='3'></b-col>
								<b-col cols='6' class="px-0">
										<b-list-group-item variant="success"  class="mt-3 d-flex align-items-center list-item">
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
		data () {
			return {
				search: null,
			}
		},
		methods: {
			getOneBusInfo: function (id,q) {
				this.$router.push(`/bus/${id}?q=${q}`)
			},
			searchBus: function (search, id) {
				if(search == null || search == '') {
					return true
				} else if (id.indexOf(search) > 0) {
					return true
				} else return false
			}
		}
}
</script>