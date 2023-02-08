<template>
  <!-- 导航栏 -->
  <div class="total-nav-container" :style="'background-color:' + color">
    <div class="iphone-info-container"></div>

    <div class="nav-container">
      <div class="nav-wrapper">
        <div class="nav-img-container" @click="routerGoBack">
          <div class="nav-img"></div>
        </div>
        <div class="nav-text-container">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JKNavigator',

  //   props区
  props: {
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'white',
    },
  },
  //变量区
  data() {
    return {};
  },

  //生命周期区
  mounted() {
    console.log(this.title);
    // console.log(this.$store);
    // this.JKTest();
  },
  //方法区
  methods: {
    // 返回上一页并且刷新
    routerGoBackWithFresh() {
      let currentPage = this.$router.currentRoute.path;
      let currentPageName = currentPage.split('/')[1];
      // console.log(currentPageName);

      if (currentPageName === 'sort' || currentPageName === 'mine') {
        // console.log(currentPageName === ('sort' || 'mine' || 'index')), '123';
        // console.log('触发');
        this.$router.replace('/index');
        this.$store.commit('changeActiveTabBarIndexState', 0);
        localStorage.setItem('activeTabBarIndex', 0);

        //     // this.$store.commit('changeIsFreshTabBarState', true);
        //     // this.$nextTick(() => {
        //     //   this.$store.commit('changeIsFreshTabBarState', false);
        //     // });
      } else {
        this.$router.go(-1);
      }
      //   console.log(this.$router);
    },
    //返回上一页不刷新
    routerGoBackWithoutFresh() {
      this.$router.back();
    },
    //直接回到首页
    routerGoToIndex() {
      this.$router.replace('/index');
    },
    routerGoBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	
		@import '@/assets/style/global.scss';
// 导航栏
.total-nav-container {
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 999;

  background-color: white;
  //   justify-content: center;
  // height: calc(44 / 75) + rem;

  .iphone-info-container {
    position: relative;
    width: 100vw;
    height: calc(22 / 75) + rem;
    font-size: calc(18  * $font-size-scale   / 75) + rem;
  }
  .nav-container {
    position: relative;
    width: 100vw;
    height: calc(107 / 75) + rem;

    display: flex;
    flex-direction: row;
    align-items: flex-end;
    .nav-wrapper {
      position: relative;
      width: 100vw;
      height: fit-content;
      min-height: calc(40 / 75) + rem;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: center;
      margin-bottom: calc(26 / 75) + rem;
      //   margin-left: calc(40.5 / 75) + rem;

      .nav-img-container {
        position: absolute;
        left: 0;
        top: 0;
        // margin-left: calc(20 / 37.5) + rem;
        height: calc(20 / 37.5) + rem;
        width: calc(20 / 37.5) + rem;
        margin-left: calc(41 / 75) + rem;
        // margin-right: calc(20 / 37.5) + rem;

        // margin-bottom: calc(27 / 75) + rem;

        .nav-img {
          background-image: url('@/assets/img/nav-left-arrow.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          height: 100%;
          width: 100%;
        }
      }
      .nav-text-container {
        position: relative;
        display: flex;
        align-items: center;

        // margin-bottom: calc(27 / 75) + rem;
        font-size: calc(36  * $font-size-scale  / 75) + rem;
        font-family: 'SourceHanSansCN-Medium';
        font-weight: 500;
        // font-size: 18px !important;
      }
    }
  }
}
</style>
