import { _formatDay } from "@/utils";
import { DatePicker, DatePickerProps } from "antd";

const AFDatePicker = ({ ...props }: DatePickerProps) => {
  return (
    <DatePicker className="w-full" format={_formatDay.dateFormat} {...props} />
  );
};
export default AFDatePicker;
