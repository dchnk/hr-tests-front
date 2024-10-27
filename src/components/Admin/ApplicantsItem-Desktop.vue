<script setup>

defineEmits(['toggle'])

const {applicant, opened, status} = defineProps(['applicant', 'opened', 'status']);

</script>

<template>
  <div class="applicants__item-columns_desktop">
    <div class="applicants__item-column">{{ applicant.id }}</div>
    <div class="applicants__item-column">{{ applicant.name }}</div>
    <div class="applicants__item-column">{{ applicant.email }}</div>
    <div class="applicants__item-column">{{ applicant.phone }}</div>
    <div class="applicants__item-column">{{ applicant.date }}</div>
    <div class="applicants__item-column status">
      <div class="icon">
        <svg v-if="applicant.done" xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"
             fill="none">
          <path
              d="M11.7212 0.278745C11.3499 -0.093032 10.747 -0.0927976 10.3752 0.278745L4.31744 6.33674L1.62503 3.64435C1.25325 3.27257 0.650609 3.27257 0.278832 3.64435C-0.0929441 4.01613 -0.0929441 4.61877 0.278832 4.99055L3.6442 8.35592C3.82998 8.54169 4.07357 8.63481 4.31719 8.63481C4.5608 8.63481 4.80463 8.54193 4.9904 8.35592L11.7212 1.62492C12.0929 1.2534 12.0929 0.650498 11.7212 0.278745Z"
              fill="#8F47FF"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
              d="M6 3.08333V6L7.45833 6.875M11.25 6C11.25 8.89949 8.89949 11.25 6 11.25C3.1005 11.25 0.75 8.89949 0.75 6C0.75 3.1005 3.1005 0.75 6 0.75C8.89949 0.75 11.25 3.1005 11.25 6Z"
              stroke="#8F47FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      {{ status }}
    </div>
    <div class="applicants__item-column more" @click="$emit('toggle')" :class="opened && 'opened'">Подробнее
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
        <path d="M9 1.5L5 5.5L1 1.5" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>