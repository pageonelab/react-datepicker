declare module "react-datepicker" {
  import { ReactDatePickerProps as OriginalProps} from "@types/react-datepicker";

  export interface ReactDatePickerProps extends OriginalProps {
    monthsShownStartDate?: Date;
  }
  
  const DatePicker: React.ComponentType<ReactDatePickerProps<string, boolean>>;
  export default DatePicker;
}
