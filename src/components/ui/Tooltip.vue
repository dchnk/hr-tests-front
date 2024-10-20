<script setup>
const {text} = defineProps(['text']);
</script>

<template>
  <div class="tooltip">{{text}}</div>
</template>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  width: max-content;
  right: 0;
  top: -50%;
  color: #FFFFFF;
  background-color: #000000;
  border-radius: 10px;
  padding: 6px 12px;
  box-sizing: border-box;
  visibility: hidden;
  opacity: 0;
  //transition: all .2s ease-in-out;

  font-size: 12px;
  font-weight: 500;
  line-height: 19.2px;

  &:after {
    transform: rotate(-45deg);
    content: "";
    z-index: 1;
    display: block;
    position: absolute;
    top: -5px;
    right: 15px;
    height: 10px;
    width: 10px;
    border-radius: 0px 4px 0px 0px;
    background-color: #000000;
    visibility: hidden;
    opacity: 0;
  }

  &.open {
    visibility: visible;
    opacity: 1;
    top: 125%;

    &:after {
      visibility: visible;
      opacity: 1;
      top: -5px;
    }
  }
}
</style>