const datehelper = {}

/**
 * 返回某个月的星期分组
 */
datehelper.getMonthWeeks = function (ym) {
    let ymArr = ym.split("-");
    let date = new Date(ymArr[0], ymArr[1], 0);
    let days = date.getDate();
    let monthWeeks = [[]];
    for (let i = 1; i <= days; i++) {
        var day = new Date(ymArr[0], ymArr[1]-1, i).getDay();
        monthWeeks[monthWeeks.length-1].push(`${ymArr[1]}-${i < 10 ? "0" + i : i}`)
        if(day==0){
            monthWeeks.push([]);
        }
    }
    return monthWeeks;
}

export default datehelper