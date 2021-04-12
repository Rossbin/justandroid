<template>
  <div>
    <div class="wenda" v-show="editor == 1">
      <Userinfo />
      <div class="user-article">
        <span>已购买的课程：{{ course_total }}门</span>
      </div>
      <div class="edit">
        <el-button type="danger" size="small" plain @click="editor = 2"
          >编辑资料</el-button
        >
      </div>

      <div id="submit-video" class="section video">
        <div id="video-list-style" class="cube">
          <div id="submit-video-list" class="content">
            <ul class="clearfix cube-list">
              <li
                class="small-item fakeDanmu-item"
                v-for="list in myOrderList"
                :key="list.id"
              >
                <!-- <div class="cover"> -->
                <router-link
                  class="cover"
                  style="text-decoration: none"
                  :to="/cdetail/ + list.order_courses[0].course.id"
                >
                  <img :src="list.order_courses[0].course.course_img" alt="" />
                  <span class="length">{{ list.updated_time }}</span>
                </router-link>
                <!-- </div> -->
                <div class="title">{{ list.order_courses[0].course.name }}</div>
                <div class="meta">
                  <span class="play">
                    <i>￥{{ list.order_courses[0].price }}</i>
                  </span>
                  <span class="time">
                    <i>{{ list.order_status }}</i>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Edit v-show="editor == 2" />
      <div class="editback" v-show="editor == 2" @click="editor = 1">
        返回个人中心
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import Userinfo from "../user/userinfo";
import Edit from "../user/edit";
export default {
  data() {
    return {
      editor: 1, // 编辑按钮show
      course_total: "", // 订单总数
      myOrderList: "",
    };
  },
  activated() {
    this.get_course();
  },
  created() {},
  methods: {
    get_course() {
      let filters = {
        ordering: "-id", // 排序
        page_size: "40",
      };
      this.$axios({
        params: filters,
        method: "get",
        url:
          this.$settings.base_url +
          "/order/buys/" +
          this.$cookies.get("id") +
          "/",
        data: {},
        headers: { Authorization: "jwt " + this.$cookies.get("token") }, // 头部携带jwt+token登录后的信息
      })
        .then((response) => {
          // console.log(response.data.data);
          this.myOrderList = response.data.data;
          this.course_total = response.data.count;
        })
        .catch((error) => {
          this.$message({
            message: "获取课程信息有误，请联系客服工作人员",
          });
        });
    },
  },
  components: {
    Userinfo,
    Edit,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  word-break: break-word;
}
.user-article {
  display: flex;
  align-items: center;
  background-color: white;
  height: 11.111vw;
  padding: 0 2.778vw;
  border-top: 0.278vw solid #ddd;
  span {
    margin: 0 1.944vw;
    color: #777;
  }
}

.wenda {
  .edit {
    position: absolute;
    margin-top: -90px;
    margin-left: 240px;
  }
}
.editback {
  margin-top: 5.556vw;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  color: #999;
  padding: 4.167vw 0;
  font-size: 4vw;
  border: 1px solid rgb(175, 173, 173);
  border-right: 0px;
  border-left: 0px;
}
.section {
  border-bottom: 1px solid #eee;
  margin-bottom: 17px;
  position: relative;
  color: #222;
  font-size: 12px;
  line-height: 1.7em;
}
#page-video #submit-video .content {
  max-height: none;
}
#page-video #submit-video-list {
  margin-left: -10px;
}
#page-video .cube-list {
  width: 900px;
  margin-top: 20px;
}
.clearfix {
  display: block;
}
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  word-break: break-word;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.fakeDanmu-item .length {
  z-index: 5;
  transition: background 0.2s ease;
}
.small-item {
  width: 165px;
  float: left;
  margin-left: 10px;
  margin-top: 10px;
}
.small-item .length {
  background: #111;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px 0 0 0;
  color: #fff;
  line-height: 20px;
  transition: top 0.2s ease;
  padding: 0 6px;
  position: absolute;
  right: 0;
  bottom: 0;
}
.small-item .cover {
  background: url(//s1.hdslb.com/bfs/static/jinkela/space/assets/video-placeholder.png)
    50%;
  background-size: cover;
  border-radius: 4px;
  display: block;
  width: 160px;
  height: 100px;
  overflow: hidden;
  position: relative;
}
.small-item img {
  border-radius: 4px;
  display: block;
  width: 160px;
  height: 100px;
}
.small-item .title {
  display: block;
  line-height: 20px;
  height: 38px;
  margin-top: 6px;
  overflow: hidden;
}
.small-item .meta {
  color: #999;
  white-space: nowrap;
  font-size: 0;
  margin-top: 6px;
  height: 14px;
  line-height: 14px;
}
.small-item .meta > span:first-child {
  width: 78px;
  padding-left: 8px;
}
.small-item .meta > span {
  display: inline-block;
  white-space: nowrap;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  width: 60px;
  overflow: hidden;
}
</style>
