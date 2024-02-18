<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<style>
.spinner-container {
  position: fixed;
  top: calc(33.33vh - 24px);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid gray;
  border-top-color: gray;
  border-radius: 50%;
  animation: rotateBorder 0.5s linear infinite;
}

@keyframes rotateBorder {
  0% {
    transform: rotate(0deg);
    border-top-color: Orange;
  }
  16% {
    transform: rotate(60deg);
    border-top-color: Yellow;
  }
  32% {
    transform: rotate(120deg);
    border-top-color: Green;
  }
  48% {
    transform: rotate(180deg);
    border-top-color: Blue;
  }
  64% {
    transform: rotate(240deg);
    border-top-color: Indigo;
  }
  80% {
    transform: rotate(300deg);
    border-top-color: Purple;
  }
}
</style>
