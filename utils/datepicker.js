 function dateformat() {
   const week = ["日", "一", "二", "三", "四", "五", "六"];
   const dateList = [];
   const full = {};
   for (let month = 0; month < 2; month++) {
     const date = new Date(
       new Date().setMonth(new Date().getMonth() + month, 1)
     );
     const currentYear = date.getFullYear();
     const currentMonth = date.getMonth() + 1;
     const currenDate = new Date(currentYear, currentMonth, 0);
     const days = currenDate.getDate();
     const dateItem = {
       date: `${currentYear}年${
        (currentMonth > 9 ? "" : "0") + currentMonth
      }月`
     };

     for (let day = 1; day <= days; day++) {
       currenDate.setDate(day);
       if (day === 1) {
         dateItem.list = new Array(currenDate.getDay()).fill(null);
       }
       const todayStatus =
         Date.parse(new Date(new Date().toLocaleDateString())) -
         Date.parse(currenDate);
       const date = `${currentYear}-${
        (currentMonth > 9 ? "" : "0") + currentMonth
      }-${(day > 9 ? "" : "0") + day}`;

       todayStatus <= 0 && (full[date] = false);
       dateItem.list.push({
         day,
         date,
         status: todayStatus > 0 ? -1 : todayStatus < 0 ? 1 : 0
       });
     }
     dateList.push(dateItem);
   }

   return {
     week,
     full,
     dateList,
   }
 }

 export default dateformat