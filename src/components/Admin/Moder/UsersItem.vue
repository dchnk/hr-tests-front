<script setup>
import {computed, ref} from "vue";

// import ApplicantsItemContent from "./ApplicantsItemContent.vue";
// import ApplicantsItemMobile from "./ApplicantsItem-Mobile.vue";
import UsersItemDesktop from "./UsersItem-Desktop.vue";

const {user} = defineProps(['user']);
const status = computed(() => user.done ? 'Подтвержден' : 'Ожидаем');
const opened = ref(false);

function openedToggle() {
  opened.value = !opened.value;
}

</script>

<template>
  <div class="users__item">
    <UsersItemDesktop :user='user' :status='status' :opened="opened" @toggle="openedToggle"/>
<!--    <ApplicantsItemMobile :user='user' :status='status' :opened="opened" @toggle="openedToggle"/>-->
<!--    <ApplicantsItemContent :user='user' :status='status' v-show="opened"/>-->
  </div>
</template>

<style lang="scss" scoped>
.users__item {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-top: 18px;
  border-top: 1px solid #E6E6E6;
}
</style>