<script setup>

const scrollToNextSection = () => {
  const targetPosition = window.innerHeight; // Позиция, на которую нужно прокрутить
  const startPosition = window.pageYOffset; // Текущая позиция прокрутки
  const distance = targetPosition - startPosition; // Расстояние, которое нужно пройти
  const duration = 100; // Длительность анимации в миллисекундах
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1); // Нормализуем прогресс от 0 до 1

    // Применяем easing (например, ease-in-out)
    const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease); // Прокрутка

    if (timeElapsed < duration) {
      requestAnimationFrame(animation); // Запрос следующего кадра
    }
  };

  requestAnimationFrame(animation); // Запуск анимации
}



</script>

<template>
  <section class="about">
    <div class="container">
      <div class="logo"/>
      <h1 class="heading">
        Онлайн-оценка персонала для малого и среднего бизнеса
      </h1>
      <p class="description">
        Сервис помогает предпринимателям и HR-специалистам оценить кандидата на работу, измерить вовлечённость ваших
        текущих сотрудников, а также автоматизировать процесс собеседований
      </p>
      <div class="beta">
        <div class="dot"/>
        <div class="text">Beta-версия</div>
      </div>
    </div>
    <div class="cover"/>
    <div class="arrow" @click="scrollToNextSection">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0.626391 0.626163C1.01692 0.235696 1.65008 0.235696 2.0406 0.626163L8.00016 6.58576L13.9597 0.626163C14.3502 0.235696 14.9834 0.235696 15.374 0.626163C15.7644 1.0167 15.7644 1.6499 15.374 2.04043L8.7073 8.7071C8.31676 9.09756 7.68356 9.09756 7.29303 8.7071L0.626391 2.04043C0.235864 1.6499 0.235864 1.0167 0.626391 0.626163Z"
              fill="white"/>
      </svg>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about {
  //display: flex;
  //position: relative;
  //flex-direction: column;
  //align-items: center;
  //background-color: #122130;
  //height: 100%;
  //width: 50%;
  //text-align: center;

  display: grid;
  grid-template-rows: minmax(325px, auto) auto;
  position: relative;
  align-items: center;
  background-color: #122130;
  //height: 100%;
  width: 50%;
  text-align: center;

  @media screen and (max-width: 820px) {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .container {
    //height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    .logo {
      //margin-top: 22%;
      width: 100%;
      margin-bottom: 32px;
      max-width: 190px;
      min-height: 44.25px;
      background-image: url("../../img/logo.png");
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;

      @media screen and (max-width: 820px) {
        max-width: 130px;
        margin-bottom: 24px;
      }
    }

    .heading {
      margin: 0 20px 20px;
      font-size: 36px;
      font-weight: 700;
      line-height: 43.2px;
      color: #FFFFFF;
      max-width: 668px;

      @media screen and (max-width: 820px) {
        font-size: 22px;
        line-height: 26.4px;
        margin-bottom: 16px;
      }
    }

    .description {
      margin: 0 0 24px;
      font-size: 16px;
      font-weight: 400;
      line-height: 25.6px;
      color: #B9BBC1;
      max-width: 525px;

      @media screen and (max-width: 820px) {
        font-size: 14px;
        line-height: 22.4px;

      }
    }

    .beta {
      display: flex;
      align-items: center;
      padding: 8px 21px;
      border-radius: 60px;
      border: 1px solid #FFFFFF1A;

      .dot {
        height: 6px;
        width: 6px;
        background-color: #8F47FF;
        border-radius: 50%;
        margin-right: 10px;
      }

      .text {
        font-family: Manrope;
        font-size: 14px;
        font-weight: 400;
        line-height: 22.4px;
        color: #B9BBC1;
      }
    }
  }


  .cover {
    background-image: url("../../img/cover.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;
    height: 100%;
    width: 100%;

    @media screen and (max-width: 820px) {
      display: none;
    }

  }

  .arrow {
    margin-top: 32px;
    border: 1px solid #FFFFFF1A;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    display: none;

    svg {
      transform: scale(.8);
      margin: auto;
    }

    @media screen and (max-width: 820px) {
      display: flex;
    }
  }
}
</style>