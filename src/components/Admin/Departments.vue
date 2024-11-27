<script setup>
import {useModalStore} from "../../stores/modal.js";
import {storeToRefs} from "pinia";
import {useDepartmentsStore} from "../../stores/departments.js";

const modalStore = useModalStore();
const {modal} = storeToRefs(modalStore);

const departmentsStore = useDepartmentsStore();

</script>

<template>
  <div class="departments">
    <div class="heading">
      <div class="icon">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.16667 14C8.16667 14.7766 8.16667 15.1649 8.29353 15.4711C8.46269 15.8795 8.78715 16.204 9.19553 16.3731C9.50181 16.5 9.8901 16.5 10.6667 16.5H14C14.7766 16.5 15.1649 16.5 15.4711 16.3731C15.8795 16.204 16.204 15.8795 16.3731 15.4711C16.5 15.1649 16.5 14.7766 16.5 14C16.5 13.2234 16.5 12.8351 16.3731 12.5289C16.204 12.1205 15.8795 11.796 15.4711 11.6269C15.1649 11.5 14.7766 11.5 14 11.5H10.6667C9.8901 11.5 9.50181 11.5 9.19553 11.6269C8.78715 11.796 8.46269 12.1205 8.29353 12.5289C8.16667 12.8351 8.16667 13.2234 8.16667 14ZM8.16667 14H6.66667C5.73325 14 5.26654 14 4.91002 13.8183C4.59641 13.6586 4.34144 13.4036 4.18166 13.09C4 12.7335 4 12.2668 4 11.3333V6.5M4 6.5H14C14.7766 6.5 15.1649 6.5 15.4711 6.37313C15.8795 6.20398 16.204 5.87952 16.3731 5.47114C16.5 5.16485 16.5 4.77657 16.5 4C16.5 3.22343 16.5 2.83515 16.3731 2.52886C16.204 2.12048 15.8795 1.79602 15.4711 1.62687C15.1649 1.5 14.7766 1.5 14 1.5H4C3.22343 1.5 2.83515 1.5 2.52886 1.62687C2.12048 1.79602 1.79602 2.12048 1.62687 2.52886C1.5 2.83515 1.5 3.22343 1.5 4C1.5 4.77657 1.5 5.16485 1.62687 5.47114C1.79602 5.87952 2.12048 6.20398 2.52886 6.37313C2.83515 6.5 3.22343 6.5 4 6.5Z" stroke="#B9BBC1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="text">Разделы вакансий</div>
    </div>
    <div class="container">
      <div class="archive" @click="departmentsStore.showArchive"> Архив вакансий</div>
      <div class="add" @click="() => modalStore.openModal('createDepartment')">Создать раздел
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 6H11M6 1V11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.groups {
  .departments {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #E6E6E6;
    margin-bottom: 28px;

    @media screen and (max-width: 770px) {
      flex-direction: column;
      align-items: flex-start;
      padding-bottom: 16px;
    }

    .heading {
      display: flex;
      align-items: center;

      .icon {
        display: flex;
        min-width: 44px;
        height: 44px;
        background-color: #F4F5F7;
        border-radius: 10px;
        margin-right: 16px;

        @media screen and (max-width: 770px) {
          min-width: 32px;
          height: 32px;
          margin-right: 10px;
        }

        svg {
          margin: auto;
        }
      }

      .text {
        font-size: 22px;
        font-weight: 700;
        line-height: 26.4px;
        color: #192C40;

        @media screen and (max-width: 770px) {
          font-size: 18px;
          line-height: 21.6px;
        }
      }
    }

    .container {
      display: flex;

      @media screen and (max-width: 770px) {
        margin-top: 16px;
      }

      .archive {
        font-size: 14px;
        font-weight: 700;
        line-height: 16.8px;
        text-align: center;
        color: #8F47FF;
        padding: 13px 22px;
        border-radius: 10px;
        box-sizing: border-box;
        border: 1px solid transparent;
        cursor: pointer;
        margin-right: 12px;
        text-wrap: nowrap;

        &:hover {
          border: 1px solid #8F47FF
        }
      }

      .add {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 700;
        line-height: 16.8px;
        text-align: center;
        background-color: #EBE1FC;
        color: #8F47FF;
        padding: 13px 22px;
        border-radius: 10px;
        box-sizing: border-box;
        cursor: pointer;
        text-wrap: nowrap;

        svg {
          margin-left: 4px;
          stroke: #8F47FF;
        }

        &:hover {
          background-color: #8F47FF;
          color: #FFFFFF;

          svg {
            stroke: #FFFFFF;
          }
        }
      }
    }
  }

}

</style>