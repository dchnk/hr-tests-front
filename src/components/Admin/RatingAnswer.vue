<template>
  <div class="rating">
    <div>Оценка ответа:</div>
    <div class="rating-list">
      <div
        class="rating-item"
        :class="[(currentRating >= item) && 'done', isLoading && 'loading']"
        v-for="item in ratingLength" :key="item"
        @click="changeRating(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
 import { ref } from "vue";
 import axios from "axios";
 import {useRoute} from "vue-router";

 const { rating, ratingLength, questionKey } = defineProps(['rating', 'ratingLength', 'questionKey']);

 const currentRating = ref(rating);
 const isLoading = ref(false);

 const route = useRoute();

 const ratingList = defineModel({default: {}});

 const changeRating = async (rating) => {
   if ((rating === currentRating.value) || isLoading.value) return;

   isLoading.value = true;

   try {
     const changeRating = await axios.post(`/api/tests/change-rating/${route.params.id}`, {
       name: 'questionnaire',
       rating: {key: questionKey, value: rating}
     })

     currentRating.value = rating;
     ratingList.value[questionKey] = rating;

     isLoading.value = false;
   } catch (e) {
     console.log(e);
     isLoading.value = false;
   }
 }

</script>

<style scoped lang="scss">
.rating {
  margin-top: 1em;
}

 .rating-list {
   margin-top: 1em;
   display: flex;
   gap: .6em;
 }

 .rating-item {
   cursor: pointer;
   color: white;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 10px;
   background-color: rgba(153, 116, 210, 0.24);
   border-radius: 100%;
   height: 20px;
   width: 20px;

   &.done {
     background-color: #9974d2;
   }

   &.loading {
     cursor: not-allowed;
     opacity: .3;
   }
 }
</style>