import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import DateInputModal from "./DateInputModal";

const App = () => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  // 3 days later
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
  );

  return (
    <>
      <button
        onClick={() => {
          setShowDateModal(true);
        }}
      >
        show date
      </button>
      {showDateModal && (
        <DateInputModal
          show={showDateModal}
          onClose={() => {
            setShowDateModal(false);
          }}
          startDate={startDate}
          endDate={endDate}
          onDateSaved={([from, to]) => {
            setStartDate(from);
            setEndDate(to);
            setShowDateModal(false);
          }}
        />
      )}
    </>
  );
};

export default App;
