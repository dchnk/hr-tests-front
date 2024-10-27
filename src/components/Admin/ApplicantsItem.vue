<script setup>
import {computed, ref} from "vue";

import ApplicantsItemContent from "./ApplicantsItemContent.vue";
import ApplicantsItemDesktop from "./ApplicantsItem-Desktop.vue";
import ApplicantsItemMobile from "./ApplicantsItem-Mobile.vue";

const {applicant} = defineProps(['applicant']);
const status = computed(() => applicant.done ? 'Готово' : 'Ожидаем');
const opened = ref(false);

function openedToggle() {
  opened.value = !opened.value;
}

</script>

<template>
  <div class="applicants__item">
    <ApplicantsItemDesktop :applicant='applicant' :status='status' :opened="opened" @toggle="openedToggle"/>
    <ApplicantsItemMobile :applicant='applicant' :status='status' :opened="opened" @toggle="openedToggle"/>
    <ApplicantsItemContent :applicant='applicant' :status='status' v-show="opened"/>
  </div>
</template>

<style lang="scss" scoped>
.applicants__item {
  display: flex;
  flex-direction: column;
  padding-top: 18px;
  border-top: 1px solid #E6E6E6;

  .applicants__item-columns_desktop {
    display: grid;
    gap: 16px;
    grid-template-columns: 50px 270px 170px 170px 130px 100px auto;
    align-items: center;
    margin-bottom: 16px;

    @media screen and (max-width: 1200px) {
      display: none;
    }

    .applicants__item-column {
      font-size: 14px;
      font-weight: 400;
      line-height: 19.6px;
      color: #122130;

      &.status {
        display: flex;
        align-items: center;

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 20px;
          min-width: 20px;
          border-radius: 4px;
          background-color: #F4F5F7;
          margin-right: 8px;
        }
      }

      &.more {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 700;
        line-height: 16.8px;
        color: #8F47FF;
        cursor: pointer;

        svg {
          margin-left: 10px;
          stroke: #8F47FF;
        }

        &.opened {
          svg {
            transform: rotate(-180deg);
          }
        }
      }
    }

  }
}
</style>