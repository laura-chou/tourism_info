<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStore } from '@/stores/index'
const store = useStore()

onMounted(() => {
  store.getRegions()
  updateTowns()
})

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
}

</script>

<template lang="pug">
  .container
    .row.mt-3
      .col-sm-12.col-md-6
        label.form-label.fw-bold(for="county") 縣市
        select#county.form-select(@change="updateTowns()" v-model="store.selectedCounty")
          option(v-for="item in store.regions" :key="item.county" :value="item.county") {{ item.county }}
      .col-sm-12.col-md-6
        label.form-label.fw-bold.mt-sm-2(for="town") 鄉鎮區
        select#town.form-select(v-model="store.selectedTown")
          option(value="") 請先選擇縣市
    .row.mt-3
      .col-sm-12.col-md-6
        label.form-label.fw-bold(for="type") 類型
        select#type.form-select(v-model="store.selectedType")
          option(value=1) 餐飲
          option(value=2) 住宿
          option(value=3) 景點
      .col-sm-12.col-md-6.d-flex.align-items-end
        .input-group.mt-sm-3
          input.form-control(type="text" placeholder="輸入關鍵字" v-model="store.searchText")
          button.btn.btn-secondary.d-flex(type="button" @click="store.clearSearchText()")
            vue-feather(type="x")
    .row
      .col.d-grid.gap-2
        button.btn.btn-primary.mt-3(type="button" @click="store.search()")
          vue-feather(type="search")
</template>