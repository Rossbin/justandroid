<template>
  <div class="userinfo">
    <img src="@/public/images/bannerTop_new.png" alt="" class="backImg" />
    <user-detail :userInfo="model" />
  </div>
</template>

<script>
import userDetail from "@/components/userDetail";
export default {
  name: "Userinfo",
  data() {
    return {
      model: '',
    };
  },
  components: {
    userDetail,
  },
  methods: {
    getUser: function () {
      this.$axios({
        method: "get",
        url: this.$settings.base_url + "/user/getuser/" + this.$cookies.get("id") + "/",
        headers: {
          Authorization: "jwt " + this.$cookies.get("token"),
        }, // 头部携带jwt+token登录后的信息
      })
        .then((response) => {
        //   console.log(response.data);
          this.model = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // async userData() {
    //   const res = await this.$http.get("/user/" + localStorage.getItem("id"));
    //   this.model = res.data[0];
    // },
  },
  created() {
    this.getUser();  
    // this.userData();
  },
};
</script>

<style lang="scss" scoped>
.userinfo {
  .backImg {
    height: 91px;
    width: 100%;
  }
}
</style>