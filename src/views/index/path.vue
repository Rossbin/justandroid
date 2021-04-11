<template>
  <div class="path mt-10">
    <!-- 分类 -->
    <ul class="type-list imooc-flex">
      <li
        class="type-item"
        v-for="(type, index) in general_category_list"
        :key="type.id"
        @click="toTypeDetail(index)"
      >
        <!-- <div class="icon">
          <img :src="type.icon">
        </div> -->
        <div class="text fz-small">{{ type.name }}</div>
      </li>
    </ul>

    <!-- 课程列表 -->

    <ul
      class="class-list imooc-container imooc-flex imooc-flex-between"
      v-for="(categroy, index) in general_category_list"
      :key="index"
    >
      <li
        class="class-item"
        v-for="clas in categroy.coursecategrories"
        :key="clas.id"
        @click="toClassDetail(clas.id)"
        
      >
        <div v-if="clas.androidcourse_actual_list < 1">fewhiufhaiuwehfo</div>
        <div
          
          v-else
          v-for="(type, index) in clas.androidcourse_actual_list"
          :key="index"
        >

          <div class="icon">
            <img :src="type.course_img" />
          </div>
          <div class="info">
            <div class="title">{{ type.name }}</div>
            <div class="tips cr-basic fz-small">
              {{ type.level }}·{{ type.project_name }}
            </div>
            <div class="tips cr-basic fz-small">{{ type.students }}人在学</div>
            <div class="money fz-small">&#165; {{ type.price }}</div>
          </div>
     
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      general_category_list: [],
      typelist: [
        {
          icon: require("@/public/images/web.png"),
          text: "Web前端攻城狮",
        },
        {
          icon: require("@/public/images/java.png"),
          text: "Java攻城狮",
        },
        {
          icon: require("@/public/images/android.png"),
          text: "Android攻城狮",
        },
        {
          icon: require("@/public/images/php.png"),
          text: "PHP攻城狮",
        },
        {
          icon: require("@/public/images/ios.png"),
          text: "IOS/C++攻城狮",
        },
      ],
      classlist: [],
    };
  },
  created() {
    this.get_general();
    this.getPathData();
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
          console.log(this.general_category_list);
        })
        .catch(() => {
          this.$message({
            message: "获取总目录分类信息有误，请联系客服工作人员",
          });
        });
    },

    getPathData() {
      this.$http.get("/pathData").then((res) => {
        console.log(res);
        let data = res.data.data;
        this.classlist = data.classlist;
      });
    },
    toClassDetail(id) {
      this.$router.push({ name: "cdetail", params: { id } });
    },
    toTypeDetail(id) {
      this.$router.push({ name: "type", params: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.type-list {
  padding: 0 1rem;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  .type-item {
    flex-shrink: 0;
    padding: 0.5rem 1.5rem;
    text-align: center;
    .icon {
      display: inline-block;
      width: 3rem;
    }
    &:active {
      background-color: #ebebeb;
    }
  }
}

.class-list {
  flex-wrap: wrap;
  .class-item {
    flex-basis: 48% !important;
    border: 0.1rem solid #ebebeb;
    margin-bottom: 1.5rem;
    box-shadow: 0 0 1rem 0.1rem rgba($color: #000, $alpha: 0.1);
    .info {
      padding: 1rem;
      .title {
        font-size: 13px;
        color: #414d2f;
      }
      .tips {
        font-size: 10px;
        color: #7a7878;
      }
      .money {
        color: red;
      }
    }
    &:active {
      background-color: #ebebeb;
    }
  }
}

</style>
