import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
export const useStore = defineStore({
  id: 'store',
  state: () => ({
    type: 0,
    searchText: '',
    originData: [],
    searchData: [],
    toastClass: 'hide',
    paginationPage: 1,
    paginationPageSize: 10,
    paginationOffset: 0,
    collapseClass: 'collapse-color',
    showPrevious: true,
    isReload: false
  }),
  getters: {
    isNullOrEmpty: () => {
      return (item) => item == null || item === '無' || item === ''
    },
    collapseTargetName: () => {
      return (id) => '#collapse' + id
    },
    haveData: (state) => {
      return state.searchData.length > 0
    },
    getMenu: () => {
      return JSON.parse(import.meta.env.VITE_ROUTERINFO)
    }
  },
  actions: {
    async getData (params) {
      this.type = this.getTypeByPath(params.type)
      const url = `${import.meta.env.VITE_APIURL}${this.getDataPath(params)}/`
      await axios.get(url)
        .then(response => {
          for (const key in response.data.result) {
            response.data.result[key].Order = parseInt(key) + 1
          }
          this.originData = response.data.result
          this.searchData = response.data.result
          if (this.searchText !== '') {
            this.searchResult()
          }
        })
        .catch(error => {
          throw new Error(error.message)
        })
    },
    getDataPath (params) {
      let regionPath = ''
      if (Object.prototype.hasOwnProperty.call(params, 'region') &&
          Object.prototype.hasOwnProperty.call(params, 'town')) {
        regionPath = `/${params.region}/${params.town}`
        this.showPrevious = false
      }
      return `${params.type}${regionPath}`
    },
    getPathByType (type) {
      return this.getMenu.find(item => item.type === type).path
    },
    getTypeByPath (path) {
      return this.getMenu.find(item => item.path === path).type
    },
    searchResult () {
      let filterData = []
      switch (this.type) {
        case 1:
          filterData = this.filterFoodInfoData()
          break
        case 2:
          filterData = this.filterTouristSpotsDate()
          break
        case 3:
          filterData = this.filterHotelInfoDate()
          break
      }
      for (const key in filterData) {
        filterData[key].Order = parseInt(key) + 1
      }
      this.searchData = filterData
      if (this.isReload) {
        this.isReload = false
      } else {
        this.paginationPage = 1
        this.paginationOffset = 0
      }
    },
    clear () {
      this.searchText = ''
      this.searchData = this.originData
      this.paginationPage = 1
      this.paginationOffset = 0
    },
    showToast () {
      this.toastClass = 'show'
      setTimeout(() => {
        this.toastClass = 'hide'
      }, 1000)
    },
    filterFoodInfoData () {
      return this.originData.filter(item =>
        this.filterData(item.Name) ||
        this.filterData(item.Add) ||
        this.filterData(item.Tel) ||
        this.filterData(item.Opentime) ||
        this.filterData(item.Description)
      )
    },
    filterTouristSpotsDate () {
      return this.originData.filter(item =>
        this.filterData(item.Name) ||
        this.filterData(item.Add) ||
        this.filterData(item.Tel) ||
        this.filterData(item.Opentime) ||
        this.filterData(item.Ticketinfo) ||
        this.filterData(item.Travellinginfo) ||
        this.filterData(item.Toldescribe)
      )
    },
    filterHotelInfoDate () {
      return this.originData.filter(item =>
        this.filterData(item.Name) ||
        this.filterData(item.Add) ||
        this.filterData(item.Tel) ||
        this.filterData(item.Description) ||
        this.filterData(item.Serviceinfo)
      )
    },
    filterData (item) {
      if (this.isNullOrEmpty(item)) {
        return false
      }
      return item.indexOf(this.searchText) >= 0
    },
    collapse (index) {
      const buttonElement = document.getElementById('accordion-button' + index)
      const accordionElement = document.getElementById('accordion-item' + index)
      const isExpanded = buttonElement.getAttribute('aria-expanded')
      if (isExpanded === 'true') {
        accordionElement.classList.add(this.collapseClass)
      } else {
        accordionElement.classList.remove(this.collapseClass)
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'tourism_info',
        storage: sessionStorage,
        paths: ['originData', 'type', 'searchText', 'paginationPage', 'paginationOffset', 'isReload', 'showPrevious']
      }
    ]
  }
})
