<template>
  <div class="footer download imooc-flex imooc-flex-between" v-if="isshow" v-show="DownloadShow">
    <div class="info imooc-flex">
      <div class="icon">
      <img src="@/public/images/just.png">
    </div>
    <div class="tips">JUSTedu，江科大在线教育随身学习</div>
    </div>
    <div class="btn"  @click="DownloadShow = false">关闭</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
       DownloadShow: true
    }
  },
  computed: {
    isshow() {
      return this.$route.path != "/index/course";
    }
  }
};
</script>

<style lang="scss" scoped>
.download {
  padding: 1rem 2rem;
  .icon {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  }
  .tips {
    line-height: 3rem;
  }
  .btn {
    align-self: center;
  }
}
</style>
