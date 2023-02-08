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
        <div class="content">
          <!-- 对话框 -->

          <JKComfirmDialog
            ref="dialog"
            dialogWidth="580"
            dialogHeight="516"
            leftButtonText="取消"
            rightButtonText="确认并提交"
            @confirmFromFather="addUserWhiteList"
          >
            <div class="dialog-content-container" slot="content">
              <div class="dialog-content">
                <div class="top-title-container">
                  <div class="dialog-title-text-container">
                    <span>白名单录入</span>
                    <span>(商户大拜访活动)</span>
                  </div>
                </div>
                <div class="bottom-content-container">
                  <!-- 手机号码容器 -->

                  <div class="phone-num-container">
                    <div class="input-prefix-container">
                      <div class="prefix-img"></div>
                    </div>
                    <input
                      class="phone-input"
                      type="text"
                      v-model="phoneNum"
                      :placeholder="'请输入手机号码'"
                      :maxlength="11"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      @blur="blur"
                      @focus="focus"
                    />
                  </div>

                  <!-- 话费金额容器 -->
                  <div class="money-num-container">
                    <div class="input-prefix-container">
                      <div class="prefix-img"></div>
                    </div>

                    <div class="money-input-container">
                      <!-- <input
                        type="text"
                        class="money-input"
                        v-model="phoneNumConfirm"
                        :placeholder="'请选择话费金额'"
                        :maxlength="11"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        @blur="blur"
                        @focus="focus"
                      /> -->

                      <div
                        :class="
                          currentGoodId
                            ? 'money-container '
                            : 'money-container not-select'
                        "
                        @click.prevent="clickSelect"
                      >
                        {{
                          currentGoodId
                            ? goodsNameEmun[currentGoodId]
                            : '请选择话费金额'
                        }}
                      </div>

                      <div
                        class="drop-down-container"
                        @click.prevent="clickSelect"
                      >
                        <img src="@/assets/img/drop-down-img.png" />

                        <!-- 下拉框 -->
                        <div
                          :class="
                            isShowSelectList == true
                              ? 'options-list-active'
                              : 'options-list'
                          "
                        >
                          <div
                            class="option"
                            v-for="item in goodsList"
                            :key="item.id"
                            @click.prevent="clickOption(item.id)"
                          >
                            {{ goodsNameEmun[item.id] }}
                          </div>
                        </div>
                        <!-- 下拉框止 -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </JKComfirmDialog>

          <!-- 删除订单 专用Dialog -->
          <JKDialog
            ref="cancelOrderDialog"
            dialogWidth="560"
            dialogHeight="240"
            leftButtonText="取消"
            rightButtonText="确定"
            :isShowBtn="true"
            @confirmFromFather="deleteBatchList"
          >
            <div slot="content" class="recharge-confirm-container">
              <div class="confirm-title-container">是否删除该数据</div>
            </div>
          </JKDialog>

          <!-- 头部的录入导航栏 -->
          <div class="header-register-container">
            <div class="header-register-wrapper">
              <div class="title">商户大拜访活动</div>
              <div class="register-button-container">
                <div class="register-button-wrapper">
                  <div class="prefix-img"></div>
                  <div class="button-text" @click="activeDialog">点击录入</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 显示区 -->
          <div class="content-register-container">
            <div class="content-register-wrapper">
              <!-- 表格头部 -->
              <div class="tb-title-container">
                <div class="phone-title">手机号</div>
                <div class="money-title">话费金额</div>
                <div class="time-title">时间</div>
                <div class="operate-title">操作</div>
              </div>

              <!-- 用intersection-observer 下拉加载 -->
              <div class="tb-content-container" ref="scollElement">
                <div class="tb-content-wrapper">
                  <whiteListItem
                    v-for="item in orderList"
                    :key="item.id"
                    :item="item"
                    @clickDeleteBtnFromFather="openCancelOrderDialog"
                  ></whiteListItem>

                  <div
                    ref="endBox"
                    :class="isEnd ? 'end-container decorate' : 'end-container'"
                    @click="onLoadOrderList"
                  >
                    {{ isEnd ? '到底了' : '下拉更新更多' }}
                  </div>
                </div>
              </div>

              <!-- 用scroll事件做的下拉加载 -->
              <!-- <div
                class="tb-content-container"
                ref="scollElement"
                @scroll="scrollContainer"
              >
                <div class="tb-content-wrapper" ref="contentBoxDom">
                  <whiteListItem
                    @clickDeleteBtnFromFather="openCancelOrderDialog"
                    ref="cellRef"
                  ></whiteListItem>
                  <whiteListItem></whiteListItem>
                  <whiteListItem></whiteListItem>
                  <whiteListItem></whiteListItem>
                  <whiteListItem></whiteListItem>
                  <whiteListItem></whiteListItem>
                  <whiteListItem></whiteListItem>
                  <whiteListItem></whiteListItem>
                  <whiteListItem></whiteListItem>
                  <whiteListItem></whiteListItem>
                  <whiteListItem></whiteListItem>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="foot-container">
        <div class="foot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import 'intersection-observer';

