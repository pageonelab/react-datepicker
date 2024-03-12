// src/react-datepicker.d.ts
declare module "react-datepicker" {
  import { ReactDatePickerProps as OriginalProps } from "@types/react-datepicker";

  export interface ReactDatePickerProps extends OriginalProps {
    monthsShownStartDate?: Date;
  }
}
