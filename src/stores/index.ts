import { defineStore } from 'pinia'
import axios from 'axios'
import regionData from '@/assets/tw-regions.json'

axios.defaults.withCredentials = true

interface regionData {
  county: string
  town: string[]
}

export const useStore = defineStore('tourism-info', {
  state: () => ({
    regions: [] as regionData[],
    selectedCounty: '臺北市',
    selectedTown: '中正區',
    selectedType: 1,
    searchText: ''
  }),
  getters: {

  },
  actions: {
    getRegions() {
      this.regions = regionData
    },
    clearSearchText() {
      this.searchText = ''
    },
    search () {
      
    }
  },
  persist: true
})
