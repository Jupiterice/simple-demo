<template>
  <div class="page flex">
    <!-- <NavBar :title="title">
      <Back slot="left"/>
    </NavBar> -->
    <div class="header">
      <div class="left">
        <slot name="left">
          <Back slot="left"/>
        </slot>
      </div>
      <div class="title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
  import Back from './Back';

  export default {
    name: 'App',
    components: {
      Back
    },
    props: ['title'],
  };
</script>

<style lang="less">
.page {
  position: relative;
  padding-top: 45px;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-size: 14px;
  overflow: hidden;
  background-color: #fff;
}


.header {
  position: absolute;
  width: 100%;
  height: 45px;
  background: #fff;
  line-height: 45px;
  top: 0;
  z-index: 11;

  .title {
    max-width: 60%;
    height: 45px;
    display: flex;
    align-items: center;
    flex: 1;
    margin: 0 auto;
    color: #323233;
    font-weight: 500;
    font-size: 0.426667rem;
    text-align: center;
  }
  .right {
    position: absolute;
    min-width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 0;
  }
}
</style>
