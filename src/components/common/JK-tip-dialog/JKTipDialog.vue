<template>
  <div
    :class="
      isDialogShow
        ? 'dialog-container containerShow'
        : 'dialog-container containerHidden'
    "
  >
    <!-- 对话框出现时黑色的背景 -->
    <div class="dialog-bgc" @touchmove.prevent></div>

    <!-- 对话框 -->

    <div
      :class="!isDialogShow ? 'dialog-wrapper show' : 'dialog-wrapper hidden'"
      :style="setDialogStyle"
    >
      <!-- 对话框的头部 -->
      <!-- <div class="JK-dialog-head-container">
            <div
              class="close-button-container"
              @click="changeIsDialogShowState(false)"
            >
              x
            </div>
          </div> -->
      <!-- 对话框的内容 -->
      <div class="JK-dialog-content-container">
        <slot name="content"></slot>
      </div>
      <!-- 对话框的尾部 -->

      <div class="JK-dialog-footer-container" v-if="isShowBtn">
        <div
          class="left-button-container"
          @click="changeIsDialogShowState(false)"
        >
          {{ leftButtonText }}
        </div>
        <div
          class="right-button-container"
          @click="changeIsDialogShowState(false)"
        >
          {{ rightButtonText }}
        </div>
      </div>
    </div>

    <!-- 对话框下面的close按钮 -->
    <div class="close-btn-img-container" v-if="isShowBottomCloseBtn">
      <div class="close-btn-img-wrapper" @click="closeDialog">
        <img class="close-btn-img" src="@/assets/img/close_icon.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JKDialog',

  //   props区
  props: {
    dialogWidth: {
      type: String,
      default: '300',
    },
    dialogHeight: {
      type: String,
      default: '560',
    },
    leftButtonText: {
      type: String,
      default: '否',
    },
    rightButtonText: {
      type: String,
      default: '是',
    },
    isShowBottomCloseBtn: {
      type: Boolean,
      default: true,
    },
    isShowBtn: {
      type: Boolean,
      default: true,
    },
  },
  //变量区
  data() {
    return {
      isDialogShow: false,
    };
  },

  computed: {
    setDialogStyle() {
      return {
        width: this.$props.dialogWidth / 75 + 'rem',
        height: this.$props.dialogHeight / 75 + 'rem',
      };
    },
  },
  //生命周期区
  mounted() {
    // let timer = null;
    // timer = setTimeout(() => {
    //   this.isDialogShow = true;
    //   clearTimeout(timer);
    //   timer = null;
    // }, 1);
    // this.JKTest();
  },
  //方法区
  methods: {
    changeIsDialogShowState(flag) {
      console.log(flag);
      this.isDialogShow = flag;
    },
    closeDialog() {
      this.isDialogShow = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';

.dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  //设置动画的时长
  transition: 0.8s;
  z-index: 999;
  &.containerShow {
    visibility: visible;
    opacity: 100;
  }
  &.containerHidden {
    visibility: hidden;
    opacity: 0;
  }
  //   对话框的背景色
  .dialog-bgc {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 1;
  }
  //   对话框主体的容器
  .dialog-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    /* height: calc(300 / 75) + rem; */
    height: fit-content !important;
    width: calc(560 / 75) + rem;
    background-color: white;
    border-radius: calc(20 / 75) + rem;

    border: calc(4 / 75) + rem solid #fe4017;

    &::before {
      position: absolute;
      top: calc(-10 / 75) + rem;
      left: 50%;
      transform: translateX(-50%);

      padding-top: calc(10 / 75) + rem;

      content: '活动规则';

      font-size: calc(34 * $font-size-scale / 75) + rem;

      font-family: Source Han Sans SC;
      font-weight: bold;
      color: #fefefe;
      text-align: center;

      //   display: none;
      display: block;
      width: calc(366 / 75) + rem;
      height: calc(56 / 75) + rem;
      background-image: url(@/assets/img/tips-dialog-title-bg.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;

      //top: -0.4547rem;
      //   margin: 0 auto;

      z-index: 99999;
    }

    // 头部
    .JK-dialog-head-container {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      height: calc(90 / 75) + rem;
      .close-button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: calc(60 / 75) + rem;
        height: calc(60 / 75) + rem;
        margin-right: calc(20 / 75) + rem;

        background-color: black;
        color: white;
        border-radius: calc(15 / 75) + rem;

        font-size: calc(30 * $font-size-scale / 75) + rem;
      }
    }
    // 内容
    .JK-dialog-content-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: calc(30 * $font-size-scale / 75) + rem;
      color: #9e9e9e;
    }
    // 尾部
    .JK-dialog-footer-container {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: calc(90 / 75) + rem;
      border-top: calc(1 / 75) + rem solid #f4f4f4;
      .left-button-container {
        position: relative;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        font-size: calc(30 * $font-size-scale / 75) + rem;
        color: black;

        border-right: calc(1 / 75) + rem solid #f4f4f4;
      }

      .right-button-container {
        position: relative;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        font-size: calc(30 * $font-size-scale / 75) + rem;
        color: #02bb4a;
      }
      .close-button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: calc(60 / 75) + rem;
        height: calc(60 / 75) + rem;
        margin-right: calc(20 / 75) + rem;

        background-color: black;
        color: white;
        border-radius: calc(15 / 75) + rem;

        font-size: calc(30 * $font-size-scale / 75) + rem;
      }
    }

    // 当对话框 显现 的时候使用的样式
    &.show {
      // 当对话框显现 的时候 会回到原点
      //与 hidden样式结合时，展现时 会让人感觉对话框向上移动了10%
      // 隐藏时会让人感觉对话框向下移动了10% 距离 并且隐藏
      transform: translateY(0%);
    }
    // 当对话框 隐藏 的时候使用的样式
    &.hidden {
      // 隐藏时默认的是往下 移动10%的距离
      //   transform: translateY(10%);
      transform: translateY(0%);
    }
  }

  // 带x的img，关闭按钮
  .close-btn-img-container {
    position: relative;
    display: flex;
    justify-content: center;
    height: calc(62 / 75) + rem;
    width: 100%;

    // bottom: 25%;
    z-index: 99999;
    top: calc(50 / 75) + rem;
    // margin-top: 50rpx;
    .close-btn-img-wrapper {
      position: relative;
      justify-content: center;
      height: calc(62 / 75) + rem;
      width: calc(62 / 75) + rem;
      .close-btn-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
