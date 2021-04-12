<template>
  <div class="course imooc-flex">
    <!-- 菜单列表 -->
    <div class="wrapper menu-wrapper" ref="mwrapper">
      <ul class="menu-list">
        <li
          class="menu-item imooc-flex imooc-flex-center"
          v-for="(categroy, index) in general_category_list"
          :key="categroy.id"
          :class="{ active: currentIndex == index }"
          @click="selectMenu(index)"
        >
          <span>{{ categroy.name }}</span>
        </li>
      </ul>
    </div>

    <!-- 对应的内容 -->
    <div class="wrapper content-wrapper" ref="cwrapper">
      <ul class="content-list">
        <li
          class="content-item"
          v-for="course in general_category_list"
          :key="course.id"
        >
          <div class="title mb-10">{{ course.name }}</div>

          <ul
            class="type-list imooc-flex"
            v-if="course.coursecategrories.length"
          ></ul>

          <ul
            class="course-list"
            v-for="(coursecate, index) in course.coursecategrories"
            :key="index"
          >
            <li
              class="course-item imooc-flex"
              v-for="courses in coursecate.androidcourse_base_list"
              :key="courses.id"
              @click="toDetail(courses.id)"
            >
              <imooc-citem :course="courses" width="10rem"></imooc-citem>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import citem from "@/components/citemTwo";
export default {
  data() {
    return {
      general_category_list: [],

      mscroll: null,
      cscroll: null,
      scrollY: 0,
      listHeight: [],
    };
  },
  created() {
    this.get_general();
  },
  mounted() {
    this.initBetterScroll();
  },
  // activated() {
  //   // 移除index的padding-bottom
  //   document.querySelector(".index").classList.remove("haspadding");
  // },
  // deactivated() {
  //   // 加上index的padding-bottom
  //   document.querySelector(".index").classList.add("haspadding");
  // },
  methods: {
    // 总目录
    get_general() {
      // 获取课程分类信息
      this.$axios
        .get(`${this.$settings.base_url}/course/androidcourse/`)
        .then((response) => {
          this.general_category_list = response.data;
          // console.log(this.general_category_list);
        })
        .catch(() => {
          this.$message({
            message: "获取总目录分类信息有误，请联系客服工作人员",
          });
        });
    },

    initBetterScroll() {
      this.$nextTick(function () {
        setTimeout(() => {
          let wrapper = this.$refs.cwrapper;

          // 初始化better-scroll插件
          this.cscroll = new BScroll(wrapper, {
            click: true,
            probeType: 3,
          });

          // 监听内容区的滚动
          this.cscroll.on("scroll", (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
          });

          // 计算高度
          this.caclHeight();
        }, 4000);
      });
    },
    caclHeight() {
      let content = document.querySelectorAll(".content-wrapper .content-item");
      // console.log("content",content);
      let height = 0;

      this.listHeight.push(height);
      content.forEach((item) => {
        height += item.clientHeight ; // 课程有的过少高度不够active样式会乱跳
        this.listHeight.push(height);
        // console.log(this.listHeight);
      });
    },
    selectMenu(index) {
      let content = document.querySelectorAll(".content-wrapper .content-item");
      let el = content[index];
      this.cscroll.scrollToElement(el, 300); // 设置滚动时间
    },
    toDetail(id) {
      this.$router.push({ name: "cdetail", params: { pk:id } });
    },
  },
  computed: {
    currentIndex() {
      // console.log(this.listHeight);
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // console.log(height1,height2);
        if (
          !height2 ||
          (this.scrollY >= height1 && this.scrollY <= height2 - 50)
        ) {
          return i;
        }
      }
      return 0;
    },
  },
  components: {
    "imooc-citem": citem,
  },
};
</script>

<style lang="scss" scoped>
@import "@/public/stylesheets/theme.scss";
.course {
  height: calc(100vh - 8rem);
  overflow: hidden;
  .menu-wrapper {
    width: 8rem;
    flex: 0 0 8rem;
  }
  .content-wrapper {
    flex: 1;
    overflow: hidden;
  }
  .menu-list {
    text-align: center;
    background-color: #fff;
    font-size: 1.2rem;
    li {
      width: 100%;
      height: 5rem;
      padding: 0 1rem;
      border-bottom: 0.1rem solid #ebebeb;
      &:last-child {
        border: none;
      }
      &.active {
        color: $main;
      }
    }
  }
  .content-list {
    background-color: #f4f5f6;
    padding: 1rem;
    overflow: hidden;
    .content-item {
      margin-bottom: 1rem;
      padding-top: 1rem;
    }
    .type-list {
      flex-wrap: wrap;
      padding: 1rem 1rem 0;
      margin-bottom: 2rem;
      background-color: #fff;
      border-radius: 1rem;
      text-align: center;
      .type-item {
        align-self: flex-start;
        flex-basis: 33%;
        margin-bottom: 1rem;
        &:active {
          background-color: #f1f1f1;
        }
        p {
          margin-top: 0.5rem;
        }
        .icon {
          img {
            width: 4rem;
            margin: 0 auto;
          }
        }
      }
    }
  }
  .course-list {
    .course-item {
      &:active {
        background-color: #f1f1f1;
      }
      margin-top: 1rem;
      .icon {
        width: 6rem;
        margin-right: 1rem;
      }
      .info {
        flex: 1;
      }
    }
  }
}
</style>


