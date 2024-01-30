import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

class FormatDay {
  dateFormat = "DD/MM/YYYY";
  formatDDMMYYYY = (date: Dayjs | string | undefined) => {
    if (!date) return "-";
    return dayjs(date).format("DD/MM/YYYY");
  };
  formatDDMMYYYYHH = (date: Dayjs | string | undefined) =>
    dayjs(date).format("DD/MM/YYYY, HH:mm");
  formatIsoString = (date: Dayjs) => dayjs(date).toISOString();
  disableDayBefore = (current: Dayjs, startDate: Dayjs) => current < startDate;
  disableDayAfter = (current: Dayjs) => dayjs().add(-1, "days") >= current;
  formatDayFormNow = (date: Dayjs | string | undefined) =>
    dayjs(date).fromNow();
}
export const _formatDay = new FormatDay();
