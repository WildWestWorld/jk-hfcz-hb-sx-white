<template>
  <div class="ticket-content-container">
    <!-- 上面的奖券类型按钮 -->

    <div class="ticket-type-button-container">
      <div class="ticket-type-button-wrapper">
        <div
          :class="
            activeTicketTypeIndex == index
              ? 'ticket-type-button active'
              : 'ticket-type-button '
          "
          v-for="(item, index) in ticketTypeData"
          :key="index"
          @click="changeActiveTicketTypeIndex(index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="ticket-info-container">
      <div
        class="ticket-info-item-container"
        v-for="(item, index) in ticketTypeData"
        :class="
          activeTicketTypeIndex == index
            ? 'ticket-info-item-container active'
            : 'ticket-info-item-container '
        "
        :key="index"
      >
        <div class="ticket-info-item-content">
          <slot :name="'ticket-info-item' + index"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ticketTypeTabList",

  //变量区
  data() {
    return {
      ticketTypeData: [
        { name: "可使用" },
        { name: "待返现" },
        { name: "已使用" },
        { name: "已失效" },
      ],
      activeTicketTypeIndex: 0,
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
      console.log("测试一下");
    },
        changeActiveTicketTypeIndex(index) {
      let activeIndex = this.activeTicketTypeIndex;
      if (activeIndex !== index) {
        this.activeTicketTypeIndex = index;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
		@import '@/assets/style/global.scss';
	
	
    /* 奖券内容 */
    .ticket-content-container {
      position: relative;
      display: flex;
      flex-direction: column;
      height: calc(1115 / 75) + rem;
      width: 100vw;
      /* 上面的奖券类型按钮 */
      .ticket-type-button-container {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;

        width: 100%;
        height: calc(82 / 75) + rem;
        .ticket-type-button-wrapper {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-around;

          width: calc(698 / 75) + rem;
          /* height: calc(60 / 75) + rem; */

          /* margin-top: calc(22 / 75) + rem; */
          .ticket-type-button {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            width: calc(140 / 75) + rem;
            height: calc(60 / 75) + rem;

            border: 2px solid #f2f2f2;
            border-width: calc(2 / 75) + rem;

            border-radius: calc(29 / 75) + rem;

            font-size: calc(28 * $font-size-scale / 75) + rem;
            font-family: "SourceHanSansCN";
            font-weight: 400;
            color: #949494;
          }
          .active {
            border: 2px solid #fa6a39;
            border-width: calc(2 / 75) + rem;
            background: rgba(251, 237, 224, 0.6);
            color: #fa6a39;
          }
        }
      }
      /* 下面类型按钮内容 */
      .ticket-info-container {
        position: relative;
        display: flex;
        flex-direction: column;

        height: calc(1033 / 75) + rem;
        width: 100%;
        .ticket-info-item-container {
          position: relative;
          display: none;
          height: 100%;
          width: 100%;
          .ticket-info-item-content {
            position: relative;
            height: 100%;
            width: 100%;
          }
        }
        .active {
          display: block;
        }
      }
    }
</style>
