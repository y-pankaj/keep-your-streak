export default function CalendarDate(props) {
  function setDate() {
    props.setDate(props.date);
  }

  return (
    <div
      onClick={setDate}
      className={`table-cell h-32 w-32 rounded-md border-4
                      ${
                        props.date === null
                          ? "bg-yellow-200"
                          : props.date === props.today
                          ? "bg-yellow-600"
                          : "bg-yellow-400"
                      } 
                      `}
    >
      <h1>{props.date}</h1>
    </div>
  );
}
