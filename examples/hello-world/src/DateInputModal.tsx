import { DateTime } from "luxon";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import DatePickerCustomDay from "./DatePickerCustomDay";
import DatePickerCustomHeaderOneColumn from "./DatePickerCustomHeaderOneColumn";

import Modal from "./Modal";

type Props = {
  show: boolean;
  onClose: () => void;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateSaved?: (dates: [Date | null, Date | null]) => void;
};

const MIN_MONTHS = 24;

export default function DateInputModal({
  show,
  onClose,
  startDate: startDateProps,
  endDate: endDateProps,
  onDateSaved,
}: Props) {
  const [startDate, setStartDate] = useState<Date | null | undefined>(
    startDateProps
  );
  const [endDate, setEndDate] = useState<Date | null | undefined>(endDateProps);

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onDateSaved?.([start, end]);
    }
  };

  useEffect(() => {
    setStartDate(startDateProps);
  }, [startDateProps]);

  useEffect(() => {
    setEndDate(endDateProps);
  }, [endDateProps]);

  return (
    <Modal
      show={show}
      onClose={onClose}
      modalStyle="bottom"
      title={"Date input modal"}
    >
      <div className="relative flex h-[80vh] justify-center">
        {/* max width in Airbnb is 490px = 30.625rem */}
        <div className="max-w-[30.625rem] flex-1">
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            selectsRange
            monthsShown={MIN_MONTHS}
            // use this to bypass the type error
            {...({
              monthsShownStartDate: new Date(),
              shouldScrollToSelectedMonth: true,
            } as any)}
            showPopperArrow={false}
            inline
            renderCustomHeader={(p) => (
              <DatePickerCustomHeaderOneColumn {...p} />
            )}
            renderDayContents={(day, date) => (
              <DatePickerCustomDay dayOfMonth={day} date={date} />
            )}
            calendarClassName="react-datepicker--one-column"
          />
        </div>
      </div>
    </Modal>
  );
}
