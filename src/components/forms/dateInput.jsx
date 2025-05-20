import { useState, useEffect, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { id } from "date-fns/locale";
import "@/styles/datepicker.css";
import { SlCalender, SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { LuCalendarDays } from "react-icons/lu";

const DateInput = ({
  value,
  onDateChange,
  error,
  register,
  name,
  clearErrors,
  className,
  label,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value)); // Konversi value ke Date jika valid
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(date);
    setIsCalendarOpen(false);
    onDateChange(formattedDate);

    if (clearErrors) {
      clearErrors(name);
    }
  };

  const formatDateDisplay = (date) => {
    if (!date || isNaN(date)) return "";
    return format(date, "dd/MM/yyyy", { locale: id });
  };

  const renderDays = () => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < startDate.getDay(); i++) {
      days.push(<div className="day empty" key={`empty-${i}`} />);
    }

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const day = new Date(date);
      const isSelected = isSameDay(day, selectedDate);
      const isCurrent = isToday(day);

      days.push(
        <div
          key={day.toString()}
          className={`day ${isSelected ? "selected" : ""} ${
            isCurrent ? "today" : ""
          }`}
          onClick={() => handleDateChange(day)}
        >
          {day.getDate()}
        </div>
      );
    }

    return days;
  };

  return (
    <div ref={datePickerRef} className={`relative ${className}`}>
      <div className="relative">
        <label className="font-semibold text-black" htmlFor={id}>
          {label}
        </label>
        <input
          type="text"
          className={`form-datepicker w-full rounded border-[1.5px] ${
            error ? "border-red-500" : "border-black"
          } border border-black rounded-md text-black p-2 focus:outline-none w-full mt-2`}
          value={formatDateDisplay(selectedDate)}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          readOnly
          {...register(name)}
        />
        <div className="pointer-events-none absolute inset-1 left-auto right-2 flex items-center top-auto transform -translate-y-1/2">
          <LuCalendarDays className="size-5" />
        </div>
      </div>

      {error && (
        <div className="mt-1">
          <label className="label">
            <span className="break-words text-sm font-light text-red-500">
              {error}
            </span>
          </label>
        </div>
      )}

      {isCalendarOpen && (
        <div className="calendar-popup absolute top-full mt-2 z-50">
          <div className="calendar-header">
            <button
              type="button"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <SlArrowLeft />
            </button>
            <span>{format(currentMonth, "MMMM yyyy", { locale: id })}</span>
            <button
              type="button"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <SlArrowRight />
            </button>
          </div>
          <div className="calendar-weekdays">
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
              (day, index) => (
                <div key={index} className="day weekday">
                  {day}
                </div>
              )
            )}
          </div>
          <div className="calendar-grid">{renderDays()}</div>
        </div>
      )}
    </div>
  );
};

export { DateInput };
