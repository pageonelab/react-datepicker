() => {
  var today = new Date();
  var futureDateRangeStart = new Date(new Date().setDate(today.getDate() + 30));
  var futureDateRangeEnd = new Date(new Date().setDate(today.getDate() + 33));
  const [startDate, setStartDate] = useState(futureDateRangeStart);

  var styles = {
    container: {
      maxHeight: 300,
      overflowY: "scroll",
    },
  };

  return (
    <div style={styles.container}>
      <DatePicker
        selected={futureDateRangeStart}
        onChange={(date) => setStartDate(date)}
        monthsShown={6}
        startDate={startDate}
        endDate={futureDateRangeEnd}
        selectsRange={true}
        inline
        monthsShownStartDate={new Date()}
      />
    </div>
  );
};
