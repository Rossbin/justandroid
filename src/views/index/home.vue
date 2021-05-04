<template>
  <div class="home mt-10">
    <!-- 轮播图 -->
    <div class="banner">
      <swiper :options="boptions" ref="mySwiper" v-if="bannerlist.length != 0">
        <swiper-slide v-for="banner in bannerlist" :key="banner.id">
          <img :src="banner.img" @click="toClassDetail(banner.link)" />
        </swiper-slide>
        <div
          class="swiper-pagination swiper-pagination-white"
          slot="pagination"
        ></div>
      </swiper>
    </div>

    <!-- 公告 -->
    <div class="notice imooc-container imooc-flex imooc-flex-between fz-small">
      <div class="info">
        <div class="content cr-basic hide-text-1">
          公告：新人注册专享35元大礼包，你来我就送！
        </div>
      </div>
      <!-- <div class="btn">详情</div> -->
    </div>

    <!-- 实战推荐 -->
    <div class="rec imooc-container">
      <!-- 头部 -->
      <div class="head imooc-flex imooc-flex-between">
        <div class="title">实战推荐</div>
        <div class="more-link">
          <router-link to="/index/coding" class="cr-basic"
            >更多实战</router-link
          >
        </div>
      </div>

      <!-- 列表 -->
      <ul class="rec-list">
        <li
          class="rec-item"
          v-for="rec in reclist"
          :key="rec.id"
          :class="{ istop: true }"
          @click="toClassDetail(rec.id)"
        >
          <imooc-citem :course="rec" width="13rem"></imooc-citem>
        </li>
      </ul>
    </div>

    <!-- 新上好课 -->
    <div class="new imooc-container">
      <!-- 头部 -->
      <div class="head imooc-flex imooc-flex-between">
        <div class="title">高校课程</div>
        <div class="more-link">
          <router-link to="/index/course" class="cr-basic"
            >更多课程</router-link
          >
        </div>
      </div>

      <!-- 列表 -->
      <ul class="rec-list">
        <swiper :options="noptions" ref="mySwiper" v-if="newlist.length != 0">
          <swiper-slide v-for="(cne,index) in newlist" :key="index">
            <li
              class="rec-item imooc-flex"
              v-for="ne in cne"
              :key="ne.id"
              @click="toClassDetail(ne.id)"
            >
              <imooc-citemtwo
                :course="ne"
                width="13rem"
                height="auto"
              ></imooc-citemtwo>
            </li>
          </swiper-slide>
          <div
            class="swiper-pagination swiper-pagination-white"
            slot="pagination"
          ></div>
        </swiper>
      </ul>
    </div>

    <!-- 猿问精选 -->
    <!-- <div class="wenda imooc-container"> -->
      <!-- 头部 -->
      <!-- <div class="head imooc-flex imooc-flex-between">
        <div class="title">猿问精选</div>
        <div class="more-link">
          <router-link to="/" class="cr-basic">更多猿问</router-link>
        </div>
      </div> -->

      <!-- 列表 -->
      <!-- <ul class="wenda-list">
        <li class="wenda-item" v-for="wenda in wendalist" :key="wenda.id">
          <div class="title">
            <router-link to="/">{{ wenda.title }}</router-link>
          </div>
          <div class="active-num cr-basic fz-small">
            共{{ wenda.num }}个回答
          </div>
        </li>
      </ul> -->
    <!-- </div> -->
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import sliceArray from "@/public/javascripts/sliceArray";
import citem from "@/components/citem";
import citemtwo from "@/components/citemTwo";

