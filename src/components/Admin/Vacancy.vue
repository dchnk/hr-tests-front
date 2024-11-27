<script setup>
import {ref} from "vue";
import Tooltip from "../ui/Tooltip.vue";
import Send from "./Send.vue";
import Applicants from "./Applicants.vue";
import {useModalStore} from "../../stores/modal.js";

const modalStore = useModalStore();

const {text, vacancy} = defineProps(['text', 'vacancy']);
const isOpen = ref(false);
const menuIsOpen = ref(false);
function handleOpenToggle() {
  isOpen.value = !isOpen.value;
}

function handleOpenMenu() {
  menuIsOpen.value = !menuIsOpen.value;
}

</script>

<template>
  <div class="vacancy" :class="isOpen && 'open'">
    <div class="heading">
<!--      <div class="notification" v-if="!isOpen">18</div>-->
      <div class="name" :class="isOpen && 'open'">{{ text }}</div>
      <div class="btn edit" v-if="isOpen" @click="() => modalStore.openModal('editVacancy', vacancy)">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
          <path
            d="M14.6456 4.22922L17.5919 7.1755M1.625 20.3748L1.67443 20.0288C1.84933 18.8045 1.93679 18.1923 2.13572 17.6207C2.31224 17.1136 2.55338 16.6313 2.85319 16.1858C3.19106 15.6837 3.62832 15.2465 4.50286 14.3719L16.6362 2.23861C17.4498 1.42502 18.7689 1.42502 19.5825 2.23861C20.3961 3.0522 20.3961 4.3713 19.5825 5.18489L7.2265 17.5409C6.43312 18.3342 6.03643 18.7309 5.58458 19.0464C5.18352 19.3264 4.75096 19.5584 4.29581 19.7375C3.78303 19.9394 3.23308 20.0503 2.13326 20.2722L1.625 20.3748Z"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="tooltip">Редактировать вакансию</div>
      </div>
      <div class="btn archive" v-if="isOpen" @click="() => modalStore.openModal('archiveVacancy')">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
          <path
            d="M7.875 12.0846H14.125M3.29167 7.91797H18.7083C19.2917 7.91797 19.5834 7.91797 19.8062 7.80443C20.0022 7.70457 20.1616 7.54521 20.2615 7.34921C20.375 7.12638 20.375 6.83469 20.375 6.2513V3.33464C20.375 2.75125 20.375 2.45955 20.2615 2.23673C20.1616 2.04073 20.0022 1.88137 19.8062 1.7815C19.5834 1.66797 19.2917 1.66797 18.7083 1.66797H3.29167C2.70828 1.66797 2.41658 1.66797 2.19376 1.7815C1.99776 1.88137 1.8384 2.04073 1.73853 2.23673C1.625 2.45955 1.625 2.75125 1.625 3.33464V6.2513C1.625 6.83469 1.625 7.12638 1.73853 7.34921C1.8384 7.54521 1.99776 7.70457 2.19376 7.80443C2.41658 7.91797 2.70828 7.91797 3.29167 7.91797ZM3.70833 7.91797H18.2917V15.0013C18.2917 16.1681 18.2917 16.7515 18.0646 17.1971C17.8649 17.5891 17.5462 17.9078 17.1541 18.1076C16.7085 18.3346 16.1251 18.3346 14.9583 18.3346H7.04167C5.87489 18.3346 5.2915 18.3346 4.84585 18.1076C4.45385 17.9078 4.13514 17.5891 3.9354 17.1971C3.70833 16.7515 3.70833 16.1681 3.70833 15.0013V7.91797Z"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="tooltip">Архивировать вакансию</div>
      </div>
      <div class="btn delete" v-if="isOpen" @click="() => modalStore.openModal('deleteVacancy')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
          <path
            d="M1.66699 4.75H18.3337M14.167 4.75L13.8851 3.90424C13.6119 3.08464 13.4753 2.67483 13.2219 2.37186C12.9982 2.10431 12.7108 1.89721 12.3863 1.76956C12.0187 1.625 11.5867 1.625 10.7228 1.625H9.27786C8.41392 1.625 7.98195 1.625 7.61439 1.76956C7.28982 1.89721 7.00249 2.10431 6.77875 2.37186C6.52538 2.67483 6.38878 3.08464 6.11558 3.90424L5.83366 4.75M16.2503 4.75V15.375C16.2503 17.1252 16.2503 18.0002 15.9097 18.6687C15.6101 19.2567 15.1321 19.7348 14.544 20.0344C13.8756 20.375 13.0005 20.375 11.2503 20.375H8.75033C7.00016 20.375 6.12508 20.375 5.45661 20.0344C4.8686 19.7348 4.39053 19.2567 4.09093 18.6687C3.75033 18.0002 3.75033 17.1252 3.75033 15.375V4.75M12.0837 8.91667V16.2083M7.91699 8.91667V16.2083"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="tooltip">Удалить вакансию</div>
      </div>
      <div class="btn more" @click="handleOpenMenu" v-if="isOpen">
        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="16" viewBox="0 0 4 16" fill="none">
          <path
            d="M2 8H2.01M2 2H2.01M2 14H2.01M3 8C3 8.55228 2.55228 9 2 9C1.44772 9 1 8.55228 1 8C1 7.44772 1.44772 7 2 7C2.55228 7 3 7.44772 3 8ZM3 14C3 14.5523 2.55228 15 2 15C1.44772 15 1 14.5523 1 14C1 13.4477 1.44772 13 2 13C2.55228 13 3 13.4477 3 14ZM3 2C3 2.55228 2.55228 3 2 3C1.44772 3 1 2.55228 1 2C1 1.44772 1.44772 1 2 1C2.55228 1 3 1.44772 3 2Z"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="content" :class="menuIsOpen && 'open'">
          <div class="item edit" @click="() => modalStore.openModal('editVacancy')">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
              <path
                d="M14.6456 4.22922L17.5919 7.1755M1.625 20.3748L1.67443 20.0288C1.84933 18.8045 1.93679 18.1923 2.13572 17.6207C2.31224 17.1136 2.55338 16.6313 2.85319 16.1858C3.19106 15.6837 3.62832 15.2465 4.50286 14.3719L16.6362 2.23861C17.4498 1.42502 18.7689 1.42502 19.5825 2.23861C20.3961 3.0522 20.3961 4.3713 19.5825 5.18489L7.2265 17.5409C6.43312 18.3342 6.03643 18.7309 5.58458 19.0464C5.18352 19.3264 4.75096 19.5584 4.29581 19.7375C3.78303 19.9394 3.23308 20.0503 2.13326 20.2722L1.625 20.3748Z"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="text">Переименовать вакансию</div>
          </div>
          <div class="item archive" @click="() => modalStore.openModal('archiveVacancy')">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
              <path
                d="M7.875 12.0846H14.125M3.29167 7.91797H18.7083C19.2917 7.91797 19.5834 7.91797 19.8062 7.80443C20.0022 7.70457 20.1616 7.54521 20.2615 7.34921C20.375 7.12638 20.375 6.83469 20.375 6.2513V3.33464C20.375 2.75125 20.375 2.45955 20.2615 2.23673C20.1616 2.04073 20.0022 1.88137 19.8062 1.7815C19.5834 1.66797 19.2917 1.66797 18.7083 1.66797H3.29167C2.70828 1.66797 2.41658 1.66797 2.19376 1.7815C1.99776 1.88137 1.8384 2.04073 1.73853 2.23673C1.625 2.45955 1.625 2.75125 1.625 3.33464V6.2513C1.625 6.83469 1.625 7.12638 1.73853 7.34921C1.8384 7.54521 1.99776 7.70457 2.19376 7.80443C2.41658 7.91797 2.70828 7.91797 3.29167 7.91797ZM3.70833 7.91797H18.2917V15.0013C18.2917 16.1681 18.2917 16.7515 18.0646 17.1971C17.8649 17.5891 17.5462 17.9078 17.1541 18.1076C16.7085 18.3346 16.1251 18.3346 14.9583 18.3346H7.04167C5.87489 18.3346 5.2915 18.3346 4.84585 18.1076C4.45385 17.9078 4.13514 17.5891 3.9354 17.1971C3.70833 16.7515 3.70833 16.1681 3.70833 15.0013V7.91797Z"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="text">Архивировать вакансию</div>
          </div>
          <div class="item delete" @click="() => modalStore.openModal('deleteVacancy')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
              <path
                d="M1.66699 4.75H18.3337M14.167 4.75L13.8851 3.90424C13.6119 3.08464 13.4753 2.67483 13.2219 2.37186C12.9982 2.10431 12.7108 1.89721 12.3863 1.76956C12.0187 1.625 11.5867 1.625 10.7228 1.625H9.27786C8.41392 1.625 7.98195 1.625 7.61439 1.76956C7.28982 1.89721 7.00249 2.10431 6.77875 2.37186C6.52538 2.67483 6.38878 3.08464 6.11558 3.90424L5.83366 4.75M16.2503 4.75V15.375C16.2503 17.1252 16.2503 18.0002 15.9097 18.6687C15.6101 19.2567 15.1321 19.7348 14.544 20.0344C13.8756 20.375 13.0005 20.375 11.2503 20.375H8.75033C7.00016 20.375 6.12508 20.375 5.45661 20.0344C4.8686 19.7348 4.39053 19.2567 4.09093 18.6687C3.75033 18.0002 3.75033 17.1252 3.75033 15.375V4.75M12.0837 8.91667V16.2083M7.91699 8.91667V16.2083"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="text">Удалить вакансию</div>
          </div>
        </div>
      </div>
      <div class="btn arrow" :class="isOpen && 'open'" @click="handleOpenToggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M9 1.5L5 5.5L1 1.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="tooltip">{{ isOpen ? 'Скрыть вакансию' : 'Показать вакансию' }}</div>
      </div>
    </div>
    <div class="container">
      <Send />
      <Applicants :name = 'text'/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vacancy {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  .container {
    display: none;
    flex-direction: column;
    margin: 24px 24px 44px;

    @media screen and (max-width: 900px) {
      margin: 24px 24px 32px;
    }

    @media screen and (max-width: 750px) {
      margin: -15px 0 28px;
    }
  }

  .heading {

    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 14.5px 24px;
    box-sizing: border-box;
    background-color: #F4F5F7;
    border-radius: 10px;

    @media screen and (max-width: 750px) {
      padding: 8px 12px;
      z-index: 1;
    }

    .notification {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 700;
      line-height: 18.2px;
      height: 24px;
      min-width: 24px;
      background-color: #8F47FF;
      border-radius: 50%;
    }

    .name {
      margin: 0 auto 0 12.5px;
      font-size: 14px;
      font-weight: 600;
      line-height: 19.6px;

      @media screen and (max-width: 750px) {
        font-size: 12px;
        line-height: 16.8px;
      }
    }

    .btn {
      position: relative;
      display: flex;
      height: 32px;
      min-width: 32px;
      background-color: #FFFFFF;
      border-radius: 10px;
      cursor: pointer;

      svg {
        stroke: #122130;
        margin: auto;
      }

      &.edit, &.archive, &.delete {
        margin-right: 8px;

        svg{
          height: 17px;
        }
      }

      &.arrow {
        margin-left: 16px;

        &.open {

          svg{
            transform: rotate(180deg);
          }

        }
      }

      &.more {
        display: none;

        .content {
          z-index: 2;
          position: absolute;
          width: max-content;
          right: 0;
          top: 120%;
          background-color: #FFFFFF;
          border: 1px solid #E6E6E6;
          border-radius: 10px;
          color: #686B74;
          padding: 16px 14px;
          box-sizing: border-box;
          visibility: hidden;
          opacity: 0;
          transition: opacity .2s ease-in-out, visibility .2s ease-in-out;

          &.open {
            visibility: visible;
            opacity: 1;
          }

          .item {
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            justify-content: flex-start;

            svg {
              height: 18px;
              width: 18px;
              margin: 0 8px 0 0;
            }

            &:last-of-type {
              margin-bottom: 0;
            }

            &.delete {
              svg {
                stroke: #D01408;
              }

              .text {
                color: #D01408;
              }
            }

            .text {
              font-size: 12px;
              font-weight: 600;
              line-height: 16.8px;
              text-align: left;
              margin: 0;
            }
          }
        }
      }

      .tooltip {
        z-index: 2;
        position: absolute;
        width: max-content;
        right: 0;
        top: -50%;
        color: #FFFFFF;
        background-color: #000000;
        border-radius: 10px;
        padding: 6px 12px;
        box-sizing: border-box;
        visibility: hidden;
        opacity: 0;
        font-size: 12px;
        font-weight: 500;
        line-height: 19.2px;

        &:after {
          transform: rotate(-45deg);
          content: "";
          z-index: 1;
          display: block;
          position: absolute;
          top: 10px;
          right: 10px;
          height: 10px;
          width: 10px;
          border-radius: 0px 4px 0px 0px;
          background-color: #000000;
          visibility: hidden;
          opacity: 0;
        }
      }

      @media (hover: hover) {
        &:hover {
          svg {
            stroke: #8F47FF;
          }

          .tooltip {
            visibility: visible;
            opacity: 1;
            top: 125%;

            &:after {
              visibility: visible;
              opacity: 1;
              top: -5px;
            }
          }
        }
      }

      @media screen and (max-width: 750px) {
        svg{
          //height: 17px;
        }

        &.edit, &.archive, &.delete {
          display: none;
        }

        &.arrow {
          margin-left: 7px;
        }

        &.more {
          display: flex;
        }
      }
    }
  }

  &.open {
    background-color: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #E6E6E6;

    .heading {
      background-color: #8F47FF;
    }

    .name {
      color: #FFFFFF;
    }

    .container {
      display: flex;
    }
  }







}
</style>