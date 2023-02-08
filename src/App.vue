<template>
  <div>
    <router-view></router-view>
    <!-- tabbar -->
  </div>
</template>

<script>
import vConsole from 'vconsole';
export default {
  name: 'App',
  data() {
    return {};
  },
  created() {
    let query = window.location.search;
    // console.log(query);
  },

  mounted() {
    // getUserOpenIDAPI(payload).then((res) => {
    //   console.log(res);
    // });

    // const Console = new vConsole();

    // 强制不让微信的字体大小调整效果在该h5页面生效
    this.$nextTick(() => {
      setTimeout(() => {
        this.init();
      }, 300);
    });
  },
  methods: {
    init() {
      if (
        typeof WeixinJSBridge === 'object' &&
        typeof WeixinJSBridge.invoke === 'function'
      ) {
        this.handleFontsize();
      } else {
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            this.handleFontsize,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent('WeixinjsBridgeReady', this.handleFontsize);
          document.attachEvent('onWeixinJSBridgeReady', this.handleFontsize);
        }
      }
    },
    handleFontsize() {
      // 设置网页字体为默认大小
      WeixinJSBridge.invoke('setFontSizeCallback', {
        fontSize: 0,
      });
      // 重写设置网页字体大小的事件
      WeixinJSBridge.on('menu: setfont', () => {
        WeixinJSBridge.invoke('setFontSizeCallback', {
          fontsize: 0,
        });
      });
    },
  },
};
</script>

<style>
html {
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}
</style>
