<template>
  <div class="userdetail">
    <div>
      <div class="user_img">
        <img :src="$store.state.userInfo.icon" alt="" v-if="userInfo">
        <img src="@/public/images/default_img.jpg" alt v-else />
      </div>
      
      <div class="user_edit">
        <div>
          <p>
            
            <span class="user_text">昵称</span>
            <span>{{userInfo.first_name}}</span>
          </p>
          <p>
           
            <span class="user_text">性别</span>
             <span>{{userInfo.gender}}</span>
          </p>
          <p>
            
            <span class="user_text">邮箱</span>
            <span>{{userInfo.email}}</span>
          </p>
          <p>
            
            <span class="user_text">QQ号</span>
            <span>{{userInfo.tencent}}</span>
          </p>
        </div>
        

     
        <!-- <div  @click="$router.push('/index/edit')">
          <div class="user_editBtn">编辑资料</div>
        </div> -->
      </div>
    </div>
    <div>
      <h2 style="margin-left:30px">{{$store.state.userInfo.username}}</h2>
      <p v-if="userInfo.signature">{{userInfo.signature}}</p>
      <p v-else>这个人很神秘，什么都没有写</p>
    </div>
  </div>
</template>

<script>
export default {
    props:['userInfo']
};
</script>

<style scoped lang="scss">
.userdetail {
  background-color: white;
  padding: 2vw 3.333vw;
  > div:nth-child(1) {
    display: flex;
    .user_img {
      margin-right: 5.556vw;
      img {
        height: 23.611vw;
        width: 23.611vw;
        border-radius: 50%;
      }
    }
    .user_edit {
      flex: 1;
      div:nth-child(1) {
        // display: flex;
        p {
          flex: 1;
        //   display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 3.611vw;
          .user_text {
            color: #aaa;
          }
        }
        // p:nth-child(1),
        p {
        //   border-bottom: 0.278vw dashed #ccc;
        margin-bottom: 5px;
        margin-left: 15px;
        }
      }
      div:nth-child(2) {
        padding: 0.556vw 2.778vw;
        .user_editBtn {
          border: 0.278vw solid #fb7a9f;
          padding: 0.833vw;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fb7a9f;
          border-radius: 1.111vw;
        }
      }
    }
  }
  >div:nth-child(2){
      h2{
          margin: 2.778vw 0 0.833vw 0;
          font-weight: 400;
      }
     p{
         padding: 0;
         margin: 2.778vw 0 0 0;
         color: #999;
     }
  }
}
</style>