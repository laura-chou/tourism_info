import { defineStore } from 'pinia';
import axios from 'axios';
import regionData from '@/assets/tw-regions.json';

axios.defaults.withCredentials = true;

interface RegionData {
  county: string
  town: string[]
}

interface SearchItem {
  Id: number
  Add: string
  Name: string
  Tel: string
  OpenTime: string
  Website: string
  Description: string
  ServiceInfo: string[]
  Pictures: string[]
  TicketInfo: string
  TravellingInfo: string
  ChangeTime: string
}

export const TypeUrl = {
  FOOD: 'food-info',
  HOTEL: 'hotel-info',
  SCENIC: 'tourist-spots'
} as const;

export const useStore = defineStore('tourism-info', {
  state: () => ({
    regions: [] as RegionData[],
    selectedCounty: '新北市',
    selectedTown: '板橋區',
    selectedType: TypeUrl.FOOD,
    searchText: '',
    searchData: [] as SearchItem[],
    toastClass: 'hide',
    isLoading: false
  }),
  getters: {
    isNullOrEmpty: () => {
      return (item: string) => item == null || item === '無' || item === '';
    }
  },
  actions: {
    getRegions() {
      this.regions = regionData;
    },
    clearSearchText() {
      this.searchText = '';
    },
    showToast () {
      this.toastClass = 'show';
      setTimeout(() => {
        this.toastClass = 'hide';
      }, 1000);
    },
    async handleClick() {
      this.isLoading = true;
      this.searchData.length = 0;
      try {
        const url = `${import.meta.env.VITE_APIURL}/${this.selectedType}/${this.selectedCounty}/${this.selectedTown}`;
        await axios.get(url)
          .then(response => {
            const keyword = this.searchText.trim();
            this.searchData = response.data.data;
            if (!this.isNullOrEmpty(keyword)) {
              const filterData = this.searchData.filter((item: SearchItem) => {
                return (
                  item.Name.includes(keyword) ||
                  item.Description.includes(keyword) ||
                  item.Add.includes(keyword) ||
                  item.OpenTime?.includes(keyword) ||
                  item.ServiceInfo?.some(service => service.includes(keyword)) ||
                  item.TicketInfo?.includes(keyword) ||
                  item.TravellingInfo?.includes(keyword)
                );
              });

              this.searchData = filterData;
            }
          })
          .catch(error => {
            throw new Error(error.message);
          });
      } finally {
        this.isLoading = false;
      }
    },
  },
  persist: true
});
