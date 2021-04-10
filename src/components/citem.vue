<template>
  <div class="citem imooc-flex" :class="{'istop': false}">
    <div class="icon" :style="{width: width, height: height}">
      <img :src="course.course_img">
    </div>
    <div class="info imooc-flex imooc-flex-column imooc-flex-around">
      <div class="title hide-text-2">{{ course.name }}</div>
      <!-- <div class="intro hide-text-2">{{ course.level }}</div> -->
      <div class="people cr-basic fz-small" v-if="course.project">{{ course.level }}&#8901; {{ course.popular }}人在学</div>
      <div class="money fz-small cr-main" v-if="course.price">&#165; {{ course.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      default() {
        return {
          title: "",
          intro: "",
          level: "",
          people: "",
          money: ""
        };
      }
    },
    width: {
      default() {
        return "150px";
      }
    },
    height: {
      default() {
        return "85px";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$active: #ebebeb;
// 列表公共样式（实战推荐、新上好课）
.citem {
  // height: 89px;
  // margin: 4px !important;
  display: block;
  &:active {
    background-color: $active;
  }
  margin: 1.5rem 0 0 0;
  .icon {
    margin-right: 0px;
    img {
      height:  85px;
      width: 150px;
    }
  }
  .info {
    flex: 1;
    .title {
      word-break: break-all;
      overflow: hidden;
      font-size: 12px;
      font-weight: bold;
      width: 150px;

    }
    .people {
      color: rgb(98, 95, 95);
      font-weight: 10px;
      font-size: 11px;
    }
    .money {
      color: rgb(255, 0, 0);
      font-weight: bold;
      font-size: 13px;
    }
  }
  // 置顶样式
  &.istop {
    position: relative;
    padding: 1rem;
    color: rgb(0, 0, 0);
    line-height: 1.7;
    a {
      color: rgb(0, 0, 0);
    }
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;

      z-index: -1;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .people {
      color: rgb(0, 0, 0);
    }
    .money {
      margin-top: 50px;
      color: rgb(255, 0, 0);
      font-weight: bold;
    }
  }
}
</style>
