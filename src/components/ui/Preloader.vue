<script setup>

</script>

<template>
  <div className="preloader">
    <div className="preloader__container">
      <span className="preloader__round"></span>
    </div>
  </div>
</template>

<style scoped>
@keyframes preloader-inside-white {
  0% {
    -webkit-transform: scale(0, 0);
    -moz-transform: scale(0, 0);
    -ms-transform: scale(0, 0);
    -o-transform: scale(0, 0);
    transform: scale(0, 0);
  }
  100% {
    -webkit-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}

@keyframes preloader-inside-red {
  0% {
    -webkit-transform: scale(0, 0);
    -moz-transform: scale(0, 0);
    -ms-transform: scale(0, 0);
    -o-transform: scale(0, 0);
    transform: scale(0, 0);
  }
  30% {
    -webkit-transform: scale(0, 0);
    -moz-transform: scale(0, 0);
    -ms-transform: scale(0, 0);
    -o-transform: scale(0, 0);
    transform: scale(0, 0);
  }
  100% {
    -webkit-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}

.preloader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  z-index: 10;
}

.preloader__container {
  width: 40px;
  height: 40px;
  position: relative;
}

.preloader__round {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  background: #8F47FF;
  border-radius: 50px;
}

.preloader__round::after,
.preloader__round::before {
  content: '';
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50px;
}

.preloader__round::after {
  background: white;
  animation: preloader-inside-white 1s ease-in-out infinite;
}

.preloader__round::before {
  z-index: 10;
  background: #8F47FF;
  animation: preloader-inside-red 1s ease-in-out infinite;
}
</style>