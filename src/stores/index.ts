import { defineStore } from 'pinia'
import axios from 'axios'
import regionData from '@/assets/tw-regions.json'

axios.defaults.withCredentials = true

interface regionData {
  county: string
  town: string[]
}

export const TypeUrl = {
  FOOD: 'food-info',
  HOTEL: 'hotel-info',
  SCENIC: 'tourist-spots'
} as const

export const useStore = defineStore('tourism-info', {
  state: () => ({
    regions: [] as regionData[],
    selectedCounty: '臺北市',
    selectedTown: '中正區',
    selectedType: TypeUrl.FOOD,
    searchText: '',
    searchData: [] as any[],
    toastClass: 'hide'
  }),
  getters: {
    isNullOrEmpty: () => {
      return (item: string) => item == null || item === '無' || item === ''
    }
  },
  actions: {
    getRegions() {
      this.regions = regionData
    },
    clearSearchText() {
      this.searchText = ''
    },
    showToast () {
      this.toastClass = 'show'
      setTimeout(() => {
        this.toastClass = 'hide'
      }, 1000)
    },
    async search () {
      const url = `${import.meta.env.VITE_APIURL}/${this.selectedType}/${this.selectedCounty}/${this.selectedTown}`
      await axios.get(url)
        .then(response => {
          this.searchData = response.data.data
        })
        .catch(error => {
          throw new Error(error.message)
        })
    }
  },
  persist: true
})
