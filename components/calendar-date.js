export default function CalendarDate(props) {
  return (
    <div className={`table-cell h-32 w-32 ${props.date==="0"?"bg-transparent":"bg-yellow-400"} 
                      rounded-md border-4`}>
      <h1>
        {props.date==="0"? null:props.date}
      </h1>
    </div>
  )
}