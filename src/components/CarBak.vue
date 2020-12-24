<script>
import { onMounted, ref, reactive, watch } from "vue";

export default {
  setup() {
    const icon = ref("el-icon-video-play");
    const type = ref("primary");
    const roadPosition = ref(0);
    const outTime = ref(20);

    const race = reactive({
      cars: [
        { id: 1, bottom: 160 },
        { id: 2, bottom: 160 },
        { id: 3, bottom: 160 },
        { id: 4, bottom: 160 },
        { id: 5, bottom: 160 },
        { id: 6, bottom: 160 },
      ],
    });

    const winner = ref(null);
    const raceState = ref(false);
    const raceStateWs = ref(false);

    const reset = ref(false);
    const resetWs = ref(false);

    // 連線 websocket
    const ws = new WebSocket("ws://120.115.2.76:8443/?id=car");
    // 群發
    const wsSend = () => {
      console.log("wsSend", raceState.value);
      ws.send(
        JSON.stringify({
          event: "race",
          wsWinner: winner.value,
          raceStateWs: raceState.value,
          resetWs: reset.value,
        })
      );
    };

    const showWinner = ref(false);

    const getRandomNum = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // const getLeft = (value) => {
    //   if (value < 0) {
    //     value = 0;
    //   } else if (value > 30) {
    //     value = 30;
    //   } else {
    //     value += getRandomNum(-1, 1);
    //   }
    //   return value;
    // };

    const getBottom = (value) => {
      if (value < 0) {
        value = 0;
      } else if (value > 230) {
        value = 230;
      } else {
        value += getRandomNum(-2, 2);
      }
      return value;
    };

    let timer = null;
    let timer3 = null;
    let TimeoutTimer = null;

    const stopAll = (mode) => {
      clearInterval(timer);
      clearInterval(timer3);
      clearTimeout(TimeoutTimer);
      icon.value = "el-icon-video-play";
      type.value = "primary";
      if (mode === "end") {
        let max = 0;
        race.cars.forEach((car) => {
          if (car.bottom > max) {
            max = car.bottom;
            winner.value = car.id;
          }
          showWinner.value = true;
        });
      }
      raceState.value = false;
    };

    const reStart = () => {
      reset.value = true;
      wsSend();
    };

    watch(resetWs, (newRestart, oldRestart) => {
      stopAll();
      icon.value = "el-icon-video-play";
      type.value = "primary";
      raceState.value = false;
      roadPosition.value = 0;
      outTime.value = 20;
      showWinner.value = false;
      race.cars.forEach((car) => {
        car.bottom = 160;
      });
    });

    const changeState = () => {
      raceState.value = !raceState.value;
      wsSend();
    };

    watch(raceStateWs, (newState, oldState) => {
      console.log("newState", newState);
      if (newState) {
        timer = setInterval(() => {
          roadPosition.value = +roadPosition.value + 60;
          race.cars.forEach((car) => {
            car.bottom = getBottom(car.bottom);
          });
        }, 100);

        outTime.value--;
        timer3 = setInterval(() => {
          outTime.value--;
        }, 1000);
        icon.value = "el-icon-video-pause";
        type.value = "info";

        TimeoutTimer = setTimeout(() => {
          stopAll("end");
        }, 20000);
      } else {
        stopAll();
      }
    });

    // 透過 onmessage 接收 server 傳送的訊息
    onMounted(() => {
      ws.onmessage = function (e) {
        let m = JSON.parse(e.data);
        let msg = "";
        // console.log("接收 server 傳送的訊息", m);
        // console.log("m.event", m.event);
        switch (m.event) {
          case "race":
            resetWs.value = m.resetWs;
            console.log("resetWs", resetWs.value);
            raceStateWs.value = m.raceStateWs;
            console.log("raceStateWs", raceStateWs.value);
            winner.value = m.wsWinner;
            break;
        }
      };
    });
    return {
      roadPosition,
      changeState,
      icon,
      type,
      outTime,
      reStart,
      showWinner,
      race,
      winner,
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
          v-for="(car) in race.cars"
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
          :type="type"
          :icon="icon"
          @click="changeState"
        ></el-button>
        <el-button
          type="warning"
          icon="el-icon-refresh-right"
          @click="reStart"
        >重來</el-button>
        <div class="text">倒數計時: {{ outTime }}</div>

        <div
          class="text"
          v-if="showWinner"
        >
          <h2>優勝者</h2>
          <img
            :src="require('../assets/images/car' + winner+'.png')"
            :alt="`${winner}`"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss">
#road {
  height: calc(100vh - 150px);
  // border: 2px solid #000;
  background: #808080;
}

.road-line {
  // background: rgb(87, 86, 86);
  height: calc(100vh - 167px);
  background: #808080 url(~@/assets/images/road-line2.png) repeat-y;
  background-size: contain;
  position: relative;
}
.car {
  position: absolute;
  right:25%;
}
.text {
  line-height: 1rem;
}
</style>
