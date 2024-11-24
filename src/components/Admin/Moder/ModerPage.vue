<script setup>
import axios from "axios";
import {reactive, ref} from "vue";
import Preloader from "../../ui/Preloader.vue";
import UsersItem from "./UsersItem.vue";
import ApplicantsList from "../ApplicantsList.vue";

const pending = ref(false);
const success = ref(0);
const users = ref(null);

axios.get("/api/users")
  .then(res => users.value = res.data)
  .catch(err => console.log(err));


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
    <div class="heading">
      Список всех пользователей.
    </div>
    <div class="users">
      <div class="users__columns">
        <div class="users__column">ID</div>
        <div class="users__column">Имя</div>
        <div class="users__column">E-mail</div>
        <div class="users__column">Телефон</div>
        <div class="users__column">Баланс</div>
        <div class="users__column">Статус</div>
      </div>
      <div class="user__list">
        <UsersItem v-for="user in users" :user='user'/>
      </div>
    </div>


<!--    <Preloader v-else/>-->
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
  justify-content: center;
  align-items: center;

  .heading {
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 18px;
    font-weight: 500;
    line-height: 28.8px;
    align-self: start;
  }
  
  .users {
    box-sizing: border-box;
    width: 100%;

    .users__columns {
      display: grid;
      gap: 16px;
      grid-template-columns: 50px 270px 170px 170px 130px 130px;
      margin-bottom: 16px;

      .users__column {
        font-size: 14px;
        font-weight: 600;
        line-height: 19.6px;
      }

      @media screen and (max-width: 1200px) {
        display: none;
      }
    }

    .user__list {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
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