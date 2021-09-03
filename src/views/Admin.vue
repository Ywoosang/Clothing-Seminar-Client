<template>
<div class="wrapper"> 
  <div>관리자</div>
  <div v-for="(user, index) in users" :key="index">
    <div>{{ user.username }}({{ user.userid }})</div>
    <div>해당 회원의 현재 역할: {{ user.role }}</div>
    <button @click="changeAuth(index)">{{ user.change }}</button>
  </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      users: "",
      selected: "",
    };
  },
  created(){
    this.getUsersInfo();
  },
  methods: {
    async getUsersInfo() {
      try {
        const response = await fetch(`${this.$store.state.requestUrl}/admin`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const res = await response.json();
        const users = res.users.map((user) => {
          user.change =
            user.authority == "MEMBER" ? "투고 권한 부여" : "투고 권한 삭제";
          user.role =
            user.authority == "MEMBER" ? "일반 회원" : "투고 허용 회원";
          return user;
        });
        console.log(users);
        this.users = users;
      } catch (error) {
        console.log(error);
      }
    },
    async changeAuth(index) {
      const user = this.users[index];
      const status = confirm(
        `${user.username}에게 글쓰기 권한을 ${
          user.change.split(" ")[2]
        }하시겠습니까? `
      );
      if(!status) return;
      const userid = user.userid;
      console.log(user.authority);
      const authority = user.authority === "MEMBER" ? "POST_ALLOWED" : "MEMBER";
      const data = { userid, authority };
      fetch(`${this.$store.state.requestUrl}/admin`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
      .then(async ()=> {
        this.getUsersInfo()
        alert('권한 변경이 완료되었습니다');
      })
    },
  },
};
</script>

<style>
</style>