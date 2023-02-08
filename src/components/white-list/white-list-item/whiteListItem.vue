<template>
  <!-- 白名单 -->
  <div class="white-list-item-container">
    <div class="phone-content">{{ item.content }}</div>
    <div class="money-content">{{ item.enter_name.slice(0, 3) }}</div>
    <div class="time-content">{{ item.created_at }}</div>
    <div class="operate-content" @click="clickDeleteBtn">删除</div>
  </div>
</template>

<script>
export default {
  name: 'whiteListItem',
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
    return {};
  },
  //生命周期区
  mounted() {
    // console.log(this.$store);
    // this.JKTest();
  },
  //方法区
  methods: {
    JKTest() {
      console.log('测试一下');
    },
    navToPage(path) {
      this.$router.push('/' + path);
    },
    clickDeleteBtn() {
      this.$emit('clickDeleteBtnFromFather', this.item.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.white-list-item-container {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(104 / 75) + rem;

  font-size: 13px;
  font-family: Source Han Sans CN;
  font-weight: 400;

  .phone-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    flex: 0.25;
  }
  .money-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    flex: 0.25;
  }
  .time-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 0.3;

    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .operate-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff0000;
    flex: 0.2;
  }
}
</style>
