<template>
  <!-- 订单卡片 -->
  <div class="order-card-container">
    <div class="order-card-wrapper">
      <div class="top-order-num-container">
        <div class="top-order-num-wrapper">
          <div class="order-num">订单编号:{{ item.order_no }}</div>
          <div class="order-status">
            {{ orderStateEmun[item.status] }}
          </div>
        </div>
      </div>
      <div class="bottom-info-container">
        <div class="bottom-info-wrapper">
          <div class="order-img-container" @click="rechargeOrder">
            <img :src="imgUrl" alt="" />
          </div>
          <div class="order-info-container">
            <div class="title-container">{{ item.goods_name }}</div>
            <div class="order-time-container">
              下单时间:{{ item.created_at }}
            </div>

            <!-- <div class="btn-container">
              <div
                class="cancel-btn-container"
                v-if="this.item.OrState == 0"
                @click.stop="openPayOrderDialogFromFather"
              >
                取消订单
              </div>

              <div
                class="pay-btn-container"
                v-if="this.item.OrState == 0"
                @click.stop="payOrder"
              >
                立即支付
              </div>
            </div> -->

            <div class="compelete-time-container">
              <!-- v-if="this.item.completeTime !== '-:-:-'" -->
              完成时间:{{ item.end_time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { rechargeOrderAPI } from '@/api/recharge/recharge';
import { orderStateEmun } from '@/utils/emunUtils';
//   import { orderPayAPI, cancelOrderPayAPI } from '@/api/order/order';
import { mapState } from 'vuex';
export default {
  name: 'emptyTicketTips',
  props: {
    item: {
      type: Object,
      default: () => {
        null;
      },
    },
  },

  //变量区
  data() {
    return {
      orderStateEmun,
      imgUrl: require('@/assets/img/phone-ticket-img.png'),
    };
  },

  computed: {
    ...mapState({ item_code: (state) => state.item_code }),
  },

  //生命周期区
  mounted() {
    // console.log('测试一下');
    // console.log(this.$store);
    // this.JKTest();
    // console.log(this.item);
    // console.warn(orderStateEmun[this.item.OrState]);
    //   this.detectGoodsType();
  },
  //方法区
  methods: {
    JKTest() {
      console.log('测试一下');
    },
    navToPage(path) {
      this.$router.push('/' + path);
    },

    //兑换道具的子函数，兑换完道具 开启充值订单
    rechargeOrder() {
      let itemCode = this.item_code;
      // 充值的手机号
      let accno = this.item.user_tel;
      let type = '1';
      let orderGoodsNo = this.item?.p_list[0]?.order_goods_no;
      let payload = {
        item_code: itemCode,
        accno: accno,
        type: type,
        order_goods_no: orderGoodsNo,
      };
      rechargeOrderAPI(payload).then((res) => {
        console.log(res);
      });
    },

    //检测商品的类型
    //   detectGoodsType() {
    //     //   console.log(this.item);
    //     //我们用商品的编号来判别商品的类型
    //     let goodsNo = this.item.goods.goods_no.toString();
    //     let goodsNoFormat = goodsNo.slice(0, 2);
    //     //   console.log(goodsNoFormat);
    //     //话费
    //     if (goodsNoFormat == 10) {
    //       // console.log('话费');
    //       this.imgUrl = require('@/assets/img/recharge-img.png');
    //     }
    //     //油卡
    //     if (goodsNoFormat == 12) {
    //       // console.log('油卡');

    //       this.imgUrl = require('@/assets/img/fuel-card-img.png');
    //     }
    //     if (goodsNoFormat == 15) {
    //       // console.log('礼品卡');

    //       this.imgUrl = require('@/assets/img/jd-e-card-img.png');
    //     }
    //   },

    // 网络请求
    //   payOrder() {
    //     let orderSN = this.item.OrSn;
    //     let callbackHtml = '/zebz/index.html#/index';
    //     let payload = { order_sn: orderSN, callback_html: callbackHtml };

    //     orderPayAPI(payload).then((res) => {
    //       // console.log(res);
    //       if (res.code == 0) {
    //         window.location.href = res.data.pay_url;
    //         sessionStorage.setItem('isFreshRouter', true);
    //       } else {
    //         this.$toast({ message: res.msg, duration: 1500 });
    //       }
    //     });

    //     // console.log(orderSN);
    //   },
    //   cancelPayOrder() {
    //     let orderSN = this.item.OrSn;

    //     let payload = { order_sn: orderSN };

    //     cancelOrderPayAPI(payload).then((res) => {
    //       // console.log(res);

    //       //如果取消订单成功就刷新页面
    //       if (res.code == 0) {
    //         this.$emit('refreshPageFromFather', '');
    //         this.$toast({ message: '订单取消成功', duration: 1500 });
    //         //   window.location.href = res.data.pay_url;
    //         //   sessionStorage.setItem('isFreshRouter', true);
    //       } else {
    //         this.$toast({ message: res.msg, duration: 1500 });
    //       }
    //     });

    //     // console.log(orderSN);
    //   },
    //   openPayOrderDialogFromFather(){
    //       let orderSN = this.item.OrSn;
    //       this.$emit('openCancelOrderDialogFromFather',orderSN)
    //   }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';
// 订单卡片容器
.order-card-container {
  //   width: calc(711 / 75) + rem;
  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;

  justify-content: center;

  padding-top: calc(21 / 75) + rem;

  width: 100vw;
  /* height: calc(247 / 75) + rem; */
  height: fit-content !important;
  .order-card-wrapper {
    position: relative;

    display: flex;
    flex-direction: column;

    width: calc(690 / 75) + rem;
    height: 100%;

    background: #ffffff;
    /* box-shadow: 0px calc(4 / 75) + rem calc(16 / 75) + rem 0px
        rgba(136, 136, 136, 0.1); */
    border-radius: calc(20 / 75) + rem;
    .top-order-num-container {
      position: relative;
      display: flex;
      justify-content: center;

      height: calc(55 / 75) + rem;
      width: 100%;
      white-space: nowrap;
      .top-order-num-wrapper {
        position: relative;

        display: flex;

        width: calc(646 / 75) + rem;
        border-bottom: calc(2 / 75) + rem solid #f5f5f5;

        justify-content: space-between;
        .order-num {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          font-size: calc(24 * $font-size-scale / 75) + rem;
          font-family: Source Han Sans SC;
          font-weight: 400;
          color: #666666;
        }
        .order-status {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          font-size: calc(24 * $font-size-scale / 75) + rem;
          font-family: Source Han Sans SC;
          font-weight: 400;
          color: #ff3101;
        }
      }
    }
    .bottom-info-container {
      box-sizing: border-box;

      position: relative;
      display: flex;
      flex-direction: row;

      /* height: calc(171 / 75) + rem; */
      height: fit-content;
      width: 100%;

      //   padding-top: calc(32 / 75) + rem;
      .bottom-info-wrapper {
        position: relative;
        height: 100%;

        display: flex;
        flex-direction: row;
        .order-img-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          width: calc(162 / 75) + rem;
          height: calc(171 / 75) + rem;

          /* height: 100%; */
          flex-shrink: 0;

          img {
            /* margin-top: calc(39 / 75) + rem; */
            height: calc(93 / 75) + rem;
          }
        }
        .order-info-container {
          position: relative;
          display: flex;
          flex-direction: column;
          width: calc(503 / 75) + rem;

          justify-content: space-around;

          height: 100%;
          .title-container {
            position: relative;
            font-size: calc(28 * $font-size-scale / 75) + rem;
            font-family: Source Han Sans SC;
            font-weight: bold;
            color: #333333;
            flex: 0.5;

            display: flex;
            align-items: center;
            /* margin-top: calc(32 / 75) + rem; */
          }
          .order-time-container {
            position: relative;
            font-size: calc(24 * $font-size-scale / 75) + rem;
            font-family: Source Han Sans SC;
            font-weight: 400;
            color: #999999;

            flex: 0.25;
            /* margin-top: calc(21 / 75) + rem; */
          }
          .btn-container {
            position: relative;

            display: flex;
            justify-content: flex-end;
            height: fit-content;

            margin-top: calc(15 / 75) + rem;
            margin-bottom: calc(15 / 75) + rem;
            .cancel-btn-container {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;

              width: calc(145 / 75) + rem;
              height: calc(56 / 75) + rem;
              background: green;
              /* box-shadow: 0px calc(5 / 75) + rem calc(10 / 75) + rem 0px
          rgba(246, 92, 52, 0.3); */
              border-radius: calc(28 / 75) + rem;

              font-size: calc(26 * $font-size-scale / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: bold;
              color: #ffffff;

              margin-right: calc(15 / 75) + rem;
            }
            .pay-btn-container {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;

              width: calc(145 / 75) + rem;
              height: calc(56 / 75) + rem;
              background: #f65c34;
              /* box-shadow: 0px calc(5 / 75) + rem calc(10 / 75) + rem 0px
          rgba(246, 92, 52, 0.3); */
              border-radius: calc(28 / 75) + rem;

              font-size: calc(26 * $font-size-scale / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: bold;
              color: #ffffff;
              margin-right: calc(10 / 75) + rem;
            }
          }

          .compelete-time-container {
            position: relative;
            font-size: calc(24 * $font-size-scale / 75) + rem;
            font-family: Source Han Sans SC;
            color: #999999;
            font-weight: 400;

            flex: 0.25;
            /* margin-top: calc(15 / 75) + rem; */
          }
        }
      }
    }

    // 兼容iphone5
    @media screen and (device-aspect-ratio: 40/71) {
      .pay-btn-container {
        //   55 +20
        top: calc(75 / 75) + rem !important;
      }
    }
  }
}
</style>
