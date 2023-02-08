<template>
  <!-- 商品卡片 -->
  <div class="good-card-wrapper">
    <div class="goods-card-container">
      <!-- 左边的图片 -->
      <div class="left-img-container">
        <div class="left-img-wrapper">
          <img :src="imgUrl" alt="" />
        </div>
      </div>
      <!-- 右边的信息 -->
      <div class="right-info-container">
        <div class="right-info-wrapper">
          <div class="top-text-container">
            <div class="title-text">{{ item.goods_name }}</div>
            <div class="info-text">{{ info }}</div>
          </div>

          <div class="bottom-price-container">
            <!-- 改 -->
            <div class="stock">库存:{{ item.stock }}</div>
            <div class="price-container">
              <!-- 折扣后的价格 -->
              <div class="discount-price">
                ¥{{
                  (disCountTypeEmun[item.discount_type] * item.goods_price) /
                  100
                }}
              </div>

              <!-- 原始价格 -->
              <div class="origin-price">¥{{ item.goods_price / 100 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { disCountTypeEmun } from '@/utils/emunUtils';

export default {
  name: 'goodsCard',
  components: {},
  props: {
    price: {
      type: String,
      default: '100',
    },
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
      test: '123',
      imgUrl: require('@/assets/img/recharge-img.png'),
      info: '中国移动、中国联通、中国电信',
      disCountTypeEmun,
    };
  },
  //生命周期区
  mounted() {
    // this.JKTest();

    this.detectGoodsType();
  },

  //方法区
  methods: {
    JKTest() {
      console.log('测试一下');
    },
    //检测商品的类型
    detectGoodsType() {
      //   console.log(this.item);
      //我们用商品的编号来判别商品的类型
      let goodsNo = this.item.goods_no.toString();
      let goodsNoFormat = goodsNo.slice(0, 2);
      //   console.log(goodsNoFormat);
      //话费
      if (goodsNoFormat == 10) {
        // console.log('话费');
        this.imgUrl = require('@/assets/img/recharge-img.png');
        this.info = '中国移动、中国联通、中国电信';
      }
      //油卡
      if (goodsNoFormat == 12) {
        // console.log('油卡');

        this.imgUrl = require('@/assets/img/fuel-card-img.png');
        this.info = this.item.goods_name;
      }
      if (goodsNoFormat == 15) {
        this.imgUrl = require('@/assets/img/jd-e-card-img.png');

        // console.log('礼品卡');
        this.info = this.item.goods_name;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';
.good-card-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(694 / 75) + rem;
  height: calc(252 / 75) + rem;

  background-image: url('@/assets/img/goods-card-bg-img.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .goods-card-container {
    position: relative;
    display: flex;

    width: calc(664 / 75) + rem;
    height: calc(219 / 75) + rem;
    background: #ffffff;
    /* box-shadow: calc(2 / 75) + rem calc(5 / 75) + rem calc(8 / 75) + rem
      calc(1 / 75) + rem rgba(181, 181, 181, 0.13); */
    border-radius: calc(10 / 75) + rem;

    .left-img-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      width: calc(320 / 75) + rem;
      height: 100%;

      .left-img-wrapper {
        position: relative;
        display: flex;
        width: calc(286 / 75) + rem;
        height: calc(164 / 75) + rem;

        img {
          height: 100%;
          border-radius: calc(4 / 75) + rem;
        }
      }
    }

    .right-info-container {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;

      width: calc(344 / 75) + rem;
      height: 100%;

      .right-info-wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;

        width: calc(344 / 75) + rem;
        height: calc(164 / 75) + rem;

        //   padding-right: calc(17 / 75) + rem;

        .top-text-container {
          position: relative;
          height: calc(121 / 75) + rem;
          width: 100%;

          .title-text {
            font-size: calc(28 * $font-size-scale / 75) + rem;
            font-family: Source Han Sans SC;
            font-weight: bold;
            color: #333333;
          }

          .info-text {
            margin-top: calc(22 / 75) + rem;

            //   white-space: nowrap;

            overflow: hidden;
            text-overflow: ellipsis; //当对象内文本溢出时显示省略标记
            display: -webkit-box;
            -webkit-line-clamp: 2; //这边的2指的是两行
            -webkit-box-orient: vertical;

            font-size: calc(24 * $font-size-scale / 75) + rem;
            font-family: Source Han Sans SC;
            font-weight: 400;
            color: #969696;
          }
        }

        .bottom-price-container {
          position: relative;
          box-sizing: border-box;
          height: calc(42 / 75) + rem;
          width: 100%;
          padding-right: calc(17 / 75) + rem;

          top: calc(25 / 75) + rem;

          display: flex;

          // justify-content: flex-end;
          justify-content: space-between;
          // 改
          align-items: center;

          font-size: calc(33 / 75) + rem;
          font-family: Source Han Sans SC;
          font-weight: bold;
          color: #f9592b;
          /* background: linear-gradient(0deg, #ff7e3c 0%, #f2280d 99.31640625%);
          -webkit-background: linear-gradient(
            0deg,
            #ff7e3c 0%,
            #f2280d 99.31640625%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: contain;
          color: transparent;

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; */

          font-weight: 900;

          .stock {
            font-size: calc(28 / 75) + rem;
          }
          .price-container {
            position: relative;
            display: flex;
            flex-direction: row;

            .discount-price {
              font-size: calc(33 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: bold;
              color: black;

              margin-right: calc(5 / 75) + rem;
            }

            .origin-price {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: bold;
              color: #f9592b;

              text-decoration: line-through;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>
