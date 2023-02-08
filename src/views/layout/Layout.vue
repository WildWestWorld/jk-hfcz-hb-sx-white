<template>
  <div class="page-container">
    <!-- 背景颜色/背景图片 -->
    <div class="page-bgc"></div>

    <div class="page">
      <!-- 内容-容器 -->
      <div class="header-container">
        <div class="header">1</div>
      </div>
      <div class="content-container">
        <div class="content">2</div>
      </div>

      <div class="foot-container">
        <div class="foot">3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  components: {},
  computed: {
    setPageBgStyle() {
      return {
        //  window.screen.height == 812兼容iphone X
        height:
          window.screen.width == 375 && window.screen.height >= 812
            ? '100vh'
            : '',
      };
    },
    setPageStyle() {
      return {
        //  window.screen.height == 812兼容iphone X
        height:
          window.screen.width == 375 && window.screen.height >= 812
            ? '100vh'
            : '',
      };
    },
  },
  //变量区
  data() {
    return {
      test: '123',
    };
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
.page-container {
  box-sizing: border-box;
  position: relative;
  //   height: fit-content;
  width: 100vw;
  height: 100vh;
  //   background-color: rgba(grey, 0.1);

  //不加的话 iphone5会多出来一块
  overflow-x: hidden;

  //   背景颜色/背景图片
  .page-bgc {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //   background-image: url('@/assets/img/ready-step-bgc.jpg');
    //   background-size: 100% 100%;
    //   background-repeat: no-repeat;
  }

  .page {
    box-sizing: border-box;
    position: relative;
    //   height: fit-content;

    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 100vh;
    background-color: rgba(grey, 0.1);

    //不加的话 iphone5会多出来一块
    overflow-x: hidden;
    //   设置背景
    .content-container {
      flex: 1;
    }
  }
}
</style>
