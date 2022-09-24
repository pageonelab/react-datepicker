() => {
  var today = new Date();
  var futureDateRangeStart = new Date(new Date().setDate(today.getDate() + 30));
  var futureDateRangeEnd = new Date(new Date().setDate(today.getDate() + 33));
  const [startDate, setStartDate] = useState(futureDateRangeStart);

  return (
    <DatePicker
      selected={futureDateRangeStart}
      onChange={(date) => setStartDate(date)}
      monthsShown={4}
      startDate={startDate}
      endDate={futureDateRangeEnd}
      selectsRange
      monthsShownStartDate={new Date()}
    />
  );
};
