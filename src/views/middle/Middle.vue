<template>
  <div class="page-container">
    <!-- 背景颜色/背景图片 -->
    <div class="page-bgc"></div>

    <div class="page">
      <!-- 内容-容器 -->
      <div class="header-container">
        <div class="header"></div>
      </div>
      <div class="content-container">
        <div class="content"></div>
      </div>

      <div class="foot-container">
        <div class="foot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserOpenIDAPI } from '@/api/login/login';

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
  created() {
    console.log(document.referrer, 'document.referrer');
    //判断来源页如果来源页是卡赢的页面我们就设置变量
    // if (
    //   document.referrer == 'https://bank.cardwinner.com/abc/abc_hb_xyk/' ||
    //   document.referrer == 'https://banks.cardwinner.com/abc/abc_hb_xyk/' ||
    //   document.referrer ==
    //     'https://banks.cardwinner.com/abc/abc_hb_xyk/public/xyk/index.html' ||
    //   document.referrer ==
    //     'https://banks.cardwinner.com/abc/abc_hb_xyk/public/xyk4/index.html'
    // ) {
    //   sessionStorage.setItem('isFromCardWinner', true);

    //   sessionStorage.setItem('isLogin', false);
    //   console.log('来自卡赢');
    //   this.$toast({ message: '来自卡赢', duration: 1500 });
    // }
  },
  mounted() {
    // console.log(this.$store);
    // this.JKTest();

    let url = 'https://saas.cardwinner.com/active/library/abc_2njd9b/#/login';
    let encode = encodeURI(url);
    // 对编码的字符串转化base64
    let base64URL = btoa(encode);
    let item_code = 'ABC_2NJD9B';

    window.location.href = `https://saas.cardwinner.com/lib/v3/lw/wxOpenIdRed?url=${base64URL}&item_code=${item_code}`;

    //   console.log(base64URL);

    // if (!sessionStorage.getItem('isLogin')) {
    //   setTimeout(() => {
    //     let url =
    //       'https://banks.cardwinner.com/abc/abc_hb_zebz/public/zebz/index.html#/index';
    //     let encode = encodeURI(url);
    //     // 对编码的字符串转化base64
    //     let base64URL = btoa(encode);
    //     //   console.log(base64URL);

    //     sessionStorage.setItem('isShowIndex', true);

    //     window.location.href = `https://banks.cardwinner.com/abc/abc_hb_zebz/public/?s=App.User.WxOpenIdRed&url=${base64URL}`;
    //   }, 1000);
    // } else {
    //   //如果已经登录了说他想退出，那么就关闭页面
    //   //   微信公众号 无法使用      window.close();
    //   //改用此方法 模拟器测试时会提示你无法正常使用 但是真机测试是完全可以用的

    //   //如果他不是来自卡赢页面的我们就关闭这个页面，如果是我们就保留这个页面
    //   if (!sessionStorage.getItem('isFromCardWinner')) {
    //     //关闭当前页面
    //     setTimeout(() => {
    //       //这个可以关闭安卓系统的手机
    //       document.addEventListener(
    //         'WeixinJSBridgeReady',
    //         function () {
    //           WeixinJSBridge.call('closeWindow');
    //         },
    //         false
    //       );
    //       //这个可以关闭ios系统的手机
    //       WeixinJSBridge.call('closeWindow');
    //     }, 1000);
    //   } else {
    //     //后退
    //     window.history.go(-1);

    //     sessionStorage.removeItem('isLogin');
    //     sessionStorage.removeItem('isShowIndex');
    //   }
    // }
  },
  //方法区
  methods: {
    JKTest() {
      console.log('测试一下');
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
