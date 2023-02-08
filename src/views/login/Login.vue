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
        <div class="empty-container" style="height: 40%"></div>
        <div class="content">
          <!-- 验证码弹出框 -->
          <van-dialog
            v-model="showVerificationCodeModal"
            title="请输入验证码"
            show-cancel-button
            @open="openCodeModal"
            @confirm="sendVerificationMessage"
            :showConfirmButton="true"
            confirmButtonColor="#0B8AED"
          >
            <!-- 图形验证码输入 -->
            <div class="img-code-container">
              <!-- <div class="left-icon-container">
                  <div class="icon-img"></div>
                </div> -->
              <div class="input-container">
                <input
                  type="phone"
                  class="verification-code-input"
                  placeholder="请输入验证码"
                  v-model="form.png_code"
                  @blur="blur"
                  @focus="focus"
                />
                <div
                  class="refresh-verification-code-btn"
                  @click="throttleSetTimerout(getVerificationCodeImg, 1500)"
                >
                  <div class="btn-text">
                    <img
                      v-if="
                        verificationCodeImgBase64.length !== 0 &&
                        showImgLoading == false
                      "
                      :src="`data:image/png;base64,${verificationCodeImgBase64}`"
                      alt=""
                      class="code-img"
                    />

                    <JKLoading :showLoading="showImgLoading"></JKLoading>
                  </div>
                </div>

                <!-- 滑块验证 -->
                <!-- <div id="dragContainer"> -->
                <!-- 容器初始背景 -->
                <!-- <div id="dragBg"></div> -->
                <!-- 绿色背景 -->
                <!-- <div id="dragText"></div> -->
                <!-- 滑块容器文字 -->
                <!-- <div id="dragHandler" class="dragHandlerBg"></div> -->
                <!-- </div> -->
                <!-- 滑块  滑块初始化背景-->
              </div>
            </div>
          </van-dialog>

          <!-- 用于登录的盒子 -->
          <div class="login-wrapper">
            <!-- 登录盒子的背景 -->
            <div class="login-wrapper-bg"></div>

            <div class="login-container">
              <!-- 标题 -->
              <div class="title-container">
                <div class="title-text-container"><span> 后台登录 </span></div>
                <div class="bind-text-container" v-if="false">
                  请绑定您在办理农行信用卡时预留的手机号
                </div>
              </div>
              <!-- 输入框 -->
              <div class="input-container">
                <!-- 账号输入框 -->
                <div class="account-input-container">
                  <input
                    class="account-input"
                    type="text"
                    placeholder="请输入手机号码"
                    v-model="form.phone"
                    :maxlength="11"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    @blur="blur"
                    @focus="focus"
                  />
                </div>
                <!-- 装验证码和发送验证码的容器 -->
                <div class="verification-code-input-wrapper">
                  <!-- 验证码输入框 -->
                  <div class="verification-code-input-container">
                    <input
                      class="verification-code-input"
                      type="text"
                      placeholder="请输入验证码"
                      v-model="form.sms_code"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      @blur="blur"
                      @focus="focusMoreInput"
                      :maxlength="6"
                    />
                  </div>
                  <!-- 发送验证的按钮 -->
                  <div
                    class="sent-msg-btn-container"
                    @click="
                      isSentVeriryMessage == false
                        ? VerifyPhoneNumRight()
                        : JKTest()
                    "
                  >
                    <div class="sent-msg-text">
                      {{
                        isSentVeriryMessage == false
                          ? '获取验证码'
                          : `${backWardTimeNum}s`
                      }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- 按钮 -->
              <div class="button-tip-container">
                <div class="button-tip-wrapper">
                  <div class="bind-btn-container" @click="login">
                    <div class="bind-btn-wrapper">
                      <div class="bind-btn-text">登录</div>
                    </div>
                  </div>
                  <div class="bind-tip-container" v-if="false">
                    非农行信用卡用户将不能享受活动优惠
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-container-footer" style="height: 0.25rem"></div>
      </div>
      <div class="foot-container">
        <div class="foot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  sendPhoneVerificationCodeAPI,
  getVerificationCodeImgAPI,
  userRegisterAPI,
  loginAPI,
  autoLoginAPI,
} from '@/api/login/login';
import JKLoading from '@/components/common/JK-loading/JKLoading.vue';

