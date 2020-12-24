<script>
import { onMounted, ref, reactive, watch } from "vue";

export default {
  setup() {
    const roadY = ref([]);
    const roadPosition = ref(0);
    const outTime = ref(20);

    const cars = reactive([
      { id: 1, bottom: 160 },
      { id: 2, bottom: 160 },
      { id: 3, bottom: 160 },
      { id: 4, bottom: 160 },
      { id: 5, bottom: 160 },
      { id: 6, bottom: 160 },
    ]);

    const carsWs = ref({});

    const winner = ref(1);
    const showWinner = ref(false);

    const startRace = ref(false);
    const startRaceWs = ref(false);

    const reset = ref(false);
    const resetWs = ref(false);

    // 連線 websocket
    const ws = new WebSocket("ws://120.115.2.76:8443/?id=car");

    // 群發
    const wsSend = () => {
      console.log("送出：開始比賽？", startRace.value);
      console.log("送出：重來一次？", reset.value);
      console.log("送出：領先者為？", winner.value);
      ws.send(
        JSON.stringify({
          event: "race",
          wsWinner: winner.value,
          startRaceWs: startRace.value,
          resetWs: reset.value,
        })
      );
    };


    let raceTimer = null;
    let countDownTimer = null;
    let TimeoutTimer = null;

    // 取得目前領先者
    const chkWinner = () => {
      let max = 0;
      cars.forEach((car, index) => {
        if (car.bottom > max) {
          max = car.bottom;
          winner.value = car.id;
        }
      });
    };

    // 停止比賽
    const stopAll = (mode) => {
      clearInterval(raceTimer);
      clearInterval(countDownTimer);
      clearTimeout(TimeoutTimer);

      if (mode === "end") {
        chkWinner();
        showWinner.value = true;
        console.log("=== 比賽結束 ===");
      }
      startRace.value = false;
    };

    // 開始比賽
    const start = () => {
      startRace.value = !startRace.value;
      wsSend();
    };

    // 監控開始比賽
    watch(startRaceWs, (newState, oldState) => {
      // console.log("carsWs", carsWs.value[1].bottom[1]);

      if (newState) {
        console.log("=== 比賽開始 ===");
        let i = 0;
        const bottomArr = Object.values(carsWs.value).map(
          (item) => item.bottom
        );
        // 每 0.1 秒讀取一次資料
        raceTimer = setInterval(() => {
          roadPosition.value = roadY.value[i];
          cars.forEach((car, num) => {
            car.bottom = bottomArr[num][i];
            chkWinner();
          });
          i++;
        }, 100);

        outTime.value--;
        countDownTimer = setInterval(() => {
          outTime.value--;
        }, 1000);

        TimeoutTimer = setTimeout(() => {
          stopAll("end");
        }, 20000);
      } else {
        stopAll();
      }
    });

    // 重來一次
    const reStart = () => {
      reset.value = true;
      wsSend();
    };

    // 監控重來一次一次
    watch(resetWs, (newRestart, oldRestart) => {
      console.log("=== 重來一次 ===");
      stopAll();
      // icon.value = "el-icon-video-play";
      // type.value = "primary";
      startRace.value = false;
      roadPosition.value = 0;
      outTime.value = 20;
      showWinner.value = false;
      winner.value = 1;
      cars.forEach((car, index) => {
        car.bottom = 160;
      });
      wsSend();
    });

    // 透過 onmessage 接收 server 傳送的訊息
    onMounted(() => {
      ws.onmessage = function (e) {
        let m = JSON.parse(e.data);
        switch (m.event) {
          case "race":

            resetWs.value = m.resetWs;
            startRaceWs.value = m.startRaceWs;
            winner.value = m.wsWinner;
            carsWs.value = m.cars;
            roadY.value = m.roadY;

            console.log("接收：開始比賽？", startRaceWs.value);
            console.log("接收：重來一次？", resetWs.value);
            console.log("接收：領先者為？", winner.value);
            console.log("接收：車資料為？", carsWs.value);
            console.log("接收：路資料為？", roadY.value);
            break;
        }
      };
    });
    return {
      roadPosition,
      start,
      outTime,
      reStart,
      cars,
      winner,
      showWinner,
    };
  },
};
</script>

<template>
  <el-row :gutter="20">
    <el-col
      :lg="12"
      id="road"
    >
      <el-row>
        <el-col
          v-for="(car) in cars"
          :key="car.id"
          :span="4"
        >
          <div
            class="road-line"
            :style="`background-position-y: ${roadPosition}px;`"
          >
            <img
              :src="require('../assets/images/car' + car.id + '.png')"
              :alt="`第${car.id}台車`"
              :style="`bottom:${car.bottom}px;`"
              class="car"
            />
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :lg="12">
      <div class="grid-content bg-purple-light">
        <el-button
          type="primary"
          icon="el-icon-video-play"
          @click="start"
          v-if="!roadPosition"
        >點我開始</el-button>

        <el-button
          type="warning"
          icon="el-icon-refresh-right"
          @click="reStart"
          v-show="showWinner"
        >再來一次</el-button>

        <el-button
          type="success"
          icon="el-icon-time"
          v-if="roadPosition"
          plain
        >倒數計時: {{ outTime }}</el-button>

        <span class="text">
          <span
            class="text"
            v-show="showWinner"
          >優勝者：</span>
          <span
            class="text"
            v-show="!showWinner"
          >領先者：</span>
          <img
            :src="require('../assets/images/car' + winner+'.png')"
            :alt="`${winner}`"
            style="vertical-align:middle"
          />
        </span>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss">
#road {
  height: calc(100vh - 250px);
  // border: 2px solid #000;
  background: #808080;
}

.road-line {
  // background: rgb(87, 86, 86);
  height: calc(100vh - 267px);
  background: #808080 url(~@/assets/images/road-line2.png) repeat-y;
  background-size: contain;
  position: relative;
}
.car {
  position: absolute;
  right: 25%;
}
.text {
  display: inline-block;
  line-height: 1rem;
  margin: 10px;
}
</style>
