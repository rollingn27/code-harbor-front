<template>
  <div class="main-page">
    <v-container>
      <v-row justify="center" class="mb-6">
        <v-col v-for="(_, n) in 2" :key="n" cols="auto">
          <v-card
            width="400"
            class="group-radius"
            :class="['d-flex flex-column justify-center align-center']"
          >
            <v-card-item>
              <div class="text-h2 mb-1">그룹이름</div>
              <div class="text-h6">
                <div>인원수 : 00명</div>
                <div>Since 2023. 12. 20</div>
              </div>
            </v-card-item>
            <v-card-actions> <v-btn>가입하기</v-btn> <v-btn>가입하기</v-btn> </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="mb-6">
        <v-col v-for="(_, n) in 2" :key="n" cols="auto">
          <v-card width="400" :class="['d-flex flex-column justify-center align-center ']">
            <v-card-item>
              <div class="text-h2 mb-1">그룹이름</div>
              <div class="text-h6">
                <div>인원수 : 00명</div>
                <div>Since 2023. 12. 20</div>
              </div>
            </v-card-item>
            <v-card-actions>
              <v-btn v-if="false">가입하기</v-btn> <v-btn>가입하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.main-page {
  border-radius: 5px;
  box-shadow: 3px 3px 7px rgba(46, 44, 40, 0.5);
  width: 75vw;
  background: #e4f3f8;
  position: absolute;
  padding: 3rem 0;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 100px;
  overflow-y: auto;
  .text-h2 {
    margin-top: 3rem;
  }
  .text-h6 {
    margin-top: 3rem;
    text-align: end;
  }
  .group-radius {
    border-radius: 10px;
  }
}
.mb-6 > .v-col {
  margin: 2rem;
}
</style>
