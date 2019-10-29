<template>
  <span>
    <el-button
      v-if="showCurrentWeekBtn"
      :type="currentWeekIndex==selectedWeek?'primary':''"
      @click="onWeekSelected(currentWeekIndex)"
      size="small"
    >本周</el-button>
    <el-button
      size="small"
      icon="el-icon-arrow-left"
      :disabled="selectedWeek<=0"
      @click="onWeekSelected(selectedWeek-1)"
    >上一周</el-button>
    <el-button
      size="small"
      :disabled="selectedWeek>=monthWeeks.length-1"
      @click="onWeekSelected(selectedWeek+1)"
    >
      下一周
      <i class="el-icon-arrow-right el-icon--right"></i>
    </el-button>
  </span>
</template>

<script>
import util from "@/libs/util.js";
export default {
  name: "dm-week-selector",
  props: {
    month: {
      type: String
    }
  },
  data() {
    return {
      monthWeeks: [],
      selectedWeek: 0,
      selectedWeekDays: [],
      currentWeekIndex: 0,
      showCurrentWeekBtn: false //是否显示本周按钮 只有日期是本月才显示
    };
  },
  created() {
    this.getMonthWeeks(this.month);
  },
  watch: {
    month(v) {
      this.getMonthWeeks(v);
    }
  },
  methods: {
    getMonthWeeks(month) {
      let weeks = util.datehelper.getMonthWeeks(month);
      this.monthWeeks = weeks;
      let date = new Date(`${month}-01`);
      let currentDate = new Date();
      //判断是否是当前月
      if (
        currentDate.getFullYear() == date.getFullYear() &&
        currentDate.getMonth() == date.getMonth()
      ) {
        var day = currentDate.getDate();
        var today = `${currentDate.getMonth() + 1}-${
          day < 10 ? "0" + day : day
        }`;
        weeks.map((item, index) => {
          if (item.indexOf(today) >= 0) {
            this.currentWeekIndex = index;
          }
        });
        this.showCurrentWeekBtn = true;
      }
    },
    clearSelection(){
        this.selectedWeek =-1;
    },
    onWeekSelected(week) {
      this.selectedWeek = week;
      this.$emit("onWeekSelected",this.monthWeeks[week]);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>