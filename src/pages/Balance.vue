<script setup>
import Header from "../components/Header/Header.vue";
</script>

<template>
  <Header :isAdmin="isAdmin"/>
  <main class="main">
    <router-link class="admin" to="/admin">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
        <path d="M14.6641 4.66732H1.33073M1.33073 4.66732L4.66406 1.33398M1.33073 4.66732L4.66406 8.00065" stroke="#122130" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      На главную
    </router-link>

    <div class="container" >
      <div class="heading">
        <div class="text">Для пополнения баланса вам необходимо связаться с менеджером.</div>
        <a class="link" href="https://ya.ru" target="_blank">Связаться</a>
      </div>
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

  .admin {
    margin-top: 2em;
    display: flex;
    color: #122130;
    cursor: pointer;
    align-items: center;
    max-width: max-content;
    padding: 13px 20px;
    background-color: #F4F5F7;
    border-radius: 10px;
    box-sizing: border-box;
    text-decoration: none;

    svg {
      margin-right: .5em;
    }
  }

  .heading {
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 18px;
    font-weight: 500;
    line-height: 28.8px;
    align-self: start;
    text-align: center;
  }

  .link {
    margin-top: 1em;
    display: block;
    background-color: #8F47FF;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    line-height: 16.8px;
    text-align: center;
    padding: 14px 0;
    text-decoration: none;
    color: #FFFFFF;
  }

  .container {
    margin: 2em auto;
    position: relative;
    padding: 20px 40px;
    max-width: max-content;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #F4F5F7;
    display: flex;
  flex-direction: column;
  }
}
</style>