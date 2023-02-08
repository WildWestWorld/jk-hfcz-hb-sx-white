<template>
  <div class="empty-ticket-tips-container">
    <div class="tips-img-text-container">
      <div class="tips-img-container">
        <div class="tips-img"></div>
      </div>
      <div class="tips-text-container">暂未发现订单</div>
    </div>
    <!-- <div class="tips-button-container">
      <div class="tips-button-wrapper">
        <div class="tips-button-text" @click="navToPage('guessFavorite')">
            猜你喜欢
          </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'emptyTicketTips',

  //变量区
  data() {
    return {};
  },
  //生命周期区
  mounted() {
    // console.log(this.$store);
    // this.JKTest();
  },
  //方法区
  methods: {
    JKTest() {
      console.log('测试一下');
    },
    navToPage(path) {
      this.$router.push('/' + path);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';

.empty-ticket-tips-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(1009.5 / 75) + rem;
  width: 100%;
  .tips-img-text-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(638 / 75) + rem;
    width: 100%;
    .tips-img-container {
      position: relative;
      height: calc(565 / 75) + rem;
      width: calc(565 / 75) + rem;

      margin-top: calc(40 / 75) + rem;
      .tips-img {
        height: 100%;
        width: 100%;

        background-image: url('@/assets/img/empty-ticket-img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .tips-text-container {
      font-size: calc(28 * $font-size-scale / 75) + rem;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #949494;
    }
  }
  .tips-button-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;

    height: calc(95 / 75) + rem;
    width: 100%;
    .tips-button-wrapper {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      width: calc(251 / 75) + rem;
      height: calc(64 / 75) + rem;
      background: linear-gradient(53deg, #f1a961, #f08855);
      border-radius: calc(32 / 75) + rem;

      margin-top: calc(31 / 75) + rem;

      .tips-button-text {
        font-size: calc(28 * $font-size-scale / 75) + rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
}
</style>
