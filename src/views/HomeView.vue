<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import FoodInfo from '@/views/FoodInfo.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HotelInfo from '@/views/HotelInfo.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TouristSpots from '@/views/TouristSpots.vue';
import { onMounted } from 'vue';
import { useStore, TypeUrl } from '@/stores';
const store = useStore();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const typeOptions = [
  { label: '餐飲', value: TypeUrl.FOOD },
  { label: '住宿', value: TypeUrl.HOTEL },
  { label: '景點', value: TypeUrl.SCENIC }
];

onMounted(() => {
  store.getRegions();
  updateTowns();
});

const updateTowns = () => {
  const townElement = document.getElementById('town');
  const towns = store.regions.find(item => item.county === store.selectedCounty)?.town || [];

  townElement.innerHTML = '';

  towns.forEach(town => {
    const option = document.createElement('option');
    option.value = town;
    option.textContent = town;
    townElement.appendChild(option);
  });
  store.selectedTown = towns[0];
};
</script>

<template lang="pug">
.container
  .row.mt-3
    .col-sm-12.col-md-6
      label.form-label.fw-bold(for="county") 縣市
      select#county.form-select(@change="updateTowns()" v-model="store.selectedCounty")
        option(v-for="item in store.regions" :key="item.county" :value="item.county") {{ item.county }}
    .col-sm-12.col-md-6
      label.form-label.fw-bold.mt-3.mt-md-0(for="town") 鄉鎮區
      select#town.form-select(v-model="store.selectedTown")
        option(value="") 請先選擇縣市
  .row.mt-3
    .col-sm-12.col-md-6
      label.form-label.fw-bold(for="type") 類型
      select#type.form-select(v-model="store.selectedType")
        option(v-for="item in typeOptions" :key="item.value" :value="item.value") {{ item.label }}
    .col-sm-12.col-md-6.d-flex.align-items-end
      .input-group.mt-3.mt-md-0
        input.form-control(type="text" placeholder="輸入關鍵字" v-model="store.searchText")
        button.btn.btn-secondary.d-flex(type="button" @click="store.clearSearchText")
          vue-feather(type="x")
  .row
    .col.d-grid.gap-2
      button.btn.btn-primary.mt-3(type="button" @click="store.handleClick" :disabled="store.isLoading")
        img(v-if="store.isLoading" src="@/assets/button-loading.svg" width="25")
        vue-feather(v-else type="search")
  .row
    div.col-sm-12.col-md-4.mt-3(v-if="store.searchData.length > 0" v-for="item in store.searchData" :key="item.Id")
      .card.h-100
        .card-header {{ item.Name }}
        .card-body
          .card-text.ellipsis {{ item.Description }}
          div.d-flex.justify-content-end.mt-3
            button.btn.btn-primary(data-bs-toggle="modal" :data-bs-target="'#modal' + item.Id") 更多
      .modal.fade(:id="'modal' + item.Id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true")
        .modal-dialog.modal-dialog-centered
          .modal-content
            .modal-header
              h5.modal-title.fw-bold {{ item.Name }}
              copy-component.ms-2(:copyText="item.Name")
              button.btn-close(type="button" data-bs-dismiss="modal" onclick="document.activeElement.blur()")
            .modal-body
              component(v-if="store.selectedType === TypeUrl.FOOD" :is="FoodInfo" :JsonData="item")
              component(v-if="store.selectedType === TypeUrl.HOTEL" :is="HotelInfo" :JsonData="item")
              component(v-if="store.selectedType === TypeUrl.SCENIC" :is="TouristSpots" :JsonData="item")
          toast-component
    div.no-data(v-if="store.searchData.length === 0 && !store.isLoading")
      img(src="@/assets/empty.png")
      h2.fw-bold 查無資料
</template>