export default {
  name: 'Login',
  components: {
    JKLoading,
  },
  //变量区
  data() {
    return {
      test: '123',

      // 是否点击发送了短信
      isSentVeriryMessage: false,
      // 倒数的时间
      backWardTimeNum: 60,
      // 用于还原倒数完毕后的时间
      backWardTimeNumInit: 60,
      //是否 在倒计时
      isBackWardTimeState: false,
      form: {
        phone: '',
        png_code: '',
        sms_code: '',
        item_entrance: 'wx',
        item_code: 'ABC_2NJD9B',
      },
      verificationCodeImgBase64: '', //图形验证码转码后的文本base64信息，用于放在img里面
      showVerificationCodeModal: false, //是否打开图形验证码
      throttleTimer: null, //用于节流的时间定时器
      showImgLoading: false, //是否展示loading页面
      isSliderPassed: false,

      isLogin: false,
      scrollTop: 0,
    };
  },
  computed: {
    setPageBgStyle() {
      return {
        height: window.screen.height > 725 ? '100%' : '',
      };
    },
  },
  //生命周期区
  mounted() {
    // console.log(window.screen.height);
    // sendPhoneVerificationCodeAPI().then((res) => {
    //   console.log(res);
    // });
    // let payload = {
    //   url: 'aHR0cCUzQS8vbG9jYWxob3N0JTNBODA4MC9sb2dpbg==',
    // };
    // getUserOpenIDAPI(payload).then((res) => {
    //   console.log(res);
    // });
    // console.log(this.$store);
    // this.JKTest();
    // setTimeout(() => {
    //   this.isLogin = true;
    //   console.log('执行');
    // }, 3000);

    // vue中禁止ios浏览器页面滚动的橡皮筋效果
    // document.body.addEventListener(
    //   'touchmove',
    //   function (e) {
    //     e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
    //   },
    //   { passive: false }
    // );
    // passive 参数不能省略，用来兼容ios和android

    // 解决键盘弹出后挡表单的问题
    // window.addEventListener('resize', function () {
    //   if (
    //     document.activeElement.tagName === 'INPUT' ||
    //     document.activeElement.tagName === 'TEXTAREA'
    //   ) {
    //     window.setTimeout(function () {
    //       if ('scrollIntoView' in document.activeElement) {
    //         document.activeElement.scrollIntoView();
    //       } else {
    //         document.activeElement.scrollIntoViewIfNeeded();
    //       }
    //     }, 0);
    //   }
    // });

    this.autoLogin();
  },
  //方法区
  methods: {
    JKTest() {
      console.log('测试一下');
    },
    blur() {
      document.body.scrollTop = this.scrollTop;
    },
    
    focusMoreInput() {
      this.scrollTop = document.body.scrollTop;

      window.setTimeout(function () {
        if ('scrollIntoView' in document.activeElement) {
          document.activeElement.scrollIntoView();
        } else {
          document.activeElement.scrollIntoViewIfNeeded();
        }
      }, 0);
    },

    focus() {
      this.scrollTop = document.body.scrollTop;
    },

    userRegister() {
      let payload = this.form;
      userRegisterAPI(payload).then((res) => {
        // console.log(res);
        if (res.code == 0) {
          this.$router.replace({
            path: '/recharge',
          });
        } else {
          this.$toast({
            message: res.msg,
            duration: 1500,
          });
        }
      });
    },

    // wxLogin() {
    //   let payload = this.form;
    //   wxLoginAPI(payload).then((res) => {
    //     // console.log(res);
    //     if (res.code == 0) {
    //       this.$toast({ message: '登录成功', duration: 1500 });
    //       sessionStorage.setItem('info', JSON.stringify(res.data));
    //       sessionStorage.setItem('token', res.data.access_token);

    //       setTimeout(() => {
    //         this.$router.replace({
    //           path: '/recharge',
    //         });
    //       }, 500);
    //     } else {
    //       this.$toast({
    //         message: res.msg,
    //         duration: 1500,
    //       });
    //     }
    //   });
    // },

    login() {
      let payload = this.form;
      loginAPI(payload).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.$toast({ message: '登录成功', duration: 1500 });
          sessionStorage.setItem('token', res.data.access_token);

          setTimeout(() => {
            //   跳转到白名单页面
            this.$router.replace({
              path: '/enter',
            });
          }, 500);
        } else {
          this.$toast({
            message: res.msg,
            duration: 1500,
          });
        }
      });
    },
    // 自动登录
    autoLogin() {
      autoLoginAPI().then((res) => {
        console.log(res);
      });
    },

    throttleSetTimerout(fun, wait) {
      // 设置一个定时器
      //我们的定时器已经在data里面了

      //改变this指向，以免this指向undefined
      let that = this;

      //返回一个函数
      return (function () {
        //传输参数 [...arguments]
        let args = [...arguments];

        // 如果没有定时器，就设置定时器，等wait时间结束 就执行函数，也就是说只有等我们设定的wait时间结束才可以执行函数
        if (!that.throttleTimer) {
          fun.apply(that, args);
          that.throttleTimer = setTimeout(() => {
            that.throttleTimer = null;
          }, wait);
        } else {
          //   console.log('操作过快');
          //   可删除
          that.$toast({
            message: '操作过快',
            duration: 1500,
          });
        }
      })();
    },

    // login() {
    //   //   console.log('点击');
    //   let phone = this.form.phone;
    //   let phoneCode = this.form.phone_code;

    //   if (phone.length > 0 && phoneCode.length > 0) {
    //     let payload = {
    //       phone: '',
    //       phone_code: '',
    //     };
    //     payload.phone = this.form.phone;
    //     payload.phone_code = this.form.phone_code;

    //     loginByPhoneAPI(this.form).then((res) => {
    //       //登录成功
    //       if (res.data.code == 0) {
    //         //   console.log(res);

    //         // 登录成功
    //         //   let successMsg = res.data.msg;
    //         //   console.log(successMsg);
    //         this.$toast({
    //           message: '登录成功',
    //           duration: 1500,
    //         });
    //         this.$store.commit('changeIsMerchartLogin', true);
    //         this.$router.push('mine');
    //       } else {
    //         // 发送失败
    //         let errMsg = res.data.msg;
    //         // console.log(errMsg);
    //         this.$toast({
    //           message: errMsg,
    //           duration: 1500,
    //         });
    //       }
    //     });
    //   }

    //   //   this.$store.commit('changeIsMerchartLogin', true);
    //   //   this.$router.push('mine');

    //   //   console.log(this.form);
    // },

    ////Model相关方法
    // 打开了Model层，刷新验证码

    openCodeModal() {
      //   console.log('model层被打开了');

      this.isSliderPassed = false;

      //刷新验证码
      this.getVerificationCodeImg();
      this.form.png_code = '';
      //   console.log(this.form);
    },

    ////发送手机号
    //获取图形验证码
    getVerificationCodeImg() {
      // 清空验证码的输入框
      //   this.form.pngCode = '';

      //   开启加载图标
      this.showImgLoading = true;
      getVerificationCodeImgAPI().then((res) => {
        // console.error(res);
        // btoa和atob是window的两个编码和解码函数，所以下面的方式就是把arraybuffer转成base64
        // btoa ：是binary to ascii，用于将binary的数据用ascii码表示，即Base64的编码过程
        //String.fromCharCode 就是把unicode 编码转成一个字符
        //将转成arraybuffer unicode 数组放到我们创建的数组中来，这一步实际上是新建数组
        let imgUint8Arry = new Uint8Array(res);
        //然后后面我们可以利用String.fromCharCode，把这个数组中的unicode 编码转成一个字符
        //这里的data实际代表着totol 而byte代表着currentValue
        //这个函数后面有个两个单引号代表着的是初始值
        let imgUint8ArryFormat = imgUint8Arry.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');
        //最后用btoa 将binary的数据用ascii码表示 就是转成了base64的格式
        let imgBase64 = btoa(imgUint8ArryFormat);
        this.verificationCodeImgBase64 = imgBase64;

        //加载图标改消失
        this.showImgLoading = false;
        // console.log(imgBase64, 'base641233');
      });
    },

    //校验手机号是否合格,合格就打开验证框
    VerifyPhoneNumRight() {
      let mobileNum = this.form.phone;
      let that = this;
      // 输入的字符串长度 不为 0
      if (mobileNum.length !== 0) {
        // judgePhoneNumIsRight子函数，用于判断手机号码是否是正确规格
        let isTelNumRight = this.judgePhoneNumIsRight(mobileNum);
        // console.log(isTelNumRight);

        if (isTelNumRight) {
          //   console.log('符合规格');

          //向后端发送短信（子函数，内容在下面可以看到）
          let form = this.form;
          //   console.log(form);
          //   this.sendPhoneVerificationCode(form);

          //打开Modal框
          this.showVerificationCodeModal = true;

          //   this.$nextTick(() => {
          //     (function () {
          //       // 获取滑动控件容器 ,灰色背景
          //       let dragContainer = document.getElementById('dragContainer');
          //       // 获取滑块左边部分,绿色背景
          //       let dragBg = document.getElementById('dragBg');
          //       // 获取滑动验证容器文本
          //       let dragText = document.getElementById('dragText');
          //       //获取滑块
          //       let dragHandler = document.getElementById('dragHandler');

          //       // console.log(dragContainer);

          //       // 滑块的最大偏移量  =  滑块验证容器文本长度  -  滑块长度
          //       let maxHandleOffset =
          //         dragContainer.clientWidth - dragHandler.clientWidth;

          //       // 是否验证成功的标记
          //       var isVertifySucc = false;

          //       initDrag();

          //       function initDrag() {
          //         // 在滑动验证容器文本中写入  “拖动滑块验证”
          //         dragText.textContent = '拖动滑块验证';
          //         dragText.style.color = 'black';
          //         dragHandler.style.left = 0;
          //         dragBg.style.width = 0;

          //         dragHandler.setAttribute('class', 'dragHandlerBg');
          //         // 给滑块添加鼠标按下监听
          //         dragHandler.addEventListener(
          //           'touchstart',
          //           onDragHandlerMouseDown
          //         );
          //       }
          //       // 选中滑块
          //       function onDragHandlerMouseDown() {
          //         // 鼠标移动监听
          //         document.addEventListener('touchmove', onDragHandlerMouseMove);
          //         // 鼠标松开监听
          //         document.addEventListener('touchend', onDragHandlerMouseUp);
          //       }

          //       //滑块移动
          //       function onDragHandlerMouseMove() {
          //         //   console.warn(event.touches[0].clientX, dragHandler.clientWidth);
          //         // html 不存在width属性  只有clientWidth
          //         // offsetX 是相对当前元素  clientX 和  PageX是相对于其父元素的
          //         // 滑块移动量
          //         var left =
          //           event.touches[0].clientX - dragHandler.clientWidth / 2 - 40;
          //         // /
          //         if (left < 0) {
          //           left = 0;
          //           // 如果 滑块移动量 > 滑块的最大量  ,则调用 验证成功函数
          //         } else if (left > maxHandleOffset) {
          //           left = maxHandleOffset;
          //         }
          //         // 滑块移动量
          //         dragHandler.style.left = left + 'px';
          //         // 绿色背景长度
          //         dragBg.style.width = dragHandler.style.left;
          //       }
          //       // 松开滑块函数
          //       function onDragHandlerMouseUp() {
          //         //移除鼠标移动监听
          //         document.removeEventListener(
          //           'touchmove',
          //           onDragHandlerMouseMove
          //         );
          //         // 移除鼠标松开监听
          //         document.removeEventListener('touchend', onDragHandlerMouseUp);
          //         // console.log(event);
          //         var left =
          //           event.changedTouches[0].clientX - dragHandler.clientWidth / 2;
          //         if (left > maxHandleOffset) {
          //           left = maxHandleOffset;
          //           verifySucc();
          //         } else {
          //           // 初始化滑块移动量
          //           dragHandler.style.left = 0;
          //           dragBg.style.width = 0;
          //         }
          //       }

          //       function getIsVertifySucc() {
          //         return isVertifySucc;
          //       }

          //       // 验证成功
          //       function verifySucc() {
          //         // 成功标记 不可回弹
          //         isVertifySucc = true;
          //         //容器文本的文字改为白色“验证通过”字体
          //         dragText.textContent = '验证通过';
          //         dragText.style.color = 'white';

          //         //验证通过
          //         that.isSliderPassed = true;
          //         that.showVerificationCodeModal = false;

          //         that.sendVerificationMessage();

          //         // 验证通过的滑块背景
          //         dragHandler.setAttribute('class', 'dragHandlerOkBg');
          //         //移除鼠标按下监听
          //         dragHandler.removeEventListener(
          //           'touchstart',
          //           onDragHandlerMouseDown
          //         );
          //         //移除鼠标移动监听
          //         document.removeEventListener(
          //           'touchmove',
          //           onDragHandlerMouseMove
          //         );

          //         // 移除鼠标松开监听
          //         document.removeEventListener('touchend', onDragHandlerMouseUp);
          //         // 匹配成功进行跳转
          //         // window.location.href="成功页面.html";
          //       }

          //       // })
          //     })();
          //   });

          //   this.getVerificationCodeImg();
        } else {
          //   console.log('不符合规格,请输入正确的手机号');
          this.$toast({
            message: '不符合规格,请输入正确的手机号',
            duration: 1500,
          });
        }
      } else {
        // console.log('手机号不能为空');
        this.$toast({
          message: '手机号不能为空',
          duration: 1500,
        });
      }
    },
    //点击了Model的确认后
    //发送短信
    sendVerificationMessage() {
      let backWardTimeNum = this.backWardTimeNum;

      let form = this.form;
      //   console.log(form);
      sendPhoneVerificationCodeAPI(form).then((res) => {
        // console.log(res);
        //成功发送
        if (res.code == 0) {
          //   console.log(res);

          // 发送成功
          //   let successMsg = res.data.msg;
          //   console.log(successMsg);
          this.$toast({
            message: '短信发送成功',
            duration: 1500,
          });

          let isBackWardTimeState = this.isBackWardTimeState;
          // 如果没有在倒计时 就更改状态
          if (!isBackWardTimeState) {
            // 更改button状态
            this.changeIsSentVeriryMessageState();

            //开启倒计时
            this.startBackWardTimer(backWardTimeNum);
          } else {
            // console.log('正在倒计时');
          }
        } else {
          // 发送失败
          let errMsg = res.msg;
          //   console.log(errMsg);
          this.$toast({
            message: res.msg,
            duration: 1500,
          });
        }
      });
    },

    // 子函数
    // 发送短信篇
    // 判断手机号是否是正常格式,符合要求
    judgePhoneNumIsRight(mobileNum) {
      /**
       * 手机号码有11位 第一位必须是1 第二位必须是括号里面的数字
       * 手机号码正则表达式："^[1][3,5,7,8][0-9]\\d{8}$"
       * ^:正则开始
       * $:正则结束
       * [1]:手机号码第一个数必须为1
       * [3，5，7，8]:手机号码第二个数必须为:括号内数字
       * [0-9] \\d{8}：最后的数可以为0-9的任意数 :{8}:表示恰好9个  0-9 有9个
       * \：转换符
       * \d:表示前面的数为数字0-9
       * \d代表的意思是匹配数字
       * X{n}:恰好为n数  注意:从零开始
       */
      let telReg = new RegExp('^[1][3,5,6,7,8,9][0-9]\\d{8}$');
      let isTelNumRight = telReg.test(mobileNum);
      return isTelNumRight;
    },
    // 更改验证码按钮的状态
    changeIsSentVeriryMessageState() {
      let isSentVeriryMessage = !this.isSentVeriryMessage;
      this.isSentVeriryMessage = isSentVeriryMessage;
      //   console.log(this.isSentVeriryMessage);
    },
    // 倒计时
    startBackWardTimer(backWardTimeNum) {
      this.isBackWardTimeState = true;

      backWardTimeNum = backWardTimeNum - 1;
      let timer = null;
      timer = setTimeout(() => {
        this.backWardTimeNum = backWardTimeNum;
        let newBackWardTimeNum = this.backWardTimeNum;
        if (backWardTimeNum > 0) {
          this.startBackWardTimer(newBackWardTimeNum);
        } else {
          clearTimeout(timer);
          this.changeIsSentVeriryMessageState();
          this.isBackWardTimeState = false;
          this.backWardTimeNum = this.backWardTimeNumInit;
        }
      }, 1000);
    },
    //向后端请求发送短信(暂时废弃)
    sendPhoneVerificationCode(data) {
      sendPhoneVerificationCodeAPI(data).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';

/* 滑块验证启 */
/* 滑块 控件 容器 ,灰色背景 */
#dragContainer {
  position: relative;
  display: inline-block;
  background: #e8e8e8;
  width: 300px;
  height: 33px;
  border: 2px solid #e8e8e8;
}

