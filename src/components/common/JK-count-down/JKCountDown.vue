<template>
  <div class="countdown-container">
    <div class="day-container">
      <div class="num-container">
        <div class="num-text">{{ remainDay }}</div>
      </div>
      <div class="num-text-container">天</div>
    </div>
    <div class="hour-container">
      <div class="num-container">
        <div class="num-text">{{ remainHour }}</div>
      </div>
      <div class="num-text-container">时</div>
    </div>
    <div class="minute-container">
      <div class="num-container">
        <div class="num-text">{{ remainMin }}</div>
      </div>
      <div class="num-text-container">分</div>
    </div>
    <div class="second-container">
      <div class="num-container">
        <div class="num-text">{{ remainSec }}</div>
      </div>
      <div class="num-text-container">秒</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'countDown',
  components: {},
  props: {
    // 倒计时的时间(秒)
    backTimeSecondFromFather: {
      type: Number,
      default: 240000,
    },
  },
  //变量区
  data() {
    return {
      test: '123',
      //用于倒计时的定时器
      countDownTimer: null,
      // 倒计时的时间(秒)
      backTimeSecond: 0,

      //显示用的天
      remainDay: '00',
      //显示用的小时
      remainHour: '00',
      //显示用的分钟
      remainMin: '00',
      //显示用的秒
      remainSec: '00',
    };
  },
  //生命周期区
  mounted() {
    this.$nextTick(() => {
      // 将父容器的时间数据传入到子容器李米娜
      this.backTimeSecond = this.$props.backTimeSecondFromFather;

      //初始化时间格式化的数据
      this.formatTimeSecond();

      this.countDownTimer = setInterval(() => {
        this.backTimeSecond = this.backTimeSecond - 1;
        this.formatTimeSecond();
      }, 1000);
    });

    // 手动监听hook:beforeDestroy，然后销毁countDownTimer定时器（可优化）
    // this.$once('hook:beforeDestroy', () => {
    //   clearInterval(countDownTimer);
    //   currentTimer = null;
    //   console.log('全都销毁了');
    // });

    // this.JKTest();
  },
  beforeDestroy() {
    //退出前清除定时器
    // this.clearCountDownTimer();
  },
  //方法区
  methods: {
    JKTest() {
      console.log('测试一下');
    },

    // 清除定时器
    clearCountDownTimer() {
      if (this.countDownTimer != null) {
        clearInterval(this.countDownTimer);
        this.countDownTimer = null;
      }
    },
    //格式化时间
    formatTimeSecond() {
      //获取当前的倒数时间
      let backTimeSecond = this.backTimeSecond;

      // 初始化数据
      let day = 0;
      let hour = 0;
      let min = 0;
      let sec = 0;

      if (backTimeSecond >= 0) {
        // 秒/60=分
        //分/60 = 时
        //时/ 24 = 天
        day = Math.floor(backTimeSecond / 60 / 60 / 24);
        hour = Math.floor((backTimeSecond / 60 / 60) % 24);

        min = Math.floor((backTimeSecond / 60) % 60);
        sec = Math.floor(backTimeSecond % 60);
      } else {
        this.$emit('changeCanEnjoyDiscountStateFromFather', true);

        //如果时间结束了，就清除定时器
        this.clearCountDownTimer();
      }

      //格式化时间
      day = day < 10 ? '0' + day : day;
      hour = hour < 10 ? '0' + hour : hour;
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;

      //设置参数
      this.remainDay = day;
      this.remainHour = hour;
      this.remainMin = min;
      this.remainSec = sec;

      // console.error(day, hour, min, sec)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';
.countdown-container {
  position: relative;
  display: flex;

  font-size: calc(20 * $font-size-scale / 75) + rem;

  width: fit-content;

  .day-container {
    position: relative;
    display: flex;
    width: fit-content;

    .num-container {
      position: relative;

      box-sizing: border-box;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: calc(8 / 75) + rem;
      transform: translateZ(0);

      background: #e41f19;
      // border: 2rpx solid black;

      .num-text {
        height: 100%;
        width: 100%;

        padding-left: calc(4 / 75) + rem;
        padding-right: calc(4 / 75) + rem;

        font-size: calc(30 * $font-size-scale / 75) + rem;

        color: white;
        white-space: nowrap;
      }
    }
    .num-text-container {
      position: relative;
      display: flex;
      align-items: flex-end;
    }
  }

  .hour-container {
    position: relative;
    display: flex;
    width: fit-content;

    .num-container {
      position: relative;

      box-sizing: border-box;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: calc(8 / 75) + rem;
      transform: translateZ(0);

      background: #e41f19;
      // border: 2rpx solid black;

      .num-text {
        height: 100%;
        width: 100%;

        padding-left: calc(4 / 75) + rem;
        padding-right: calc(4 / 75) + rem;

        font-size: calc(30 * $font-size-scale/ 75) + rem;

        color: white;
        white-space: nowrap;
      }
    }
    .num-text-container {
      position: relative;
      display: flex;
      align-items: flex-end;
    }
  }

  .minute-container {
    position: relative;
    display: flex;
    width: fit-content;

    .num-container {
      position: relative;

      box-sizing: border-box;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: calc(4 / 75) + rem;
      transform: translateZ(0);

      background: #e41f19;
      // border: 2rpx solid black;

      .num-text {
        height: 100%;
        width: 100%;

        padding-left: calc(4 / 75) + rem;
        padding-right: calc(4 / 75) + rem;

        font-size: calc(30 * $font-size-scale / 75) + rem;

        color: white;
        white-space: nowrap;
      }
    }
    .num-text-container {
      position: relative;
      display: flex;
      align-items: flex-end;
    }
  }

  .second-container {
    position: relative;
    display: flex;
    width: fit-content;

    .num-container {
      position: relative;

      box-sizing: border-box;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: calc(8 / 75) + rem;
      transform: translateZ(0);

      background: #e41f19;
      // border: 2rpx solid black;

      .num-text {
        height: 100%;
        width: 100%;

        padding-left: calc(4 / 75) + rem;
        padding-right: calc(4 / 75) + rem;

        font-size: calc(30 * $font-size-scale / 75) + rem;

        color: white;
        white-space: nowrap;
      }
    }
    .num-text-container {
      position: relative;
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>
