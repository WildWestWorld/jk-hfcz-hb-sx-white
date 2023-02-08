<template>


  <div class="recommend-card-container">
    <div class="recommend-card-wrapper" @click="navToPage('collectTicket')">
      <!-- <div class="recommend-card-wrapper"> -->
      <div class="left-img-container">
        <div class="left-img-wrapper">
          <div class="left-img">
            <img
              src="@/assets/img/guess-favorite-img-new.png"
              height="100%"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="right-info-container">
        <div class="right-info-wrapper">
          <div class="top-title-container">
            <div class="top-title-text">农行家装卡满千返百</div>
          </div>
          <div class="bottom-expire-container">
            <div class="bottom-expire-data-text">有效期至：2023年10月31日</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ticketCard',

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

.recommend-card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  align-items: center;

  height: calc((182 + 32) / 75) + rem;
  width: 100%;
  .recommend-card-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;

    width: calc(690 / 75) + rem;
    height: calc(182 / 75) + rem;
    background: #ffffff;
    border-radius: calc(20 / 75) + rem;

    margin-top: calc(32 / 75) + rem;
    .left-img-container {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      height: 100%;
      width: calc(207 / 75) + rem;
      .left-img-wrapper {
        position: relative;
        width: calc(163 / 75) + rem;
        height: calc(121 / 75) + rem;
        .left-img {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          //   background-image: url(@/assets/img/guess-favorite-img-new.png);
          //   background-repeat: no-repeat;
          //   background-size: 100% 100%;
        }
      }
    }
    .right-info-container {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: calc(483 / 75) + rem;

      margin-left: calc(22 / 75) + rem;
      .right-info-wrapper {
        position: relative;
        height: 100%;
        width: 100%;

        .top-title-container {
          position: relative;
          height: calc(90 / 75) + rem;
          width: 100%;
          margin-top: calc(35 / 75) + rem;
          margin-right: calc(12 / 75) + rem;
        }
        .top-title-text {
          font-size: calc(32 * $font-size-scale / 75) + rem;
          font-family: SourceHanSansCN;
          font-weight: bold;
          color: #000000;

          overflow: hidden;
          text-overflow: ellipsis; //当对象内文本溢出时显示省略标记
          display: -webkit-box;
          -webkit-line-clamp: 2; //这边的2指的是两行
          -webkit-box-orient: vertical;
        }
        .bottom-expire-container {
          position: relative;
          height: calc(48 / 75) + rem;
          width: 100%;
          .bottom-expire-data-text {
            font-size: calc(24 * $font-size-scale / 75) + rem;
            font-family: SourceHanSansCN;
            font-weight: 500;
            color: #b1b1b1;
          }
        }
      }
    }
  }
}
</style>
