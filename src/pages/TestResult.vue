<script setup>
import Header from "../components/Header/Header.vue";
import TestResultItemQuestionnaire from "../components/Admin/TestResultItemQuestionnaire.vue";
import {questions, results} from "../vendor/oxford-test.js";
import {reactive, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import TestResultItemOxford from "../components/Admin/TestResultItemOxford.vue";
import TestResultItemIq from "../components/Admin/TestResultItemIq.vue";
import Vue3Html2pdf from 'vue3-html2pdf';

const test = ref(null);
const tests = reactive({});

const isLoading = ref(false);

const characteristics = {};
const syndromes = {};
const motivations = {};
const questionnaire = [];

const route = useRoute();

const getTestInfo = async () => {

  isLoading.value = true;

  try {
    const testInfo = await axios.post(`/api/tests/${route.params.id}`)


    const texts = await axios.get(`/api/text`)

    for (let text in texts.data) {
      if (texts.data[text].type === 'questionnaire-test-question') {
         questionnaire.push({
          id: texts.data[text].name.split("questionnaire-test-question-")[1],
          question: texts.data[text].text,
          description: texts.data[text].description,
        })
      }

      if (texts.data[text].type === 'oxford-test-syndromes') {
        syndromes[texts.data[text].name.split("_")[1]] = texts.data[text];
      }

      if (texts.data[text].type === 'oxford-test-characteristic') {
        characteristics[texts.data[text].name.split("characteristic-")[1].toUpperCase()] = texts.data[text].text;
      }

      if (texts.data[text].type === 'oxford-test-motivation') {
        motivations[texts.data[text].name.split("motivation-")[1]] = {
          text: texts.data[text].text,
          name: texts.data[text].description,
        };
      }
    }

    prepareTest(testInfo.data.test.find(arg => arg.name === 'oxford'))
    prepareTest(testInfo.data.test.find(arg => arg.name === 'questionnaire'))
    prepareTest(testInfo.data.test.find(arg => arg.name === 'iq'))

    isLoading.value = false;

  } catch (e) {
    console.log(e)
  }
  ;
}

const prepareTest = (testInfo) => {
  if (!testInfo) return;

  let currentTest = testInfo;

  if (testInfo.name === 'questionnaire') {
    return tests[currentTest.name] = currentTest;
  }

  if (testInfo.name === 'iq') {
    return tests[currentTest.name] = currentTest;
  }

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
    },
    'k-1': {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    'k-2': {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    'k-3': {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    'k-4': {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    },
    'k-5': {
      value: 0,
      percent: 0,
      level: 0,
      text: ''
    }
  }

  let currentType;
  for (let answer in currentTest.result) {
    currentType = currentTest.types[questions[answer].type.toLowerCase()]
    currentType.value += Number(questions[answer].answers[currentTest.result[answer]]);
  }

  currentTest.motivation = {};
  currentTest.motivation.types = []

  for (let typeIndex in currentTest.types) {
    let type = currentTest.types[typeIndex]

    if (['k-1', 'k-2', 'k-3', 'k-4', 'k-5'].some((acc) => acc === typeIndex)) {

      currentTest.motivation.types.push({
        type: typeIndex,
        value: type.value,
        text: motivations[typeIndex].text,
        name: motivations[typeIndex].name,
      })

      continue;
    };

    type.percent = results[typeIndex.toUpperCase()][type.value];
    type.level = Math.ceil(((100 + type.percent) / 200) * 100);


    if (type.percent >= 30) {
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
  }

  currentTest.syndromes = [];

  if (
    currentTest.types.a.percent < currentTest.types.g.percent &&
    currentTest.types.b.percent < currentTest.types.g.percent &&
    currentTest.types.c.percent < currentTest.types.g.percent &&
    currentTest.types.d.percent < currentTest.types.g.percent &&
    currentTest.types.e.percent < currentTest.types.g.percent &&
    currentTest.types.f.percent < currentTest.types.g.percent &&
    currentTest.types.h.percent < currentTest.types.g.percent &&
    currentTest.types.i.percent < currentTest.types.g.percent &&
    currentTest.types.j.percent < currentTest.types.g.percent
  ) {
    currentTest.syndromes.push(syndromes[1])
  }

  if (
    currentTest.types.a.percent < currentTest.types.d.percent &&
    currentTest.types.b.percent < currentTest.types.d.percent &&
    currentTest.types.c.percent < currentTest.types.d.percent &&
    currentTest.types.g.percent < currentTest.types.d.percent &&
    currentTest.types.e.percent < currentTest.types.d.percent &&
    currentTest.types.f.percent < currentTest.types.d.percent &&
    currentTest.types.h.percent < currentTest.types.d.percent &&
    currentTest.types.i.percent < currentTest.types.d.percent &&
    currentTest.types.j.percent < currentTest.types.d.percent
  ) {
    currentTest.syndromes.push(syndromes[2])
  }

  if (
    currentTest.types.e.percent > currentTest.types.f.percent
  ) {
    currentTest.syndromes.push(syndromes[3])
  }

  if (
    currentTest.types.a.percent < currentTest.types.i.percent &&
    currentTest.types.b.percent < currentTest.types.i.percent &&
    currentTest.types.c.percent < currentTest.types.i.percent &&
    currentTest.types.g.percent < currentTest.types.i.percent &&
    currentTest.types.e.percent < currentTest.types.i.percent &&
    currentTest.types.f.percent < currentTest.types.i.percent &&
    currentTest.types.h.percent < currentTest.types.i.percent &&
    currentTest.types.d.percent < currentTest.types.i.percent &&
    currentTest.types.j.percent < currentTest.types.i.percent
  ) {
    currentTest.syndromes.push(syndromes[4])
  }

  if (
    currentTest.types.a.rait === 'veryLow' &&
    currentTest.types.b.rait === 'veryLow' &&
    currentTest.types.c.rait === 'veryLow'
  ) {
    currentTest.syndromes.push(syndromes[5])
  }

  if (
    currentTest.types.a.rait === 'veryLow' &&
    currentTest.types.e.rait === 'high'
  ) {
    currentTest.syndromes.push(syndromes[6])
  }

  if (
    currentTest.types.a.rait === 'veryLow' &&
    currentTest.types.b.rait === 'veryLow' &&
    currentTest.types.c.rait === 'veryLow' &&
    currentTest.types.e.rait === 'high'
  ) {
    currentTest.syndromes.push(syndromes[7])
  }

  if (
    currentTest.types.a.rait === 'veryLow' &&
    currentTest.types.j.rait === 'veryLow'
  ) {
    currentTest.syndromes.push(syndromes[8])
  }

  if (
    currentTest.types.a.rait === 'veryLow' &&
    currentTest.types.c.rait === 'veryLow' &&
    currentTest.types.g.rait === 'veryLow' &&
    currentTest.types.f.rait === 'high'
  ) {
    currentTest.syndromes.push(syndromes[9])
  }

  if (
    currentTest.types.a.rait === 'high' &&
    currentTest.types.d.rait === 'middle'
  ) {
    currentTest.syndromes.push(syndromes[10])
  }

  if (
    (currentTest.types.f.rait === 'high' && currentTest.types.g.rait === 'low') ||
    (currentTest.types.f.rait === 'high' && currentTest.types.g.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[11])
  }

  if (
    (currentTest.types.g.rait === 'high' && currentTest.types.f.rait === 'low') ||
    (currentTest.types.g.rait === 'high' && currentTest.types.f.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[12])
  }

  if (
    (currentTest.types.h.rait === 'high' && currentTest.types.i.rait === 'low') ||
    (currentTest.types.h.rait === 'high' && currentTest.types.i.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[13])
  }

  if (
    (currentTest.types.i.rait === 'high' && currentTest.types.h.rait === 'low') ||
    (currentTest.types.i.rait === 'high' && currentTest.types.h.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[14])
  }

  if (
    (currentTest.types.d.rait === 'high' && currentTest.types.a.rait === 'low') ||
    (currentTest.types.d.rait === 'high' && currentTest.types.a.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[15])
  }

  if (
    (currentTest.types.e.rait === 'high' && currentTest.types.d.rait === 'low') ||
    (currentTest.types.e.rait === 'high' && currentTest.types.d.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[16])
  }

  if (
    (currentTest.types.e.rait === 'high' && currentTest.types.f.rait === 'low') ||
    (currentTest.types.e.rait === 'high' && currentTest.types.f.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[17])
  }

  if (
    (currentTest.types.f.rait === 'high' && currentTest.types.e.rait === 'low') ||
    (currentTest.types.f.rait === 'high' && currentTest.types.e.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[18])
  }

  if (
    (currentTest.types.b.rait === 'high' && currentTest.types.a.rait === 'low') ||
    (currentTest.types.b.rait === 'high' && currentTest.types.a.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[19])
  }

  if (
    (currentTest.types.b.rait === 'high' && currentTest.types.c.rait === 'low') ||
    (currentTest.types.b.rait === 'high' && currentTest.types.c.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[20])
  }

  if (
    (currentTest.types.c.rait === 'high' && currentTest.types.a.rait === 'low') ||
    (currentTest.types.c.rait === 'high' && currentTest.types.a.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[21])
  }

  if (
    (currentTest.types.c.rait === 'high' && currentTest.types.b.rait === 'low') ||
    (currentTest.types.c.rait === 'high' && currentTest.types.b.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[22])
  }

  if (
    currentTest.types.g.percent === 90 && currentTest.types.i.percent > 90
  ) {
    currentTest.syndromes.push(syndromes[23])
  }

  if (
    (currentTest.types.a.rait === 'high' && currentTest.types.b.rait === 'low') ||
    (currentTest.types.a.rait === 'high' && currentTest.types.b.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[24])
  }

  if (
    (currentTest.types.a.rait === 'high' && currentTest.types.c.rait === 'low') ||
    (currentTest.types.a.rait === 'high' && currentTest.types.c.rait === 'veryLow')
  ) {
    currentTest.syndromes.push(syndromes[25])
  }

  if (currentTest.motivation.types.length > 0) {
    currentTest.motivation.types.sort((a, b) => b.value - a.value)


    currentTest.motivation.main = [currentTest.motivation.types[0]];
    currentTest.motivation.secondary = [];

    for (let i in currentTest.motivation.types) {
      if (i == 0) continue;

      if (currentTest.motivation.types[0].value === currentTest.motivation.types[i].value) {
        currentTest.motivation.main.push(currentTest.motivation.types[i]);
      } else {
        currentTest.motivation.secondary.push(currentTest.motivation.types[i]);
      }
    }
  }

  test.value = currentTest;

  tests[currentTest.name] = currentTest;

}

getTestInfo();


const html2pdfRef = ref(null);


const generatePDF = async () => {

  if (!isLoading) return;

  html2pdfRef.value?.generatePdf({
    margin: 20,
    html2canvas: {
      scale: 2, // Улучшение качества
      logging: false,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',

    }
  });
}
</script>

<template>
  <Header/>
  <main class="main">
    <div class="heading-container">
      <div class="heading">Результаты тестирования</div>
      <div v-if="!isLoading" class="pointer" @click="generatePDF">
        <svg viewBox="0 0 19 22" class="download-svg"  fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 11.5V5.8C17 4.11984 17 3.27976 16.673 2.63803C16.3854 2.07354 15.9265 1.6146 15.362 1.32698C14.7202 1 13.8802 1 12.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.1198 21 5.79986 21H9.5M12 18L15 21M15 21L18 18M15 21V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Скачать PDF
      </div>
    </div>
    <div class="main__container">
      <div class="profile">
        <router-link class="admin" to="/admin">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
            <path d="M14.6641 4.66732H1.33073M1.33073 4.66732L4.66406 1.33398M1.33073 4.66732L4.66406 8.00065"
                  stroke="#122130" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          На главную
        </router-link>
      </div>

      <div class="container">
        <TestResultItemOxford v-if="tests.oxford" :test="tests.oxford" />
        <TestResultItemQuestionnaire v-if="tests.questionnaire" :test="tests.questionnaire" :questions="questionnaire"/>
        <TestResultItemIq v-if="tests.iq" :test="tests.iq" />
      </div>

      <vue3-html2pdf
        ref="html2pdfRef"
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1200"
        :manual-pagination="true"
        filename="document"
        :pdf-quality="2"
        pdf-orientation="portrait"
      >
        <template #pdf-content>
          <div class="heading-pdf">Результаты тестирования</div>
          <div class="pdf-content-container" v-if="tests.oxford">
            <TestResultItemOxford :test="tests.oxford" :opened="true"/>
          </div>
          <div class="page-break" v-if="tests.questionnaire && tests.oxford" />
          <div class="pdf-content-container" v-if="tests.questionnaire">
            <TestResultItemQuestionnaire v-if="tests.questionnaire" :test="tests.questionnaire" :questions="questionnaire" :opened="true"/>
          </div>
          <div class="pdf-content-container" v-if="tests.iq">
            <TestResultItemIq v-if="tests.iq" :test="tests.iq" :opened="true"/>
          </div>
        </template>
      </vue3-html2pdf>
    </div>
  </main>
</template>

<style lang="scss" scoped>

.heading-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 72px;

  @media screen and (max-width: 1200px) {
    margin-top: 1em;
  }
}

.download-svg {
  height: 14px;
  width: 14px;
}

.no-break {
  break-inside: avoid !important;
  page-break-inside: avoid !important;
  -webkit-region-break-inside: avoid !important;
  display: flow-root !important; /* Критически важно */
}

.page-break {
  break-before: always;
  page-break-before: always;
  height: 0;
}

.pdf-content-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-height: calc(100vh - 40px); /* Фиксируем минимальную высоту */
}

.heading-pdf {
  padding: 20px;
  margin-bottom: 1em;
  font-size: 28px;
  font-weight: 700;
  line-height: 33.6px;
  text-align: left;
  color: #122130;
}

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
    font-size: 28px;
    font-weight: 700;
    line-height: 33.6px;
    text-align: left;
    color: #122130;
  }

  .profile {
    display: flex;
    flex-direction: column;
    margin-right: 1em;
    max-height: max-content;
    color: #122130;
    max-width: 380px;
    flex-shrink: 0;
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



.pointer {
  cursor: pointer;
}

.heading-download {
  margin-bottom: 1em;
  font-size: 28px;
  font-weight: 700;
  line-height: 33.6px;
  text-align: left;
  color: #122130;
}



</style>