export default {
  data() {
    return {
      bannerlist: [],
      reclist: [],
      newlist: [],
      wendalist: [],
      boptions: {
        effect: "coverflow",
        slidesPerView: 1.1,
        spaceBetween: 65,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 0,
          stretch: 10,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      noptions: {
        spaceBetween: 10,
        slidesPerView: 1.1,
        centeredSlides: false,
        pagination: {
          el: ".swiper-pagination",
        },
      },
    };
  },
  created() {
    // this.getHomeData();
    this.get_college_actualcourse();
    this.get_college_computer();
    this.get_college_language();
    this.get_college_engineer();
    this.get_college_science();

    //当banner组件一创建，就向后台发请求，拿回轮播图数据
    this.$axios
      .get(`${this.$settings.base_url}/home/banner/`)
      .then((response) => {
        // console.log("banner", response.data);
        this.bannerlist = response.data;
      })
      .catch((error) => {});
  },
  methods: {
    get_college_actualcourse() {
      let filters = {
        ordering: "-popular", // 排序按popular
        page_size: "8",
      };

      // 获取课程列表信息
      this.$axios
        .get(`${this.$settings.base_url}/course/actualcourse/`, {
          params: filters,
        })
        .then((response) => {
          this.reclist = response.data.results;
          // console.log("工科的课程", this.reclist);
        })
        .catch(() => {
          this.$message({
            message: "获取课程信息有误，请联系客服工作人员",
          });
        });
    },
    get_college_computer() {
      let filters = {
        ordering: "-popular", // 排序按popular
        course_category: "102",
        page_size: "3",
      };

      // 获取课程列表信息
      this.$axios
        .get(`${this.$settings.base_url}/course/popular/`, {
          params: filters,
        })
        .then((response) => {
          this.newlist[0] = response.data.results;
          // console.log("计算机返回的课程", this.newlist);
        })
        .catch(() => {
          this.$message({
            message: "获取课程信息有误，请联系客服工作人员",
          });
        });
    },
    get_college_language() {
      let filters = {
        ordering: "-popular", // 排序按popular
        course_category: "103",
        page_size: "3",
      };

      // 获取课程列表信息
      this.$axios
        .get(`${this.$settings.base_url}/course/popular/`, {
          params: filters,
        })
        .then((response) => {
          this.newlist[1] = response.data.results;
          // console.log("计算机返回的课程", this.newlist[1]);
        })
        .catch(() => {
          this.$message({
            message: "获取课程信息有误，请联系客服工作人员",
          });
        });
    },
    get_college_engineer() {
      let filters = {
        ordering: "-popular", // 排序按popular
        course_category: "104",
        page_size: "3",
      };

      // 获取课程列表信息
      this.$axios
        .get(`${this.$settings.base_url}/course/popular/`, {
          params: filters,
        })
        .then((response) => {
          this.newlist[2] = response.data.results;
          // console.log("计算机返回的课程", this.newlist[2]);
        })
        .catch(() => {
          this.$message({
            message: "获取课程信息有误，请联系客服工作人员",
          });
        });
    },
    get_college_science() {
      let filters = {
        ordering: "-popular", // 排序按popular
        course_category: "105",
        page_size: "3",
      };

      // 获取课程列表信息
      this.$axios
        .get(`${this.$settings.base_url}/course/popular/`, {
          params: filters,
        })
        .then((response) => {
          this.newlist[3] = response.data.results;
          // console.log("计算机返回的课程", this.newlist[3]);
        })
        .catch(() => {
          this.$message({
            message: "获取课程信息有误，请联系客服工作人员",
          });
        });
    },
    // getHomeData() {
    //   this.$http.get("/homeData").then((res) => {
    //     console.log(res);
    //     let data = res.data.data;
    //     // this.bannerlist = data.bannerlist;
    //     // this.reclist = data.reclist;
    //     // this.newlist = data.newlist;
    //     this.wendalist = data.wendalist;
    //   });
    // },
    toClassDetail(id) {
      this.$router.push({ name: "cdetail", params: { pk:id } });
    },
  },
  computed: {

  },
  components: {
    swiper,
    swiperSlide,
    "imooc-citem": citem,
    "imooc-citemtwo": citemtwo,
  },
};
</script>

<style lang="scss" scoped>
$active: #ebebeb;
.home {
  .rec-item {
    // 置顶样式
    &.istop {
      display: inline-block;
      width: 49%;
      min-width: 10.5rem;
      // &:first-child {
      //   // margin-right: 2%;
      // }
    }
  }
  // 猿问精选
  .wenda-item {
    margin-top: 1rem;
    &:active {
      background-color: $active;
    }
  }
}
</style>

<style lang="scss">
// 新手好课swiper pagination的切换动画
.new {
  background-color: #f4f4f4;
  .swiper-container {
    padding-bottom: 3rem;
    .swiper-pagination {
      bottom: 0rem;
      span {
        background-color: #d9dde1;
        opacity: 0.6;
        transition: width 0.2s ease-in;
        border-radius: 0.6rem;
        &.swiper-pagination-bullet-active {
          width: 3rem;
          background-color: #d9dde1;
          opacity: 1;
        }
      }
    }
  }
}
</style>

