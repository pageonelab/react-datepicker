import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

const DatePickerCustomHeaderOneColumn = ({
  monthDate,
}: ReactDatePickerCustomHeaderProps) => {
  const locale = "en-US";

  return (
    <div className="py-3 pl-4 text-left font-medium text-black">
      {monthDate.toLocaleString(locale, {
        month: "long",
        year: "numeric",
      })}
    </div>
  );
};

export default DatePickerCustomHeaderOneColumn;
