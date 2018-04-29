import axios from 'axios'
import Promise from 'bluebird'

const defaultState = {
  	info: [],
	list: [],
}

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
		setInfo (state, info = defaultState.info) {
			state.info = info
		},
		setList (state, list = defaultState.list) {
			state.list = list
		},
  },
  actions: {
	getBusList: async function ({ commit, state }) {
		try {
			let busRoute = await axios({
				url: `${process.env.api}/BusRouteAPI`,
				method: 'get'
				})
				.then((res) => {
					return Promise.resolve(res.data)
				})
				.catch((err) => {
					console.log(err)
				})
			commit('setList',busRoute)
		} catch (err) {
			console.log(err)
		}
	},
	getBusInfo: async function ({ commit, state, dispatch }, { id, q}) {
		try {
			let busInfo = await axios({
				url: `${process.env.api}/BusRouteAPI/${id}/${q}`,
				method: 'get'
				})
				.then((res) => {
					console.log(res)
					return Promise.resolve(res.data.Stops)
				})
				.catch((err) => {
					console.log(err)
				})
			let temp = []
			for(let stop of busInfo) {
				if(stop.EstimateTime < 60) {
					stop.EstimateTime = 0
				}
				let tempStop = {}
				if (stop.EstimateTime != 0 && (parseInt(stop.EstimateTime)/60 <=5))
				tempStop.img = '/bus_red.png'
				else
				tempStop.img = '/bus.png'
				tempStop.content = stop.EstimateTime == 0 ?`下班車時間:${stop.NextBusTime}`:`下班車時間:${parseInt(stop.EstimateTime)/60}分後　　車號: ${stop.PlateNumb}`
				tempStop.title = stop.StopName
				tempStop.time = stop.SourceDateTime
				temp.push(tempStop)
			}
			const intervalId = setInterval(function () {
				dispatch('getBusInfo2',{id, q})
			},10000)
			commit('setInfo',temp)
		} catch (err) {
			console.log(err)
		}
	},
	getBusInfo2: async function ({ commit, state, dispatch }, { id, q}) {
		try {
			let busInfo = await axios({
				url: `${process.env.api}/BusRouteAPI/${id}/${q}`,
				method: 'get'
				})
				.then((res) => {
					console.log(res)
					return Promise.resolve(res.data.Stops)
				})
				.catch((err) => {
					console.log(err)
				})
			let temp = []
			for(let stop of busInfo) {
				if(stop.EstimateTime < 60) {
					stop.EstimateTime = 0
				}
				let tempStop = {}
				if (stop.EstimateTime != 0 && (parseInt(stop.EstimateTime)/60 <=5))
				tempStop.img = '/bus_red.png'
				else
				tempStop.img = '/bus.png'
				tempStop.content = stop.EstimateTime == 0 ?`下班車時間:${stop.NextBusTime}`:`下班車時間:${parseInt(stop.EstimateTime)/60}分後　　車號: ${stop.PlateNumb}`
				tempStop.title = stop.StopName
				tempStop.time = stop.SourceDateTime
				temp.push(tempStop)
			}
			commit('setInfo',temp)
		} catch (err) {
			console.log(err)
		}
	}
 }
}
