export default function CalendarDate({ setDate, toggleTodo, today, date }) {
  return (
    <div
      onClick={() => {
        setDate(date);
        toggleTodo();
      }}
      className={`table-cell h-32 w-32 rounded-md border-4 p-auto
                      ${
                        date === null
                          ? "bg-yellow-200"
                          : date === today
                          ? "bg-yellow-600"
                          : "bg-yellow-400"
                      } 
                      `}
    >
      <h1 className="text-3xl">{date}</h1>
    </div>
  );
}
