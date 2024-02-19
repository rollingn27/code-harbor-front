<template>
  <div class="main-page">
    <div v-if="false" class="make-plan">네카라쿠배로 첫걸음.. 목표를 세우세요!</div>
    <div class="main-description">
      아직 속한 group이 없으시네요. <br />code harbor를 이용하려면 소속 group이 있어야 합니다.
    </div>
    <div class="main-content">
      <div class="content-box">
        <div class="img-box">
          <img src="@/assets/arrowRight.png" />
        </div>
        <div class="content-text" @click="groupCreate">그룹 생성하기</div>
      </div>
      <div class="content-box">
        <div class="img-box">
          <img src="@/assets/arrowRight.png" />
        </div>
        <div class="content-text cursor-help">Code Harbor 알아보기(물음표 아이콘 클릭)</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const groupCreate = () => {
  router.push({ path: '/group' })
}
</script>
<style lang="scss" scoped>
.main-page {
  border-radius: 5px;
  box-shadow: 3px 3px 7px rgba(46, 44, 40, 0.5);
  margin: 4.5rem;
  width: 80vw;
  height: 40rem;
  background: #e4f3f8;
  .make-plan {
    position: relative;
    text-align: end;
    top: -30px;
    text-decoration: underline;
    color: #909090;
  }

  .main-description {
    width: 65vw;
    margin: 2rem auto;
    text-align: left;
    font-size: 2rem;
    color: #666666;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    font-weight: bold;
  }
  .main-content {
    width: 60vw;
    margin: 3rem auto;

    .content-box {
      display: flex;
      flex-direction: row;
      cursor: pointer;
      .img-box {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-right: 1.5rem;
      }
      .content-text {
        color: #9370db;
        font-size: 2rem;
        font-weight: 500;
        margin: auto 0;
      }
    }
  }
}
</style>
