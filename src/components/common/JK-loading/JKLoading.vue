<template>
  <div class="loading-container" v-if="showLoading">
    <div class="loading-icon"></div>

    <div class="loading-text">加载中</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    showLoading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.loading-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .loading-icon {
    box-sizing: border-box;
    width: calc(20 / 37.5) + rem;
    height: calc(20 / 37.5) + rem;

    border-radius: 50%;

    border: calc(4 / 37.5) + rem solid;
    border-left-color: #0b8aed;

    border-top-color: #0b8aed;
    border-bottom-color: #e5e5e5;
    border-right-color: #0b8aed;

    animation: loading-icon-rotate 0.85s linear infinite;
  }

  @keyframes loading-icon-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-text {
    margin-left: calc(6 / 37.5) + rem;
    font-size: calc(15 * $font-size-scale/ 37.5) + rem;
  }
}
</style>
