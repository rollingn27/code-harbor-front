<template>
  <div class="code-header">
    <div class="header-left">
      <img src="@/assets/logoCodeHarbor.png" alt="code harbor" />
      <div class="code-harbor">Code Harbor <span>with algorithm</span></div>
    </div>
    <div class="header-right">
      <div class="user-info"><span>Rolling</span>님 안녕하세요.</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.code-header {
  width: 100%;
  height: 90px;

  display: flex;
  padding: 0 2rem;
  position: relative;

  .header-left,
  .header-right {
    width: 50%;
    overflow: hidden;
    color: #808080;
  }
  .header-left {
    display: flex;
    .code-harbor {
      font-size: 3rem;

      font-weight: bold;
      margin: auto 0 0 0;
      span {
        font-size: 1.25rem;
      }
    }
  }
  .header-right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 1.25rem;
    span {
      font-size: 2rem;
      font-style: italic;
    }
  }
}
.code-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 2%;
  width: 96%;
  border-bottom: 1px solid #808080;
}
</style>
