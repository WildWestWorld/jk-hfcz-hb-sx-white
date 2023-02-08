<template>
  <div class="tab-list-container">
    <div class="tab-list-wrapper">
      <div class="tab-list-header-container">
        <div
          class="tab-list-header-item-container"
          ref="tabList"
          v-for="(item, index) in tabListHeaderData"
          @click="changeActiveTabItemIndex(index)"
          :key="index"
        >
          <div
            :class="
              activeTabItemIndex == index
                ? 'tab-list-header-item-text-container active'
                : 'tab-list-header-item-text-container '
            "
            :id="'tab-list-header-item' + index"
            @click="getOrderList(index)"
          >
            {{ item.name }}
          </div>
        </div>

        <!-- tab下面的滑块 -->
        <div
          class="tab-list-header-slider"
          :style="`transform: translateX(${
            tabListPositionInit + tabListItemWidth * activeTabItemIndex
          }px) translateX(-50%);`"
        ></div>
      </div>

      <!-- tab里面的内容 -->
      <div class="tab-list-content-container">
        <img
          class="nav-left"
          src="@/assets/img/nav-left-arrow-img.png"
          @click="() => this.$router.go(-1)"
        />

        <div class="tab-list-content-item-container">
          <div
            class="tab-list-content-item"
            v-for="(item, index) in tabListHeaderData"
            :class="
              activeTabItemIndex == index
                ? 'tab-list-content-item active'
                : 'tab-list-content-item '
            "
            :key="index"
          >
            <div class="tab-list-content">
              <slot :name="'item' + index"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  components: {},
  data() {
    return {
      screenWidth: null,
      activeTabItemIndex: 0,
      tabListPositionInit: 58.5,
      tabListItemWidth: 0,
      tabListPosition: 0,
      tabListHeaderData: [
        {
          name: '全部',
        },
        {
          name: '待支付',
        },
        {
          name: '已完成',
        },
        { name: '退款' },
      ],
      //   usePush: false,
    };
  },
  //   生命周期区
  mounted() {
    this.tabListSliderInit();
    this.getScreenWidth();
    let referrer = document.referrer;
    if (referrer.length > 0) {
      let referrerArr = referrer.split('//');
      referrerArr = referrerArr[referrerArr.length - 1].split('/');
      referrer = referrerArr[0];
    }

    //判断是否来自卡赢支付
    if (referrer == 'api.cardwinner.com') {
      //   this.usePush = true;
      sessionStorage.setItem('isFreshRouter', true);
      this.$router.push('/index');
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.hightChange, true);
  },
  //方法区
  methods: {
    // 初始化tabList的滑块位置
    tabListSliderInit() {
      //   console.log(this.$refs.tabList[0].clientWidth);
      this.tabListPositionInit = this.$refs.tabList[0].clientWidth / 2;
      this.tabListItemWidth = this.$refs.tabList[0].clientWidth;

      //   console.log(this.tabListItemWidth, this.tabListPositionInit);
    },
    // 获取屏幕的宽度并检测页面是否发生改变
    getScreenWidth() {
      //获取屏幕尺寸
      this.screenWidth = document.body.clientWidth;
      //   console.log(document.body.clientWidth);
      //   当页面发生改变
      window.addEventListener('resize', this.hightChange, true);

      //   window.onresize = () => {
      //     console.log('高度改变');
      //     this.screenWidth = document.body.clientWidth;
      //     this.tabListSliderInit();
      //     console.log(this.screenWidth);
      //   };
    },
    //改变正在使用的变量activeTabItemIndex
    changeActiveTabItemIndex(index) {
      this.activeTabItemIndex = index;
    },
    hightChange() {
      //   console.log('高度改变');
      this.screenWidth = document.body.clientWidth;
      this.tabListSliderInit();
      //   console.log(this.screenWidth);
    },
    getOrderList(index) {
      this.$emit('getOrderByIndexFromFather', index);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';

.tab-list-container {
  position: relative;
  height: 100%;
  width: 100vw;

  display: flex;
  flex-direction: column;
  .tab-list-wrapper {
    position: relative;
    /* width: calc(100vw - 0.67rem); */
    width: 100%;
    // height: fit-content;
    height: 100%;
    margin: 0 auto;

    display: flex;
    flex-direction: column;

    background-color: white;

    /* border-radius: 0.6rem; */
    .tab-list-header-container {
      position: relative;
      height: calc(91 / 75) + rem;

      display: flex;
      flex-direction: row;

      //   border-bottom: 1px solid #dddddd;
      //   border-bottom-width: calc(1 / 75) + rem;

      flex-shrink: 0;

      //   &:last-child {
      //     background-color: #00995a;
      //   }
      #tab-list-header-item2 {
        border-right-width: 0px;
      }
      .tab-list-header-slider {
        content: '';
        position: absolute;
        background-color: #ec7842;
        width: calc(88 / 75) + rem;
        height: calc(5 / 75) + rem;
        z-index: 1;
        /* top: calc(86 / 75) + rem; */
        bottom: 0;
        // transform: translateX(calc(117) + px) translateX(-50%);
        transition-duration: 0.3s;
      }
      .tab-list-header-item-container {
        position: relative;

        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .tab-list-header-item-text-container {
          font-size: calc(32 * $font-size-scale / 75) + rem;

          width: 100%;
          text-align: center;
          /* border-right: 1px solid #d1d2d1; */
        }
        .active {
          color: #ec7842;
        }
      }
    }
    .tab-list-content-container {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #f2f2f2;
      .nav-left {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: calc(10 / 75) + rem !important;
        /* margin-left: calc(10 / 75) + rem !important; */

        height: calc(37.5 / 75) + rem !important;
        width: calc(37.5 / 75) + rem;
        background: grey;
        border-radius: 50%;
        z-index: 99;
      }

      .tab-list-content-item-container {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;

        .tab-list-content-item {
          position: relative;
          display: none;

          flex-direction: column;
          height: 100%;
          .tab-list-content {
            position: relative;
            height: 100%;
          }
        }
        .active {
          display: block;
        }
      }
    }
  }
}
</style>
