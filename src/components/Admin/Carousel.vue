<script setup>

</script>

<template>
  <v-slide-group class="slider" show-arrows>

    <div class="select" data-name="1"
        @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="2"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="1"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="2"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="1"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="2"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="1"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="2"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="1"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="2"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="1"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="2"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="1"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>
    <div class="select" data-name="2"
         @click.stop="(e) => { this.handleSelectOnClick(e) }">
      <div class="notification"></div>
      <div class="name">Все вакансии</div>
    </div>

  </v-slide-group>
</template>

<style lang="scss">
  .slider {
    display: flex;
    position: relative;

    .v-slide-group__content {
      gap: 11px;
    }

    .v-slide-group__next {
      position: absolute;
      justify-content: flex-end;
      z-index: 5;
      right: 0;
      min-width: 5em;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .1) 30%, #ffffff 100%);
      height: 3.5em;
      align-self: center;
    }

    .v-slide-group__prev {
      position: absolute;
      justify-content: flex-start;
      z-index: 5;
      left: -100%;
      min-width: 5em;
      background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .1) 30%, #ffffff 100%);
      height: 3.5em;
      align-self: center;
    }

    .v-slide-group__next--disabled {
      display: none;
    }

    .v-slide-group__prev--disabled {
      display: none;
    }

    .select {
      padding: 13px 20px;
      box-sizing: border-box;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      line-height: 19.6px;
      text-align: center;
      color: #122130;
      background-color: #F4F5F7;
      cursor: pointer;

      &.selected {
        background-color: #8F47FF;
        color: #FFFFFF;
      }

    }

  }
</style>