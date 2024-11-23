<script setup>
import axios from "axios";
import {ref} from "vue";
import Preloader from "../../ui/Preloader.vue";
import UsersItem from "./UsersItem.vue";

const pending = ref(false);
const success = ref(0);

const users = [
  {
    id: 1,
    name: 'Константин Константинопольский',
    email: 'Kostyak@gmail.com',
    phone: '+7(913) 123-789-4577',
    date: '30.09.24  00:00',
    done: false,
  },
  {
    id: 2,
    name: 'Константин Константинопольский',
    email: 'Kostyak@gmail.com',
    phone: '+7(913) 123-789-4577',
    date: '30.09.24  00:00',
    done: true,
  },
]

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

    <div class="user__list">
      <UsersItem v-for="user in users" :user='user'/>
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
  text-align: center;
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

  .user__list {
    display: flex;
    flex-direction: column;
    width: 100%;
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