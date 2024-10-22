<script setup>
import {computed} from "vue";

const {applicant, status, opened} = defineProps(['applicant', 'status', 'opened']);
const comment = 'Здесь вы можете отправлять тесты соискателям, отслеживать их статус выполнения и анализировать результаты в режиме реального времени. Сервис HR TESTS помогает вам принимать решения и оптимизировать процесс найма.'

</script>

<template>
  <div class="applicants__item-content">
    <div class="heading">Профиль соискателя</div>
    <div class="container">
      <div class="inputs">
        <div class="input__container">
          <div class="input__name">Имя</div>
          <input class="input" type="text" :value="applicant.name" disabled>
        </div>
        <div class="input__container">
          <div class="input__name">E-mail</div>
          <input class="input" type="text" :value="applicant.email" disabled>
        </div>
        <div class="input__container">
          <div class="input__name">Phone</div>
          <input class="input" type="text" :value="applicant.phone" disabled>
        </div>
      </div>
      <div class="comment">
        <div class="name">Комментарий</div>
        <textarea class="textarea" :value="comment" disabled/>
      </div>
      <div class="other">
        <div class="item">
          <div class="name">Статус:</div>
          <div class="value status">
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
        </div>
        <div class="item">
          <div class="name">Пол:</div>
          <div class="value">
            Мужской
          </div>
        </div>
        <div class="item">
          <div class="name">Возраст:</div>
          <div class="value">
            32 года
          </div>
        </div>
        <div class="item">
          <div class="name">Ссылка на тест:</div>
          <div class="value">
            https://vacancy.email/qseHq
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.applicants__item-content {
  padding: 44px 24px 44px;
  border-radius: 10px;
  background-color: #F4F5F7;
  margin-bottom: 8px;

  @media screen and (max-width: 1000px) {
    padding: 49px 24px 44px;
  }

  @media screen and (max-width: 750px) {
    padding: 26px 12px 36px;
  }

  .heading {
    font-family: Manrope;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    text-align: left;
    margin-bottom: 24px;

    @media screen and (max-width: 1000px) {
      margin-bottom: 18px;
    }

    @media screen and (max-width: 750px) {
      font-size: 16px;
      line-height: 19.2px;
    }

  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .inputs {
      display: flex;
      flex-direction: column;
      gap: 20px;
      flex-grow: 1;
      width: 100%;
      max-width: 332px;

      @media screen and (max-width: 750px) {
        gap: 16px;
        max-width: 327px;
      }

      .input__container {
        display: flex;
        flex-direction: column;


        .input__name {
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          color: #686B74;
          margin-bottom: 6px;
        }

        .input {
          border: 1px solid #E6E6E6;
          padding: 12px 20px;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          text-align: left;
          color: #122130;
          border-radius: 10px;
        }
      }
    }

    .comment {
      display: flex;
      flex-direction: column;
      max-width: 332px;
      width: 100%;
      flex-grow: 1;

      @media screen and (max-width: 750px) {
        max-width: 327px;
      }

      .name {
        font-size: 14px;
        font-weight: 400;
        line-height: 22.4px;
        color: #686B74;
        margin-bottom: 6px;
      }

      .textarea {
        border: 1px solid #E6E6E6;
        padding: 12px 20px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 400;
        line-height: 22.4px;
        text-align: left;
        color: #122130;
        border-radius: 10px;
        min-height: 242px;
      }
    }

    .other {
      max-width: 332px;
      width: 100%;
      flex-grow: 1;

      .item {
        display: flex;
        width: 100%;
        margin-bottom: 12px;

        .name {
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          color: #686B74;
          max-width: 120px;
          width: 100%;
          margin-right: 5px;
        }

        .value {
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
              background-color: #FFFFFF;
              margin-right: 8px;
            }
          }
        }
      }
    }

  }

}
</style>