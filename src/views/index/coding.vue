<template>
  <div class="path">
    <!-- 分类 -->
    <!-- <ul class="type-list imooc-container imooc-flex">
      <li
        class="type-item"
        v-for="(type, index) in general_category_list"
        :key="type.id"
        :class="{ active: index === currActive }"
        @click="changeType(index,type.id)"
      >
        {{ type.name }}
      </li>
    </ul> -->

    <!-- 课程列表 -->
    <div
        v-for="(categroy, index) in general_category_list"
        :key="index"
    >
      <ul class="class-list"
        v-for="(type, index) in categroy.coursecategrories"
        :key="index"
      
      >
        <li
          class="class-item imooc-flex imooc-container"
          v-for="code in type.androidcourse_actual_list"
          :key="code.id"
          @click="toClassDetail(code.id)"
        >
          <imooc-citem :course="code" width="14rem" height="8rem"></imooc-citem>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import citem from "@/components/citemTwo";
export default {
  data() {
    return {
      general_category_list: [],
      // filter:{
      //   course_category: '0',
      // },
      // course_list:[],

      // currActive: 0,
      // codelist: [],
    };
  },
  created() {
    this.get_general();

  },
  methods: {
    // 总目录
    get_general() {
      // 获取课程分类信息
      let filters = {
        project: "1",
      };
      this.$axios
        .get("http://127.0.0.1:8000/course/androidcourse/", {
          params: filters,
        })
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
    // changeType(index,key) {
    //   this.currActive = index;
    //   this.filter.course_category = key
    //   console.log(this.filter.course_category);
    //   this.get_course();
    // },
    toClassDetail(id) {
      this.$router.push({ name: "cdetail", params: { id } });
    },
        // 课程
    // get_course() {
    //   // 排序
    //   let filters = {
    //     course_categor: this.filter.course_category
    //   };
    //   console.log(filters);

    //   // 获取课程列表信息
    //   this.$axios
    //     .get('http://127.0.0.1:8000/course/actualcourse/', {
    //       params: filters,
    //     })
    //     .then((response) => {
    //       this.course_list = response.data;
    //       console.log(this.course_list);
    //     })
    //     .catch(() => {
    //       this.$message({
    //         message: "获取课程信息有误，请联系客服工作人员",
    //       });
    //     });
    // },
  },
  components: {
    "imooc-citem": citem,
  },
};
</script>

<style lang="scss" scoped>
@import "@/public/stylesheets/theme.scss";
.type-list {
  flex-wrap: wrap;
  background-color: $black;
  color: #fff;
  .type-item {
    flex-shrink: 0;
    padding: 0.5rem 1rem;
    text-align: center;
    border: 0.1rem solid #fff;
    margin: 0.5rem 0;
    margin-right: 1rem;
    border-radius: 3rem;
    &.active {
      background-color: $main;
      border-color: $main;
    }
    .icon {
      display: inline-block;
      width: 3rem;
    }
  }
}

.class-list {
  .class-item {
    border-bottom: 0.1rem solid #ebebeb;
    &:last-child {
      border: none;
    }
    .icon {
      width: 10rem;
      height: 7rem;
      margin-right: 1rem;
      img {
        height: 100%;
      }
    }
    .info {
      flex: 1;
      .title,
      .intro,
      .tips {
        margin-bottom: 0.5rem;
      }
    }
    &:active {
      background-color: #ebebeb;
    }
  }
}
</style>