/* 滑块左边部分,绿色背景 */
#dragBg {
  /* 绝对定位 */
  position: absolute;
  background-color: #7ac23c;
  width: 0px;
  height: 100%;
}
/* 滑块验证容器文字 */
#dragText {
  position: absolute;
  width: 100%;
  height: 100%;
  /* 文字居中 */
  text-align: center;
  /* 文字进行垂直居中 这个地方不建议百分比  因为百分比他相对原始尺寸line-height 而非div的高度 */
  /* list-style: 33px; */
  line-height: calc(33 / 75) + rem;
  /* 文字不允许选中 */
  user-select: none;
  -webkit-user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;
}
/* 滑块 */
#dragHandler {
  position: absolute;
  width: calc(40 / 75) + rem;
  height: 100%;
  cursor: move;
}
/* 滑块初始化背景 */
.dragHandlerBg {
  background: #fff no-repeat center
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==');
}

/* 滑块成功时的背景 带一个对号 */
.dragHandlerOkBg {
  background: #fff no-repeat center
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==');
}

/* 滑块验证止 */

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
    // height: calc(1450 / 75) + rem;
    background-image: url('@/assets/img/white-list-bgc.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .page {
    box-sizing: border-box;
    position: relative;
    //   height: fit-content;
    width: 100vw;
    /* height: calc(1450 / 75) + rem; */
    height: 100%;
    /* background-color: rgba(grey, 0.1); */

    //不加的话 iphone5会多出来一块
    overflow-x: hidden;
    //   设置背景
    /* overflow-y: hidden; */

    .content-container {
      position: relative;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      /* top: 4.25rem; */

      .content {
        position: relative;
        display: flex;
        justify-content: center;
        /* height: calc(856 / 75) + rem; */
        /* top: 4.25rem; */
        height: fit-content;
        width: 100%;

        //图形验证码
        .img-code-container {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          height: calc(70 / 75) + rem;
          width: 100%;

          margin-top: calc(20 / 75) + rem;
          margin-bottom: calc(20 / 75) + rem;

          .left-icon-container {
            height: calc(45 / 75) + rem;
            width: calc(45 / 75) + rem;
            flex-shrink: 0;

            .icon-img {
              width: 100%;
              height: 100%;
              background-image: url(@/assets/img/img-code.png);
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
          }

          .input-container {
            position: relative;
            display: flex;
            flex-direction: row;
            width: 80%;
            height: 100%;

            .verification-code-input {
              width: 100%;
              height: 100%;
              font-size: calc(30 * $font-size-scale / 75) + rem;
            }

            .refresh-verification-code-btn {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              border: calc(2 / 75) + rem solid #0b8aed;
              border-radius: calc(30 / 75) + rem;

              .btn-text {
                font-size: calc(30 * $font-size-scale / 75) + rem;
                color: #0b8aed;
                font-weight: bold;
                height: 100%;

                .code-img {
                  height: 100%;
                }
              }
            }
          }
        }

        // 用于登录的盒子
        .login-wrapper {
          position: relative;
          display: flex;

          justify-content: center;
          align-items: center;

          height: calc(731 / 75) + rem;
          width: calc(666 / 75) + rem;

          //   登录用的背景
          .login-wrapper-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            background: #ffffff;
            /* box-shadow: 0px calc(5 / 75) + rem calc(43 / 75) + rem 0px
                      rgba(255, 24, 92, 0.18); */
            opacity: 0.5;
            border-radius: calc(28 / 75) + rem;
          }

          .login-container {
            position: relative;

            display: flex;
            flex-direction: column;

            width: calc(626 / 75) + rem;
            height: calc(691 / 75) + rem;

            background: #ffffff;
            /* box-shadow: 0px calc(5 / 75) + rem calc(43 / 75) + rem 0px
                      rgba(255, 24, 92, 0.18); */
            border-radius: calc(28 / 75) + rem;

            // 标题
            .title-container {
              position: relative;

              flex-shrink: 0;
              display: flex;
              flex-direction: column;

              justify-content: space-evenly;

              height: calc(227 / 75) + rem;
              width: 100%;

              .title-text-container {
                position: relative;
                display: flex;
                justify-content: center;

                font-size: calc(36 * $font-size-scale / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: bold;
                color: #0b8aed;

                span {
                  padding-left: calc(43 / 75) + rem;
                  padding-right: calc(43 / 75) + rem;
                }

                &::before {
                  content: '';
                  border-bottom: 1px solid #0b89ec;
                  transform: scaleY(0.5) translateY(-50%);
                  width: calc(104 / 75) + rem;
                }
                &::after {
                  content: '';
                  border-bottom: 1px solid #0b89ec;
                  transform: scaleY(0.5) translateY(-50%);

                  width: calc(104 / 75) + rem;
                }
              }

              .bind-text-container {
                position: relative;

                display: flex;
                justify-content: center;

                font-size: calc(26 * $font-size-scale / 75) + rem;
                font-family: Source Han Sans SC;
                font-weight: 500;
                color: #787878;
              }
            }

            //输入框
            .input-container {
              position: relative;
              flex-shrink: 0;

              display: flex;
              flex-direction: column;
              align-items: center;

              justify-content: space-between;

              width: 100%;
              height: calc(215 / 75) + rem;

              //   账号输入框
              .account-input-container {
                position: relative;

                display: flex;
                justify-content: center;

                /* border-radius: calc(41 / 75) + rem; */
                /* background: #f0eeef; */

                width: calc(516 / 75) + rem;
                height: calc(82 / 75) + rem;

                border-bottom: 1px solid #d9d9d9;

                overflow: hidden;

                .account-input {
                  //减去倒圆角的大小
                  /* width: calc((556 - 86) / 75) + rem; */
                  width: 100%;

                  height: 100%;

                  /* background: #f0eeef; */

                  font-size: calc(28 * $font-size-scale / 75) + rem;
                }

                // 修改input的placeHold的样式
                .account-input::placeholder {
                  font-size: calc(28 * $font-size-scale / 75) + rem;

                  font-family: Source Han Sans SC;
                  font-weight: 500;
                  color: #999999;
                }

                // 用于兼容
                .account-input::-webkit-input-placeholder {
                  font-size: calc(28 * $font-size-scale / 75) + rem;
                  font-family: Source Han Sans SC;
                  font-weight: 500;
                  color: #999999;
                }

                /* WebKit, Blink, Edge */
                .verification-code-input::-moz-placeholder {
                  font-size: calc(28 * $font-size-scale / 75) + rem;
                  font-family: Source Han Sans SC;
                  font-weight: 500;
                  color: #999999;
                }

                /* Mozilla Firefox 4 to 18 */
                .verification-code-input::-moz-placeholder {
                  font-size: calc(28 * $font-size-scale / 75) + rem;
                  font-family: Source Han Sans SC;
                  font-weight: 500;
                  color: #999999;
                }

                /* Mozilla Firefox 19+ */
                .verification-code-input::-ms-input-placeholder {
                  font-size: calc(28 * $font-size-scale / 75) + rem;
                  font-family: Source Han Sans SC;
                  font-weight: 500;
                  color: #999999;
                }

                /* Internet Explorer 10-11 */
                .verification-code-input::-ms-input-placeholder {
                  font-size: calc(28 * $font-size-scale / 75) + rem;
                  font-family: Source Han Sans SC;
                  font-weight: 500;
                  color: #999999;
                }

                /* Microsoft Edge */
              }

              //   装验证码和发送验证码的容器
              .verification-code-input-wrapper {
                position: relative;
                display: flex;

                justify-content: space-between;

                width: calc(516 / 75) + rem;
                height: calc(82 / 75) + rem;

                border-bottom: 1px solid #d9d9d9;

                //验证码输入框
                .verification-code-input-container {
                  position: relative;
                  display: flex;
                  justify-content: center;
                  /* border-radius: calc(41 / 75) + rem; */
                  /* background: #f0eeef; */

                  width: calc(306 / 75) + rem;
                  height: calc(82 / 75) + rem;

                  overflow: hidden;

                  .verification-code-input {
                    //减去倒圆角的大小
                    /* width: calc((306 - 86) / 75) + rem; */
                    width: 100%;
                    height: 100%;

                    font-size: calc(28 * $font-size-scale / 75) + rem;

                    /* background: #f0eeef; */
                  }

                  // 修改input的placeHold的样式
                  .verification-code-input::placeholder {
                    font-size: calc(28 * $font-size-scale / 75) + rem;
                    font-family: Source Han Sans SC;
                    font-weight: 500;
                    color: #999999;
                  }

                  // 用于兼容
                  .verification-code-input::-webkit-input-placeholder {
                    font-size: calc(28 * $font-size-scale / 75) + rem;
                    font-family: Source Han Sans SC;
                    font-weight: 500;
                    color: #999999;
                  }

                  /* WebKit, Blink, Edge */
                  .verification-code-input::-moz-placeholder {
                    font-size: calc(28 * $font-size-scale / 75) + rem;
                    font-family: Source Han Sans SC;
                    font-weight: 500;
                    color: #999999;
                  }

                  /* Mozilla Firefox 4 to 18 */
                  .verification-code-input::-moz-placeholder {
                    font-size: calc(28 * $font-size-scale / 75) + rem;
                    font-family: Source Han Sans SC;
                    font-weight: 500;
                    color: #999999;
                  }

                  /* Mozilla Firefox 19+ */
                  .verification-code-input::-ms-input-placeholder {
                    font-size: calc(28 * $font-size-scale / 75) + rem;
                    font-family: Source Han Sans SC;
                    font-weight: 500;
                    color: #999999;
                  }

                  /* Internet Explorer 10-11 */
                  .verification-code-input::-ms-input-placeholder {
                    font-size: calc(28 * $font-size-scale / 75) + rem;
                    font-family: Source Han Sans SC;
                    font-weight: 500;
                    color: #999999;
                  }

                  /* Microsoft Edge */
                }

                //发送验证码的按钮
                .sent-msg-btn-container {
                  position: relative;

                  display: flex;
                  /* justify-content: center; */
                  align-items: center;
                  justify-content: flex-end;

                  width: calc(219 / 75) + rem;
                  height: calc(82 / 75) + rem;
                  /* background: #ef240c; */
                  /* border-radius: calc(41 / 75) + rem; */

                  .sent-msg-text {
                    font-size: calc(28 * $font-size-scale / 75) + rem;
                    font-family: Adobe Heiti Std;
                    font-weight: normal;
                    color: #0b89ec;
                  }
                }
              }
            }

            //按钮与提示
            .button-tip-container {
              position: relative;

              display: flex;
              flex-direction: column;
              justify-content: flex-end;

              width: 100%;
              flex: 1;

              .button-tip-wrapper {
                position: relative;

                display: flex;
                flex-direction: column;
                align-items: center;

                width: 100%;
                height: calc(161 / 75) + rem;

                //绑定按钮
                .bind-btn-container {
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  width: calc(429 / 75) + rem;
                  height: calc(88 / 75) + rem;

                  background-color: #0b89ec;

                  border-radius: calc(44 / 75) + rem;

                  /* background-image: url(@/assets/img/bind-btn-img.png); */
                  /* background-size: 100% 100%; */
                  /* background-repeat: no-repeat; */

                  //   box-shadow: 0px calc(5 / 75) + rem calc(9 / 75) + rem 0px
                  //     rgba(145, 7, 5, 0.4);
                  //   border-radius: calc(45 / 75) + rem;

                  //   废弃(可恢复，废弃原因：换成图片了)
                  .bind-btn-wrapper {
                    position: relative;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .bind-btn-text {
                      position: relative;

                      font-family: Source Han Sans SC;
                      font-size: 19px;
                      color: #ffffff;
                    }
                  }
                }

                //提示文字
                .bind-tip-container {
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  margin-top: calc(43 / 75) + rem;

                  font-size: calc(24 * $font-size-scale / 75) + rem;

                  font-family: Source Han Sans SC;
                  font-weight: 400;
                  color: #787878;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
