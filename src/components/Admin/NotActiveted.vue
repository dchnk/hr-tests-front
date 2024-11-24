<script setup>
import axios from "axios";
import {ref} from "vue";
import Preloader from "../ui/Preloader.vue";

const {user} = defineProps(["user"]);

const pending = ref(false);
const success = ref(0);

const clickButton = async () => {
  success.value = 0;

  try {
    pending.value = true;
    const sendMail = await axios.post('/api/users/activation-link')
    if (sendMail.status === 200) success.value = 1;

  } catch (e) {
    console.log(e)
    success.value = 2;
  }

  pending.value = false;
}

</script>

<template>
  <main class="main">
    <div class="text">
      Пожалуйста, подтвердите ваш email. Перейдите по ссылке в письме на вашей почте!
    </div>
    <div class="again" v-if="user">
      <div class="send" v-if="success === 0 && !pending">
        Письмо не пришло и в папке "спам" его тоже нет? <span class="button" @click="clickButton">Отправить еще раз.</span>
      </div>
      <div class="error" v-else-if="success === 1 && !pending">
        Письмо успешно отправлено!
      </div>
      <div class="error" v-else-if="success === 2 && !pending">
        Произошла какая то ошибка. <span class="button" @click="clickButton">Отправить еще раз.</span>
      </div>
      <Preloader v-else/>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  max-width: 1180px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;

  .text {
    margin-top: 20%;
    margin-bottom: 1em;
    font-size: 24px;
    font-weight: 600;
    line-height: 28.8px;
    max-width: 600px;
  }

  .button {
    font-size: 14px;
    font-weight: 400;
    line-height: 22.4px;
    margin-bottom: 8px;
    color: #8F47FF;
    cursor: pointer;
    border-bottom: 1px solid #8F47FF;
  }

  @media screen and (max-width: 770px) {
    padding: 0 12px;
  }
}
</style>