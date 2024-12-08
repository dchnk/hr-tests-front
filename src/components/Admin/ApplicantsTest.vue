<script setup>

const {applicant} = defineProps(['applicant']);

const link = `/tests/result/${applicant?.ulink}`;

</script>

<template>
  <div class="applicants__test">
    <div class="block">
      <div class="block_name">
        Тест
      </div>
      <div class="content">
        <div class="name">Базовый тест</div>
      </div>
    </div>
    <div class="block">
      <div class="block_name">
        Результат
      </div>
      <div class="content">
        <router-link class="link" :to='link'>Результат тестирования
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M15.0007 16.6654H5.00065C4.08398 16.6654 3.33398 15.9154 3.33398 14.9987V4.9987C3.33398 4.08203 4.08398 3.33203 5.00065 3.33203H8.33398C8.83398 3.33203 9.16732 3.66536 9.16732 4.16536C9.16732 4.66536 8.83398 4.9987 8.33398 4.9987H5.00065V14.9987H15.0007V11.6654C15.0007 11.1654 15.334 10.832 15.834 10.832C16.334 10.832 16.6673 11.1654 16.6673 11.6654V14.9987C16.6673 15.9154 15.9173 16.6654 15.0007 16.6654Z"
                fill="#8F47FF"/>
            <path
                d="M16.667 8.33333C16.167 8.33333 15.8337 8 15.8337 7.5V4.16667H12.5003C12.0003 4.16667 11.667 3.83333 11.667 3.33333C11.667 2.83333 12.0003 2.5 12.5003 2.5H16.667C17.167 2.5 17.5003 2.83333 17.5003 3.33333V7.5C17.5003 8 17.167 8.33333 16.667 8.33333Z"
                fill="#8F47FF"/>
            <path
                d="M10.8333 10C10.5833 10 10.4167 9.91667 10.25 9.75C9.91667 9.41667 9.91667 8.91667 10.25 8.58333L16.0833 2.75C16.4167 2.41667 16.9167 2.41667 17.25 2.75C17.5833 3.08333 17.5833 3.58333 17.25 3.91667L11.4167 9.75C11.25 9.91667 11.0833 10 10.8333 10Z"
                fill="#8F47FF"/>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.applicants__test {
  display: flex;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }

  .block {
    margin-top: 1em;
    margin-right: 1em;
  }

  .block_name {
    font-size: 14px;
    font-weight: 400;
    line-height: 22.4px;
    color: #686B74;
  }

  .content {
    font-size: 14px;
    font-weight: 400;
    line-height: 22.4px;
    text-align: left;
    color: #122130;
  }

  .link {
    display: flex;
    justify-self: start;
    justify-content: center;
    align-items: center;
    color: #8F47FF;
    font-size: 14px;
    font-weight: 700;
    line-height: 16.8px;
    text-decoration: none;

  }
}
</style>