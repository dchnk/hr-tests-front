<script setup>
import {ref, useTemplateRef, onMounted, watch, reactive} from "vue";
import {useDepartmentsStore} from "../../stores/departments.js";
import {storeToRefs} from "pinia";

const departmentsStore = useDepartmentsStore();
const {departments, selected} = storeToRefs(departmentsStore);

const isAffixes = ref(false);
const slider = useTemplateRef('my-slider');
const selectedList = reactive({});

function checkSliderIsAffixes() {
  if (slider.value.hasNext === false) {
    if (slider.value.hasPrev === false) {
      isAffixes.value = false;
    }
  } else {
    isAffixes.value = true;
  }
}

function handleSelectOnClick(e, department) {
  console.log(department)
  departmentsStore.selectDepartment(department);
}

onMounted(() => {
  checkSliderIsAffixes()
})

// watch(slider.value, (slider) => {
//   console.log(slider);
// }, { deep: true })

// watch(selectedList, (selectedList) => {
//   console.log(selectedList);
// })

</script>

<template>
  <div class="container">
    <div class="arrows" :class="isAffixes === false && 'disabled'"></div>
    <v-slide-group class="slider" show-arrows ref="my-slider">
<!--      <div class="select" data-name="1" :class="selectedList[1] && 'selected'"-->
<!--           @click.stop="(e) => { handleSelectOnClick(e) }">-->
<!--        <div class="notification"></div>-->
<!--        <div class="name">Все вакансии</div>-->
<!--      </div>-->
      <div class="select" v-for="(department, index) in departments" :data-name="index" :key="department.id" :class="selected === department && 'selected'"
           @click.stop="(e) => { handleSelectOnClick(e, department) }">
        <div class="notification"></div>
        <div class="name">{{ department.name }}</div>
      </div>
    </v-slide-group>
  </div>

</template>

<style lang="scss">

.container {
  position: relative;

  .arrows {
    position: absolute;
    right: 0;
    z-index: 5;
    box-sizing: border-box;
    width: 86px;
    height: 99%;
    border-radius: 10px;
    border: 1px solid #E6E6E6;
    background-color: #F8F8F8;

    &.disabled {
      display: none;
    }

    @media screen and (max-width: 820px) {
      display: none;
    }

    &:after {
      content: '';
      position: absolute;
      height: 100%;
      border-right: 1px solid #E6E6E6;
      left: 50%;
    }

    &:before {
      content: '';
      display: block;
      z-index: 2;
      position: absolute;
      height: 120%;
      width: 50%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 30%, #FFFFFF 100%);
      top: -4px;
      left: -51%;
    }
  }

  .slider {
    display: flex;
    position: relative;
    justify-content: space-between;
    width: 100%;

    .v-slide-group__container {
      max-width: calc(100% - 90px);

      @media screen and (max-width: 820px) {
        max-width: 100%;
      }
    }

    .v-slide-group__content {
      gap: 11px;
      position: static;

      @media screen and (max-width: 700px) {
        gap: 8px;
      }
    }

    .v-slide-group__next {
      position: absolute;
      justify-content: flex-end;
      z-index: 6;
      right: 3px;
      max-width: 30px;
      height: 99%;
      align-self: center;
      min-width: 0;

      .v-icon {
        --v-icon-size-multiplier: 1.5;
      }

      @media screen and (max-width: 820px) {
        display: none;
      }
    }

    .v-slide-group__prev {
      position: absolute;
      justify-content: flex-start;
      z-index: 6;
      max-width: 30px;
      right: 52px;
      height: 3.5em;
      align-self: center;
      min-width: 0;

      .v-icon {
        --v-icon-size-multiplier: 1.5;
      }

      @media screen and (max-width: 820px) {
        display: none;
      }
    }

    .v-slide-group__next--disabled {
      pointer-events: none;

      i {
        opacity: var(--v-disabled-opacity);
      }

      //display: none;
      opacity: 1;
    }

    .v-slide-group__prev--disabled {
      pointer-events: none;
      opacity: 1;

      i {
        opacity: var(--v-disabled-opacity);
      }
    }

    .select {
      padding: 13px 20px;
      box-sizing: border-box;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      line-height: 19.6px;
      text-align: center;
      color: #122130;
      background-color: #F4F5F7;
      cursor: pointer;
      user-select: none;

      &.selected {
        background-color: #8F47FF;
        color: #FFFFFF;
      }

      @media screen and (max-width: 700px) {
        padding: 10px;
        font-size: 13px;
        line-height: 18.2px;
      }

    }

  }
}


</style>