<script setup>
import Header from "../components/Header/Header.vue";
import TestResultItem from "../components/Admin/TestResultItem.vue";
import {questions, results, characteristics} from "../vendor/oxford-test.js";
import {reactive, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

const test = ref(null);
const route = useRoute();

const getTestInfo = async () => {
  try {
    const testInfo = await axios.post(`/api/tests/${route.params.id}`, {
      name: 'oxford'
    })

    prepareTest(testInfo.data.test)

  } catch (e) {
    console.log(e)
  }
  ;
}

const prepareTest = (testInfo) => {
  console.log(testInfo)
  let currentTest = testInfo;

  currentTest.types = {
    a: {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    b: {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    c: {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    d: {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    e: {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    f: {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    g: {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    h: {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    i: {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    j: {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    }
  }

  console.log(currentTest)
  let currentType;
  for (let answer in currentTest.result) {
    currentType = currentTest.types[questions[answer].type.toLowerCase()]
    currentType.value += Number(questions[answer].answers[currentTest.result[answer]]);
  }

  for (let typeIndex in currentTest.types) {
    let type = currentTest.types[typeIndex]
    // console.log()

    type.percent = results[typeIndex.toUpperCase()][type.value];
    type.level = Math.ceil(((100 + type.percent) / 200) * 100);

    if (type.percent === 100 && type.percent >= 30) {
      type.text = characteristics[`${typeIndex.toUpperCase()}1`];
      type.rait = 'high'
      type.raitName = 'Высокий'
    } else if (type.percent < 30 && type.percent >= 0) {
      type.text = characteristics[`${typeIndex.toUpperCase()}2`];
      type.rait = 'middle'
      type.raitName = 'Средний'
    } else if (type.percent < 0 && type.percent >= -19) {
      type.text = characteristics[`${typeIndex.toUpperCase()}3`];
      type.rait = 'low'
      type.raitName = 'Ниже среднего'
    } else {
      type.text = characteristics[`${typeIndex.toUpperCase()}4`];
      type.rait = 'veryLow'
      type.raitName = 'Низкий'
    }
    console.log()

  }

  test.value = currentTest;

}

getTestInfo();


</script>

<template>
  <Header/>
  <main class="main">
    <div class="heading">Результаты тестирования</div>
    <div class="main__container">
      <div class="profile">
        <!--        <div class="candidate">-->
        <!--          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">-->
        <!--            <circle cx="28" cy="28" r="28" fill="white"/>-->
        <!--            <g clip-path="url(#clip0_387_2051)">-->
        <!--              <path d="M8.73072 39.1329H47.2696C49.0759 35.9294 50.1078 32.231 50.1078 28.2912C50.1078 16.0815 40.2099 6.18359 28.0002 6.18359C15.7905 6.18359 5.89258 16.0815 5.89258 28.2912C5.89249 32.2311 6.92432 35.9294 8.73072 39.1329Z" fill="#FFCD4A"/>-->
        <!--              <path d="M26.0868 35.3133C26.0868 35.3133 27.4266 35.901 28.0006 36.7442C28.5746 35.901 29.9145 35.3133 29.9145 35.3133L35.3096 32.5692C34.8571 32.4295 34.3967 32.3047 33.9261 32.196C33.0101 31.28 32.7778 29.5432 32.736 28.3281C32.258 28.885 31.7563 29.3507 31.2769 29.723C30.3428 30.4484 29.1901 30.8423 28.003 30.8423C26.8159 30.8423 25.6632 30.4484 24.7292 29.723C24.2498 29.3507 23.7481 28.8849 23.2699 28.3281C23.2281 29.5432 22.9959 31.28 22.0798 32.196C21.6082 32.3048 21.1469 32.4301 20.6934 32.5701L26.0868 35.3133Z" fill="#FFAA7B"/>-->
        <!--              <path d="M27.7779 30.8376C26.6704 30.7913 25.6033 30.4026 24.7282 29.7231C24.2488 29.3507 23.747 28.885 23.269 28.3281C23.2326 29.385 23.0516 30.8361 22.4023 31.799C23.3257 33.6627 24.5221 35.222 25.7322 34.4064C27.2244 33.4006 27.667 31.9056 27.7779 30.8376Z" fill="#FC9460"/>-->
        <!--              <path d="M26.277 35.0281L23.8833 33.8105C22.8647 34.1203 21.4738 34.9291 21.4248 37.0402C20.7369 37.1593 17.2734 37.9212 17.2734 41.1571V47.6252C20.4503 49.3923 24.1078 50.3997 28.0011 50.3997C28.0784 50.3997 28.1551 50.3975 28.2321 50.3968C28.2321 45.4703 28.2321 37.7264 28.2321 36.9832C28.2321 35.8853 26.277 35.0281 26.277 35.0281Z" fill="#A56BFF"/>-->
        <!--              <path d="M17.4083 47.6996C17.4083 46.0041 17.4083 43.3389 17.4083 41.1572C17.4083 37.6612 21.5583 37.1563 21.5583 37.1563C21.5583 34.9368 23.0487 34.1653 24.0527 33.8971L21.1677 32.4297C14.9906 34.444 12.0403 35.2495 10.502 36.3476C12.1034 37.4406 14.6221 39.7111 14.6221 43.1848V45.8923C15.5013 46.5617 16.4328 47.166 17.4083 47.6996Z" fill="#9E60FF"/>-->
        <!--              <path d="M34.8335 32.4297L29.7246 35.0282C29.7246 35.0282 27.7695 35.8854 27.7695 36.9833V50.3969C27.8466 50.3977 27.9233 50.3998 28.0005 50.3998C29.0375 50.3998 30.0575 50.3272 31.0565 50.1891L31.0559 50.1886L37.3526 48.3283V48.3284C38.785 47.6585 40.1341 46.8403 41.3791 45.8922C41.3791 44.9506 41.3791 44.0322 41.3791 43.1848C41.3791 39.7111 43.8978 37.4407 45.4992 36.3476C43.961 35.2495 41.0108 34.444 34.8335 32.4297Z" fill="#BA8DFF"/>-->
        <!--              <path d="M33.2529 30.1079C33.1491 30.0506 33.0199 30.1105 32.9963 30.2268C32.8419 30.9829 32.172 33.365 29.6843 34.7788C29.4393 34.9181 29.3807 35.2449 29.5659 35.4572L32.0797 38.3363C32.6016 38.9375 33.5625 38.8293 33.9392 38.128C34.5761 36.9423 35.4634 35.1376 36.1201 33.1974C36.2377 32.85 36.1541 32.4658 35.9063 32.1955C35.1417 31.3615 34.2459 30.656 33.2529 30.1079Z" fill="#C8A5FF"/>-->
        <!--              <path d="M26.3175 34.7797C25.7189 34.4395 25.2265 34.043 24.8203 33.627C24.215 33.6783 21.5823 34.0667 21.4316 36.901C21.6559 37.3574 21.8706 37.7717 22.0626 38.1289C22.4393 38.8302 23.4002 38.9384 23.9221 38.3373L26.4358 35.4582C26.6211 35.2458 26.5624 34.9188 26.3175 34.7797Z" fill="#BA8DFF"/>-->
        <!--              <path d="M23.0044 30.2268C22.9807 30.1106 22.8516 30.0506 22.7478 30.108C21.7549 30.6561 20.859 31.3615 20.0945 32.1955C19.8467 32.4659 19.763 32.85 19.8806 33.1974C20.3771 34.6642 21.0051 36.0529 21.5573 37.1558C21.5573 33.8099 24.9459 33.7534 24.9459 33.7534L24.946 33.7532C23.5637 32.4117 23.1254 30.8196 23.0044 30.2268Z" fill="#A56BFF"/>-->
        <!--              <path d="M41.1992 46.0288C43.6731 44.185 45.7471 41.8354 47.2705 39.1338C47.1003 38.6276 46.916 38.163 46.716 37.7551C46.4278 37.1673 46.0277 36.7064 45.4108 36.2852C43.8157 37.3532 41.1992 39.6445 41.1992 43.1846V46.0288Z" fill="#C8A5FF"/>-->
        <!--              <path d="M10.5901 36.2852C9.97318 36.7065 9.57308 37.1673 9.28496 37.7551C9.085 38.163 8.90074 38.6276 8.73047 39.1338C10.2538 41.8354 12.3278 44.1851 14.8017 46.0288C14.8017 45.0393 14.8017 44.0731 14.8017 43.1846C14.8018 39.6445 12.1852 37.3532 10.5901 36.2852Z" fill="#A56BFF"/>-->
        <!--              <path d="M36.2689 42.1543H32.073C31.4775 42.1543 30.9902 42.6416 30.9902 43.2371V49.8242C30.9902 49.952 31.0138 50.0743 31.055 50.1883C33.2765 49.8812 35.3923 49.2442 37.3518 48.328V43.2371C37.3518 42.6416 36.8645 42.1543 36.2689 42.1543Z" fill="#C8A5FF"/>-->
        <!--              <path d="M43.1125 12.1582C41.0136 13.7097 38.4022 16.3252 39.5093 19.6023C41.2237 24.6774 33.4636 27.8779 42.1261 31.5563C45.5896 33.0272 47.6021 34.5617 48.7714 35.8741C49.6351 33.509 50.1071 30.9555 50.1071 28.2914C50.107 21.9271 47.4167 16.1919 43.1125 12.1582Z" fill="#FFE050"/>-->
        <!--              <path d="M12.8872 12.1584C14.986 13.7099 17.5975 16.3255 16.4904 19.6025C14.776 24.6777 22.5361 27.8782 13.8736 31.5566C10.4101 33.0274 8.39748 34.5619 7.22832 35.8744C6.36459 33.5093 5.89258 30.9557 5.89258 28.2916C5.89267 21.9273 8.58301 16.1921 12.8872 12.1584Z" fill="#FFE050"/>-->
        <!--              <path d="M19.778 18.409H36.3154C36.3447 17.2174 36.5434 14.0635 37.7887 11.8169C37.9619 11.5044 37.9928 11.1332 37.8723 10.7969C37.4204 9.53702 36.0707 6.59177 33.127 5.80619C32.9702 5.76432 32.9288 5.56148 33.0564 5.46123L33.4975 5.11464C33.6975 4.95745 33.6207 4.6382 33.3709 4.5901C31.1991 4.17124 23.9862 3.16891 21.7457 7.77601C21.612 8.05095 21.3599 8.24893 21.064 8.32554C20.412 8.49427 19.2394 9.00283 18.4751 10.5268C18.3256 10.8248 18.3002 11.1705 18.4073 11.4863C18.7787 12.5809 19.6836 15.5202 19.778 18.409Z" fill="#56415E"/>-->
        <!--              <path d="M27.1777 11.127C24.5364 7.10176 29.1565 4.20117 29.1565 4.20117C26.3546 4.23745 23.1178 4.95499 21.7457 7.77635C21.612 8.05129 21.3599 8.24927 21.064 8.32588C20.412 8.49461 19.2394 9.00317 18.4751 10.5271C18.3256 10.8252 18.3002 11.1709 18.4073 11.4866C18.7787 12.5812 19.6836 15.5205 19.778 18.4093H23.6274C26.0638 16.4358 28.7472 13.519 27.1777 11.127Z" fill="#45304C"/>-->
        <!--              <path d="M36.9561 17.9266C36.5858 17.5874 35.7581 17.7593 35.4392 17.9671C35.5091 18.4021 35.513 18.8471 35.4527 19.2866L35.0764 22.0272C35.0764 22.248 35.0695 22.4648 35.0566 22.6777C35.9742 22.9545 36.5202 22.1307 36.597 21.5654C36.6301 21.3221 36.6841 21.0822 36.7591 20.8482C37.0032 20.086 37.8837 18.7767 36.9561 17.9266Z" fill="#FFAA7B"/>-->
        <!--              <path d="M19.0444 17.9266C19.4146 17.5874 20.2423 17.7593 20.5612 17.9671C20.4914 18.4021 20.4874 18.8471 20.5478 19.2866L20.924 22.0272C20.924 22.248 20.931 22.4648 20.9438 22.6777C20.0262 22.9545 19.4802 22.1307 19.4034 21.5654C19.3704 21.3221 19.3163 21.0822 19.2414 20.8482C18.9973 20.086 18.1168 18.7767 19.0444 17.9266Z" fill="#FC9460"/>-->
        <!--              <path d="M35.3043 17.1216C35.2196 16.9007 35.1128 16.6769 34.9783 16.4658C34.7504 16.1083 34.6502 15.6855 34.6808 15.2639C34.7686 14.0513 34.7215 11.6797 33.1296 10.9634C31.7773 10.3549 30.1183 10.7072 29.0604 11.059C28.3987 11.2791 27.6839 11.2865 27.0182 11.0827C25.8129 12.0078 25.7846 14.0907 25.866 15.1997C25.8972 15.6237 25.7929 16.0477 25.5638 16.4072C25.4317 16.6143 25.3261 16.8336 25.2416 17.0506C24.9676 17.7546 24.8876 18.5182 24.9903 19.2659L25.3716 22.0434C25.3716 26.0364 27.5032 28.7505 29.3162 30.1585C29.5839 30.3663 29.8702 30.5451 30.1691 30.6977C30.5609 30.524 30.9326 30.3033 31.2748 30.0375C33.0642 28.648 35.1679 25.9693 35.1679 22.0284L35.5441 19.2878C35.6446 18.5572 35.5685 17.811 35.3043 17.1216Z" fill="#FFC7AB"/>-->
        <!--              <path d="M29.3279 30.0376C27.5385 28.6481 25.4349 25.9694 25.4349 22.0285L25.0585 19.2873C24.9572 18.5494 25.036 17.7958 25.3065 17.101C25.3898 16.8868 25.4941 16.6704 25.6245 16.4659C25.8506 16.1111 25.9535 15.6927 25.9229 15.2743C25.8398 14.1449 25.8721 11.9925 27.1766 11.1276C27.0973 11.1075 27.0185 11.085 26.9404 11.059C25.8824 10.7072 24.2236 10.3549 22.8712 10.9634C21.2748 11.6817 21.232 14.0649 21.3209 15.2743C21.3517 15.6927 21.2486 16.1111 21.0225 16.4659C20.8922 16.6704 20.7879 16.8868 20.7045 17.101C20.4341 17.7958 20.3552 18.5494 20.4566 19.2873L20.8329 22.0285C20.8329 25.9694 22.9366 28.648 24.726 30.0376C25.66 30.7629 26.8127 31.1569 27.9998 31.1569C28.8015 31.1569 29.5872 30.9765 30.3008 30.6365C29.9578 30.473 29.6312 30.2731 29.3279 30.0376Z" fill="#FFAA7B"/>-->
        <!--            </g>-->
        <!--            <defs>-->
        <!--              <clipPath id="clip0_387_2051">-->
        <!--                <rect width="46.2" height="46.2" fill="white" transform="translate(4.90039 4.19922)"/>-->
        <!--              </clipPath>-->
        <!--            </defs>-->
        <!--          </svg>-->
        <!--          <div class="name">Константин Константинопольский</div>-->
        <!--        </div>-->
        <!--        <div class="info">-->
        <!--          <div class="item">Kostyak@gmail.com</div>-->
        <!--        </div>-->
        <router-link class="admin" to="/admin">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
            <path d="M14.6641 4.66732H1.33073M1.33073 4.66732L4.66406 1.33398M1.33073 4.66732L4.66406 8.00065"
                  stroke="#122130" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          На главную
        </router-link>
      </div>


      <div class="container">
        <TestResultItem :test="test"/>
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

  .main__container {
    display: flex;
    margin-top: 2em;

    @media screen and (max-width: 1200px) {
      flex-direction: column;
    }
  }

  .heading {
    margin-top: 72px;
    font-size: 28px;
    font-weight: 700;
    line-height: 33.6px;
    text-align: left;
    color: #122130;

    @media screen and (max-width: 1200px) {
      margin-top: 1em;
    }
  }

  .profile {
    display: flex;
    flex-direction: column;
    margin-right: 1em;
    max-height: max-content;
    color: #122130;
    max-width: 380px;
    width: 100%;
    padding: 13px 20px;
    background-color: #F4F5F7;
    border-radius: 10px;
    box-sizing: border-box;

    .candidate {
      display: flex;
      align-items: center;
      gap: 1em;
      margin-bottom: 1em;
    }

    .info {
      display: flex;
      align-items: center;
      gap: 1em;
      margin-bottom: 1em;

      .item {
        font-size: 14px;
        font-weight: 600;
        line-height: 19.6px;
        color: #686B74;
      }
    }

    .admin {
      display: flex;
      max-height: max-content;
      max-width: max-content;
      color: #122130;
      cursor: pointer;
      align-items: center;
      padding: 8px 20px;
      background-color: #ffffff;
      border-radius: 10px;
      box-sizing: border-box;
      text-decoration: none;

      svg {
        margin-right: .5em;
      }
    }

    @media screen and (max-width: 1200px) {
      max-width: 100%;
      margin-right: 0;
      margin-bottom: 1em;
    }
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
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .heading {
      margin-top: 1em;
      margin-bottom: 1em;
      font-size: 18px;
      font-weight: 500;
      line-height: 28.8px;
      align-self: start;
      text-align: center;
    }
  }
}
</style>