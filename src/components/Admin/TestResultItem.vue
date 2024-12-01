<script setup>
import {ref} from "vue";
import Tooltip from "../ui/Tooltip.vue";
import Send from "./Send.vue";
import Applicants from "./Applicants.vue";
import {useModalStore} from "../../stores/modal.js";
import {useDepartmentsStore} from "../../stores/departments.js";

const modalStore = useModalStore();

const departmentsStore = useDepartmentsStore();

const {test} = defineProps(['test']);
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
  <div class="test-item" :class="isOpen && 'open'">
    <div class="heading">
      <div class="name" :class="isOpen && 'open'">Оксфордский тест</div>
      <div class="btn arrow" :class="isOpen && 'open'" @click="handleOpenToggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M9 1.5L5 5.5L1 1.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="tooltip">{{ isOpen ? 'Скрыть результаты' : 'Показать результаты' }}</div>
      </div>
    </div>
    <div class="container" v-if="isOpen">
      <div class="graph">
        <div class="percent percent-100">100</div>
        <div class="percent percent-50">50</div>
        <div class="percent percent-50-minus">-50</div>
        <div class="percent percent-100-minus">-100</div>
        <div class="percent a">A</div>
        <div class="percent b">B</div>
        <div class="percent c">C</div>
        <div class="percent d">D</div>
        <div class="percent e">E</div>
        <div class="percent f">F</div>
        <div class="percent g">G</div>
        <div class="percent h">H</div>
        <div class="percent i">I</div>
        <div class="percent j">J</div>
        <div class="center"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test-item {
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
      margin: 22px 12px 28px;
    }

    .graph {
      position: relative;
      height: 278px;
      display: flex;
      justify-content: flex-end;

      .percent {
        position: absolute;
        font-family: Inter;
        font-size: 12px;
        font-weight: 400;
        line-height: 14.52px;
        color: #192C40;
      }

      .center {
        height: 1px;
        width: 94%;
        margin: auto 0;
        background-color: #E6E6E6;
      }

      .percent-100 {
        top: 0;
        left: 0;
      }

      .percent-50 {
        top: 30%;
        left: 0;
      }

      .percent-50-minus {
        bottom: 30%;
        left: 0;
      }

      .percent-100-minus {
        bottom: 0;
        left: 0;
      }

      .a {
        bottom: 0;
        left: 10%;
      }
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

      &.archived {
        z-index: auto;
      }
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