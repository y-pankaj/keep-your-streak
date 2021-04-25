export default function CalendarDate(props) {
  return (
    <div className="h-32 w-32 bg-yellow-400 flex justify-center items-center rounded-md">
      {props.date}
    </div>
  )
}