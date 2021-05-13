import CalendarDate from "./calendar-date";

export default function Calendar(props) {
  var date = new Date(2000, 3);
  console.log(date);
  var todayDate = date.getDate();
  console.log(date.getFullYear());
  var year = date.getFullYear();
  var month = date.getMonth();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  firstDay = firstDay === 0 ? 7 : firstDay;
  // console.log(firstDay.getDay());
  console.log(firstDay);
  // month variable is 1 indexed
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  console.log(daysInMonth(month + 1, year));
  function getDateForCalendar(blockNum) {
    if (
      blockNum < firstDay ||
      blockNum > daysInMonth(month + 1, year) + firstDay - 1
    ) {
      return null;
    }
    return blockNum - firstDay + 1;
  }
  var calendar = [];
  var totalDivsInCalendar = firstDay - 1 + daysInMonth(month + 1, year);
  totalDivsInCalendar = Math.floor((totalDivsInCalendar + 6) / 7);
  for (var i = 0; i < totalDivsInCalendar; i++) {
    var calendarRow = [];
    for (var j = 0; j < 7; j++) {
      calendarRow.push(
        <CalendarDate
          setDate={props.setDate}
          date={getDateForCalendar(7 * i + j + 1)}
          today={todayDate}
        />
      );
    }
    calendar.push(<div className="table-row">{calendarRow}</div>);
  }

  return <div>{calendar}</div>;
}