import {
  getBatchListAPI,
  addBatchListAPI,
  deleteBatchListAPI,
} from '@/api/whiteList/whiteList';
import { getOrderListAPI } from '@/api/order/order';

import { goodsNameEmun } from '@/utils/emunUtils';

import whiteListItem from '@/components/white-list/white-list-item/whiteListItem.vue';
import JKComfirmDialog from '@/components/common/JK-comfirm-dialog/JKComfirmDialog.vue';
import JKDialog from '@/components/common/JK-dialog/JKDialog.vue';

export default {
  name: 'whiteList',
  components: {
    whiteListItem,
    JKComfirmDialog,
    JKDialog,
  },
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
      phoneNum: '',

      isShowSelectList: false, //是否显示下拉框
      oilCardList: ['30元', '50元'], //油卡记录列表

      orderList: [],

      goodsList: [], //里面的商品列表
      goodsNameEmun, //根据id格式话商品名字
      currentGoodId: null, //当前选中的商品id
      currentDeleteGoodId: null, //当前选中要删除的商品id

      //   订单查询的所需的参数
      orderPayload: {
        roster_batch_code: null, //要查询的白名单的id
        roster_status: 1,
        page: 1,
        page_size: 15,
      },
      batchCode: null,
      orderListTotal: 0, //订单总数
      isEnd: false, //是否已经完结
      isInit: false, //是否是第一次加载
    };
  },
  //生命周期区
  mounted() {
    // 获取名单的code,获取code后拿到订单列表
    this.getBatchList();

    // 设置可以滚动的Box
    this.scrollBoxIOS(this.$refs.scollElement);

    // // console.log(this.$store);
    // // this.JKTest();
    const io = new IntersectionObserver(
      (entries) => {
        //entries[0].isIntersecting
        //isIntersecting 元素是否在可视范围内
        if (entries[0].isIntersecting) {
          console.log(entries);
          console.log('发现该元素');
          console.log(this.$refs.scollElement.scrollTop);

          //触发加载
          this.onLoadOrderList();
        }
      },
      //   threshold 数字越大 越往下越触发，触发的距离是threshold的值* 元素高度
      //   尽量就调整到0.5左右即可
      { threshold: [0.5] }
    );
    if (this.$refs.endBox) {
      io.observe(this.$refs.endBox);
    }


    this.$once('hook:beforeDestroy', () => {
      console.log('离开触发');
      // 停止观察
      io.unobserve(this.$refs.endBox);
      //   清空滑动元素监听
      this.$refs.scollElement.removeEventListener(
        'touchmove',
        this.boxRefTouchMoveFun
      );
      // 清空页面元素监听
      document.body.removeEventListener('touchmove', this.bodyTouchMoveFun); //passive防止阻止默认事件不生效
    });
  },
  //方法区
  methods: {
    JKTest() {
      console.log('测试一下');
    },
    //  激活对话框
    activeDialog() {
      //重置输入的数值
      this.phoneNum = '';
      // 充值选中的商品id
      this.currentGoodId = null;

      //重置 是否显示下拉框
      this.isShowSelectList = false;

      //   console.log(this.$refs.dialog);
      this.$refs.dialog.changeIsDialogShowState(true);
    },
    //打开删除的对话框
    openCancelOrderDialog(payload) {
      this.$refs.cancelOrderDialog.changeIsDialogShowState(true);
      //   console.error(payload);
      let payloadFromChild = payload;
      this.currentDeleteGoodId = payloadFromChild;
    },

    blur() {
      document.body.scrollTop = this.scrollTop;
    },
    focus() {
      this.scrollTop = document.body.scrollTop;
      //关闭对应的选择列表
      this.isShowSelectList = false;
    },

    scrollBoxIOS(boxRef) {
      //   window.navigator.userAgent.toLowerCase().indexOf('iphone') !== -1; //判断是否为ios

      if (window.navigator.userAgent.toLowerCase().indexOf('iphone') !== -1) {
        //el需要滑动的元素
        boxRef.addEventListener('touchmove', this.boxRefTouchMoveFun);

        document.body.addEventListener('touchmove', this.bodyTouchMoveFun, {
          passive: false,
        }); //passive防止阻止默认事件不生效
      }
    },
    // scrollBoxIOS的子函数 用于标记要滚动的元素
    boxRefTouchMoveFun(e) {
      e.isSCROLL = true;
    },
    // scrollBoxIOS的子函数 用于禁止全局滚动
    bodyTouchMoveFun(e) {
      if (!e.isSCROLL) {
        e.preventDefault(); //阻止默认事件(上下滑动)
      } else {
        //需要滑动的区域
        var top = this.$refs.scollElement.scrollTop; //对象最顶端和窗口最顶端之间的距离
        var scrollH = this.$refs.scollElement.scrollHeight; //含滚动内容的元素大小
        var offsetH = this.$refs.scollElement.offsetHeight; //网页可见区域高
        var cScroll = top + offsetH; //当前滚动的距离

        //被滑动到最上方和最下方的时候
        if (top == 0) {
          top = 1; //0～1之间的小数会被当成0
        } else if (cScroll === scrollH) {
          this.$refs.scollElement.scrollTop = top - 0.1;
        }
      }
    },

    // 选择下拉框的按钮
    clickSelect() {
      let isShowSelectList = this.isShowSelectList;
      this.isShowSelectList = !isShowSelectList;
    },
    //点击下拉框的选项
    clickOption(id) {
      // 传入点击的id
      this.currentGoodId = id;
      //   console.log(this.currentGoodId, this.goodsNameEmun[this.currentGoodId]);
    },

    //滚动盒子()
    scrollContainer(e) {
      console.log(this.$refs.scollElement.scrollTop);
      let scrollTop = this.$refs.scollElement.scrollTop;

      //所有元素的总高度
      //   let totalScrollTop = this.cellHeight * this.list.length;

      let cellHeight = this.$refs.cellRef.$el.clientHeight;
      console.log(this.$refs.cellRef.$el);
      let totalScrollTop = cellHeight * 11;

      //最外层的盒子
      let containerDomRef = this.$refs.scollElement;
      //最外层盒子的高度
      let containerDomHeight = containerDomRef.clientHeight;

      // 最大滚动的高度  + 最外部盒子的高度  = 所有元素的总高度/显示盒子的高度
      //换句话说我们要实现滚动条触底加载
      // 滚动高度 + 窗口高 大于等于 文档高   时就是 滚动条到底的时候
      if (scrollTop + containerDomHeight >= totalScrollTop) {
        console.log('触底');
        // console.log(this.list);
        // let pushArr = new Array(200).fill(0).map((item, index) => ('内容' + (index + 1)))
        // this.list = pushArr
        // //重新计算盒子的高度

        // let contentBoxDomRef = this.$refs.contentBoxDom

        // contentBoxDomRef.style.height = this.cellHeight * this.list.length + 'px'
      }

      // if (scrollTop == 0) {
      // 	console.log('执行刷新')
      // }

      // console.log(totalScrollTop, this.cellHeight);

      // 滚动的距离 / 单个元素的高度 =显示的 第一个元素的Index
      // -2 是因为我们多渲染了两条数据
      // let startIndex = Math.floor(scrollTop / this.cellHeight) - 2
      // console.error(startIndex)

      // 可视区域最后一行索引(+4: 往下多渲染两条数据(要算上上面的-2))
      //一个最后Index  = 开始的索引  +  可在容器展示的数据
      // let endIndex = startIndex + this.showCount + 4

      // 获取需要渲染的数据
      // this.showList = []
      // for (let i = startIndex; i < endIndex; i++) {
      // 	this.showList.push({
      // 		data: this.list[i],
      // 		// 算好每个元素需要的top值
      // 		top: i * this.cellHeight + 'px'
      // 	})
      // }
    },

    //获取名单批次列表
    getBatchList() {
      getBatchListAPI().then((res) => {
        console.log(res);
        if (res.code == 0) {
          // 格式化拿到的list
          let batchList = res.data.list;
          batchList = batchList.filter((item) => {
            return item.id == 21;
          });
          this.orderPayload.roster_batch_code = batchList[0].roster_batch_code;
          this.batchCode = batchList[0].roster_batch_code;
          console.log(this.orderPayload);

          //   存入该活动有的商品
          this.goodsList = batchList[0].give_content_data;

          //   获取订单详情
          this.getOrderList();
        } else {
          this.$toast({ message: res.msg, duration: 1500 });
        }
      });
    },

    // 获取名单批次列表后拿到 roster_batch_code ，用roster_batch_code获取订单列表
    // 名单批次列表 的子函数  获取订单列表
    getOrderList() {
      let payload = this.orderPayload;
      getOrderListAPI(payload).then((res) => {
        console.log(res);

        this.isInit = true; //是否初始化

        this.orderList = res.data.list;
        // 订单总数
        this.orderListTotal = res.data.totalRow;

        // 如果第一页都不够页面尺寸，也就不需要下拉加载了
        if (this.orderPayload.page == 1) {
          if (this.orderListTotal < this.orderPayload.page_size) {
            this.isEnd = true;
          }
        }
      });
    },

    //添加用户到白名单
    addUserWhiteList() {
      let batchCode = this.batchCode;
      let phoneNum = this.phoneNum;
      let currentGoodId = this.currentGoodId;

      if (!phoneNum || phoneNum.length == 0) {
        this.$toast({ message: '请输入手机号', duration: 1500 });
        return;
      }

      if (!currentGoodId || currentGoodId.length == 0) {
        this.$toast({ message: '请选择话费金额', duration: 1500 });
        return;
      }

      //   setting 待删除
      let payload = {
        roster_batch_code: batchCode,
        roster_status: 1,
        content: phoneNum,
        gift_thing_id: currentGoodId,
        setting: 'test',
      };

      addBatchListAPI(payload).then((res) => {
        if (res.code == 0) {
          this.$toast({ message: '添加成功', duration: 1500 });
          //    删除成功后重置数据
          this.resetBatchList();
        } else {
          this.$toast({ message: res.msg, duration: 1500 });
        }
      });
    },
    // 删除用户 在白名单中
    deleteBatchList() {
      let batchCode = this.batchCode;
      let currentDeleteGoodId = this.currentDeleteGoodId;
      let payload = {
        roster_batch_code: batchCode,
        id: currentDeleteGoodId,
      };

      deleteBatchListAPI(payload).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.$toast({ message: '删除成功', duration: 1500 });
          //    删除成功后重置数据
          this.resetBatchList();
        } else {
          this.$toast({ message: res.msg, duration: 1500 });
        }
      });
    },
    // deleteBatchList 的子函数  重置列表数据
    resetBatchList() {
      this.orderPayload.page = 1;
      //   滚动回顶部
      this.$refs.scollElement.scrollTop = 0;

      // 重置End状态
      this.isEnd = false;

      //   重新获取列表信息
      this.getOrderList();
    },

    onLoadOrderList() {
      if (!this.isInit) {
        console.log('还未初始化，不触发加载');
        return;
      }

      if (this.isEnd) {
        console.log('已经没有数据');
        return;
      }

      console.log('触发加载');

      let orderListTotal = this.orderListTotal;

      console.log(orderListTotal, this.orderList.length);

      if (this.orderList.length < orderListTotal) {
        // 是否已经完结了
        this.isEnd = false;

        this.orderPayload.page = this.orderPayload.page + 1;

        //进行请求
        getOrderListAPI(this.orderPayload).then((res) => {
          //   console.log(res);
          if (res.code == 0) {
            this.orderList = this.orderList.concat(res.data.list);

            if (res.data.list.length < this.orderPayload.page_size) {
              this.isEnd = true;
            }
          } else {
            this.$toast({ message: res.msg, duration: 1500 });
          }
        });
      } else {
        this.isEnd = true;
        console.log('完结');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* 下拉框 */
.select-menu {
  width: 300px;
  /* cursor: pointer; */
  position: relative;
}
.select {
  background-color: #201e1e;
  padding: 20px;
  color: #fff;
  font-weight: 500;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.options-list {
  position: absolute;
  /* width: 100%; */

  width: calc(466 / 75) + rem;

  background-color: #f9f9f9;
  border-radius: 6px;
  margin-top: 6px;
  /* padding: 0 20px; */
  max-height: calc(120 / 75) + rem;
  overflow-y: auto;

  -webkit-overflow-scrolling: touch;

  /* transition: 0.4s linear 0.2s; */
  height: 0;

  display: none;
}
.options-list-active {
  top: 100%;

  position: absolute;
  /* width: calc(466 / 75) + rem; */

  border: 1px solid #238674;

  background-color: #ffffff;
  border-radius: calc(4 / 75) + rem;
  margin-top: 6px;
  /* padding: 0 20px; */
  max-height: calc(120 / 75) + rem;
  overflow-y: auto;

  -webkit-overflow-scrolling: touch;

  /* transition: 0.4s linear 0.2s; */
  /* height: 180px; */
  height: calc(120 / 75) + rem;

  display: block;

  z-index: 99;
  right: -50%;

  /* background-image: url('@/assets/img/drop-down-bgc.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center; */
}

.option {
  padding: 8px 0;

  width: calc(133 / 75) + rem;
  font-size: 15px;
  white-space: nowrap;

  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #333333;

  /* transition: 0.3s ease-in-out; */

  -webkit-user-select: none;

  text-align: center;
}
.option:hover,
.option.selected {
  background: #d3e7e3;
  color: #333333;
}
/* .options-list::-webkit-scrollbar {
  width: 4px;
  background-color: #eee;
}
.options-list::-webkit-scrollbar-thumb {
  background-color: #00a8ff;
} */

/* 下拉框止 */

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
      position: relative;
      flex: 1;
      .content {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /* 头部录入 */
        .header-register-container {
          flex-shrink: 0;

          box-sizing: border-box;
          position: relative;
          height: calc(88 / 75) + rem;
          width: 100vw;
          background-color: white;

          display: flex;
          flex-direction: row;
          padding-left: calc(60 / 75) + rem;
          padding-right: calc(60 / 75) + rem;
          .header-register-wrapper {
            position: relative;
            display: flex;
            flex-direction: row;

            justify-content: space-between;

            width: 100%;
            height: 100%;
            .title {
              position: relative;
              display: flex;

              justify-content: center;
              align-items: center;

              font-size: 16px;
              font-family: Source Han Sans CN;
              font-weight: 500;
              color: #666666;
            }
            .register-button-container {
              position: relative;
              display: flex;
              flex-direction: row;

              padding-top: calc(10 / 75) + rem;
              padding-bottom: calc(10 / 75) + rem;

              min-width: calc(156 / 75) + rem;
              .register-button-wrapper {
                position: relative;
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: row;

                justify-content: space-around;
                align-items: center;

                background-color: #238674;

                border-radius: calc(10 / 75) + rem;

                .prefix-img {
                  position: relative;
                  width: calc(24 / 75) + rem;
                  height: calc(28 / 75) + rem;

                  background-image: url('@/assets/img/register-img.png');
                  background-size: 100% 100%;
                  background-position: center center;
                  background-repeat: no-repeat;
                }

                .button-text {
                  position: relative;
                  display: flex;

                  justify-content: center;
                  align-items: center;

                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  color: white;
                }
              }
            }
          }
        }
        /* 录入表格的容器 */
        .content-register-container {
          box-sizing: border-box;

          position: relative;
          display: flex;
          flex-direction: column;

          padding-left: calc(30 / 75) + rem;
          padding-right: calc(30 / 75) + rem;

          padding-top: calc(20 / 75) + rem;

          height: 100%;
          width: 100%;

          .content-register-wrapper {
            position: relative;
            /* height: 100%; */
            height: fit-content;
            width: 100%;
            display: flex;
            flex-direction: column;

            border-radius: calc(20 / 75) + rem;

            background-color: white;

            overflow-x: hidden;
            /* 表格头部 */
            .tb-title-container {
              flex-shrink: 0;

              position: relative;
              width: 100%;
              display: flex;
              flex-direction: row;
              height: calc(88 / 75) + rem;
              background-color: #238674;

              font-size: 16px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #ffffff;

              .phone-title {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;

                flex: 0.25;
              }
              .money-title {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;

                flex: 0.25;
              }
              .time-title {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;

                flex: 0.3;
              }
              .operate-title {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;

                flex: 0.2;
              }
            }

            /*  表格内容*/
            .tb-content-container {
              position: relative;
              max-height: 80vh;
              height: fit-content;
              /* height: 150px; */
              overflow-y: auto;

              -webkit-overflow-scrolling: touch;

              .tb-content-wrapper {
                position: relative;
                display: flex;
                flex-direction: column;
                width: 100%;
                height: fit-content;
                .end-container {
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  height: 5vh;

                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  color: #999999;
                }
                /* 前后两个装饰线 */
                .decorate {
                  &::before {
                    content: '';
                    border-bottom: 1px solid #999999;
                    transform: scaleY(0.5) translateY(-50%);
                    width: calc(124 / 75) + rem;
                    margin-right: calc(5 / 75) + rem;
                  }
                  &::after {
                    content: '';
                    border-bottom: 1px solid #999999;
                    transform: scaleY(0.5) translateY(-50%);

                    width: calc(124 / 75) + rem;
                    margin-left: calc(5 / 75) + rem;
                  }
                }
              }
            }
          }
        }
      }

      //录入的对话框
      .dialog-content-container {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;

        .dialog-content {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          .top-title-container {
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            height: calc(120 / 75) + rem;
            width: 100%;

            /* padding-top: calc(49 / 75) + rem; */

            .dialog-title-text-container {
              font-size: calc(36 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: bold;
              color: #000000;

              display: flex;
              flex-direction: column;
              justify-content: center;
              span {
                text-align: center;
              }
            }
          }
          .bottom-content-container {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            padding-left: calc(22 / 75) + rem;
            padding-right: calc(22 / 75) + rem;

            height: 100%;
            .phone-num-container {
              position: relative;
              height: calc(90 / 75) + rem;
              display: flex;
              flex-direction: row;

              border-bottom: 1px solid #f0f0f0;

              .input-prefix-container {
                position: relative;
                height: 100%;
                width: calc(55 / 75) + rem;

                display: flex;
                justify-content: center;
                align-items: center;
                .prefix-img {
                  width: calc(20 / 75) + rem;
                  height: calc(32 / 75) + rem;
                  background-image: url('@/assets/img/phone-input-img.png');
                  background-repeat: no-repeat;
                  background-position: center center;
                  background-size: 100% 100%;
                }
              }

              input {
                width: 100%;
                height: 100%;
                /* border: calc(1 / 75) + rem solid #bfbfbf; */
                border-radius: calc(2 / 75) + rem;

                font-size: calc(32 / 75) + rem;

                /* padding: 0 calc(20 / 75) + rem; */
                /* padding-left: calc(55 / 75) + rem; */

                box-sizing: border-box;
                color: #000000;
              }

              input::placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }

              .input::-webkit-input-placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }

              /* WebKit, Blink, Edge */
              .input::-moz-placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }

              /* Mozilla Firefox 4 to 18 */
              .input::-moz-placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }

              /* Mozilla Firefox 19+ */
              .input::-ms-input-placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }

              /* Internet Explorer 10-11 */
              .input::-ms-input-placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }
            }

            .money-num-container {
              position: relative;
              height: calc(90 / 75) + rem;
              display: flex;
              flex-direction: row;

              border-bottom: 1px solid #f0f0f0;

              .input-prefix-container {
                position: relative;
                height: 100%;
                width: calc(55 / 75) + rem;

                display: flex;
                justify-content: center;
                align-items: center;
                .prefix-img {
                  width: calc(24 / 75) + rem;
                  height: calc(29 / 75) + rem;
                  background-image: url('@/assets/img/money-input-img.png');
                  background-repeat: no-repeat;
                  background-position: center center;
                  background-size: 100% 100%;
                }
              }

              .money-input-container {
                position: relative;
                display: flex;
                flex-direction: row;

                width: 100%;
                height: 100%;

                .money-container {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;

                  /* border: calc(1 / 75) + rem solid #bfbfbf; */
                  /* border-radius: calc(2 / 75) + rem; */

                  /* padding: 0 calc(20 / 75) + rem; */
                  /* padding-left: calc(55 / 75) + rem; */

                  box-sizing: border-box;
                  color: #000000;
                  font-size: calc(32 / 75) + rem;
                }
                .not-select {
                  font-family: Source Han Sans SC;
                  font-weight: 400;
                  color: #a5a5a5;
                  font-size: calc(28 / 75) + rem;
                }

                .drop-down-container {
                  position: relative;
                  width: calc(43 / 75) + rem;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  img {
                    width: calc(23 / 75) + rem;
                  }
                }
              }

              input {
                width: 100%;
                height: 100%;
                /* border: calc(1 / 75) + rem solid #bfbfbf; */
                border-radius: calc(2 / 75) + rem;

                /* padding: 0 calc(20 / 75) + rem; */
                /* padding-left: calc(55 / 75) + rem; */

                box-sizing: border-box;
                color: #000000;
              }

              input::placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }

              .input::-webkit-input-placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }

              /* WebKit, Blink, Edge */
              .input::-moz-placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }

              /* Mozilla Firefox 4 to 18 */
              .input::-moz-placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }

              /* Mozilla Firefox 19+ */
              .input::-ms-input-placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }

              /* Internet Explorer 10-11 */
              .input::-ms-input-placeholder {
                font-size: calc(28 / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #a5a5a5;
              }
            }
          }
        }
      }
      //删除的对话框
      .recharge-confirm-container {
        position: relative;

        height: 100%;
        width: 100%;

        .confirm-title-container {
          position: relative;
          height: calc(110 / 75) + rem;
          width: 100%;

          display: flex;
          justify-content: center;
          align-items: center;

          font-size: calc(36 / 75) + rem;
          font-family: Source Han Sans SC;
          font-weight: bold;
          color: #000000;
        }

        .confirm-tips-container {
          box-sizing: border-box;

          position: relative;
          height: calc(110 / 75) + rem;

          padding-left: calc(20 / 75) + rem;
          padding-right: calc(20 / 75) + rem;
          width: 100%;

          display: flex;
          justify-content: center;

          font-size: calc(28 / 75) + rem;
          font-family: Source Han Sans SC;
          font-weight: bold;
          white-space: nowrap;
          color: red;

          .confirm-tips-wrapper {
            display: flex;
            justify-content: center;
            /* align-items: center; */
            align-items: center;
            height: 100%;
            width: 100%;

            font-size: calc(36 / 75) + rem;
            font-family: Source Han Sans SC;
            font-weight: bold;
            white-space: nowrap;
            color: red;
          }

          .confirm-tips-wrapper-ecard {
            display: flex;
            /* justify-content: center; */
            /* align-items: center; */
            /* align-items: center; */
            height: 100%;
            width: 100%;

            font-size: calc(30 / 75) + rem;
            font-family: Source Han Sans SC;
            font-weight: bold;
            /* white-space: nowrap; */
            color: red;

            white-space: initial !important;
          }
        }

        .confirm-content-container {
          position: relative;
          display: flex;
          flex-direction: column;

          justify-content: space-between;
          align-items: center;
          height: calc(174 / 75) + rem;
          width: 100%;

          .input-phone-num-container {
            width: calc(466 / 75) + rem;
            height: calc(70 / 75) + rem;

            input {
              width: 100%;
              height: 100%;
              border: calc(1 / 75) + rem solid #bfbfbf;
              border-radius: calc(2 / 75) + rem;

              padding: 0 calc(20 / 75) + rem;
              box-sizing: border-box;
              color: #000000;
            }

            input::placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            .input::-webkit-input-placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            /* WebKit, Blink, Edge */
            .input::-moz-placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            /* Mozilla Firefox 4 to 18 */
            .input::-moz-placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            /* Mozilla Firefox 19+ */
            .input::-ms-input-placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            /* Internet Explorer 10-11 */
            .input::-ms-input-placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            /* Microsoft Edge */
          }

          .comfirm-input-phone-num-container {
            width: calc(466 / 75) + rem;
            height: calc(70 / 75) + rem;

            input {
              width: 100%;
              height: 100%;
              border: calc(1 / 75) + rem solid #bfbfbf;
              border-radius: calc(2 / 75) + rem;

              padding: 0 calc(20 / 75) + rem;
              box-sizing: border-box;

              color: #000000;
            }

            input::placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            .input::-webkit-input-placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            /* WebKit, Blink, Edge */
            .input::-moz-placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            /* Mozilla Firefox 4 to 18 */
            .input::-moz-placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            /* Mozilla Firefox 19+ */
            .input::-ms-input-placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            /* Internet Explorer 10-11 */
            .input::-ms-input-placeholder {
              font-size: calc(28 / 75) + rem;
              font-family: Source Han Sans SC;
              font-weight: 400;
              color: #a5a5a5;
            }

            /* Microsoft Edge */
          }
        }
      }
    }
  }
}
</style>
