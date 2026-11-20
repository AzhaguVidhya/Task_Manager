import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

function Calendar({tasks}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (amount) => {
    setCurrentDate(new Date(year, month + amount, 1));
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="h-[calc(100vh-120px)] overflow-y-hidden ">
      {/* Page Heading */}
      <div>
        {/* <h2 className="text-2xl font-bold text-gray-800">
          Calendar
        </h2> */}
        <p className="m-2 text-sm text-gray-500">
          View and manage your schedule.
        </p>
      </div>

      {/* Calendar Card */}
      <div className="rounded-xl bg-white p-2 shadow-sm sm:p-6 n">
        {/* Month Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 sm:text-xl">
            {monthName}
          </h3>

          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="rounded-lg border p-2 hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => setCurrentDate(new Date())}
              className="rounded-lg bg-teal-600 px-3 py-2 text-sm text-white hover:bg-teal-700"
            >
              Today
            </button>

            <button
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="rounded-lg border p-2 hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Weekday Names */}
        <div className="grid grid-cols-7">
          {days.map((day) => (
            <div
              key={day}
              className="border-b py-3 text-center text-xs font-semibold text-gray-500 sm:text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Dates */}
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="min-h-16 border-b border-r border-gray-100 sm:min-h-24"
            />
          ))}

          {Array.from({ length: daysInMonth }, (_, index) => {
            const date = index + 1;
            const isToday =
              date === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();
            const dateKey = [
                    year,
                    String(month + 1).padStart(2, "0"),
                    String(date).padStart(2, "0"),
                    ].join("-");

                    const dayTasks = tasks.filter(
                    (task) => task.dueDate === dateKey
                    );
            return (
              <div
                key={date}
                className="min-h-16 border-b border-r border-gray-100 p-1.5 transition hover:bg-teal-50 sm:min-h-24 sm:p-3"
              >
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                    isToday
                      ? "bg-teal-600 font-bold text-white"
                      : "text-gray-700"
                  }`}
                >
                  {date}
                </span>
               {dayTasks.map((task) => {
                    const isOverdue =
                        new Date(year, month, date) < new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                        ) && task.status !== "Completed";

                    return (
                        <p
                        key={task.id}
                        title={task.title}
                        className={`mt-1 truncate rounded px-1 py-0.5 text-xs ${
                            isOverdue
                            ? "bg-red-100 text-red-700"
                            : task.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-teal-100 text-teal-700"
                        }`}
                        >
                        {task.title}
                        </p>
                    );
                    })}
                </div>
            );
          })}
        </div>

        {/* Footer */}
        
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                {month === today.getMonth() &&
                    year === today.getFullYear() && (
                <>
                    <CalendarDays size={18} className="text-teal-600" />
                    Today's date is highlighted.
                </>
                )}
            </div>
        
      </div>
    </div>
  );
}

export default Calendar;
