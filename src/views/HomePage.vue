<template>
  <code-harbor-header />
  <div class="code-harbor-main">
    <div class="side-bar">
      <div class="img-box">
        <img src="@/assets/sidebarIcon/shareproblem.png" alt="문제 공유" />
      </div>
      <div class="img-box">
        <img src="@/assets/sidebarIcon/statistics.png" alt="통계" />
      </div>
      <div class="img-box">
        <img src="@/assets/sidebarIcon/knowhow.png" alt="노하우" />
      </div>
      <div class="img-box">
        <img src="@/assets/sidebarIcon/help.png" alt="help" />
      </div>
      <div class="img-box">
        <img src="@/assets/sidebarIcon/logout.png" alt="log out" />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.code-harbor-main {
  display: flex;
  align-items: center;
  height: 50rem;
  .side-bar {
    margin-left: 7.25rem;
    width: 6rem;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(92, 88, 81, 0.5);
    .img-box {
      margin: auto;
      width: 5.25rem;
      height: 5.25rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      img {
        width: 4rem;
        height: 4rem;
        cursor: pointer;
      }
    }
  }
}
</style>
