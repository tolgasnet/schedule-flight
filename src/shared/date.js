import moment from "moment";

export const getDaysOfWeek = (startDate, endDate) => {
  const dates = [];

  const currDate = moment(startDate).startOf("day");
  const lastDate = moment(endDate).startOf("day");

  do {
    dates.push(currDate.format("dddd"));
  } while (currDate.add(1, "days").diff(lastDate) <= 0);

  return dates;
};

export const isInDateRange = (dateA, dateB, dateX, dateY) => {
  const overlap =
    moment.max(moment(dateA), moment(dateX)) <
    moment.min(moment(dateB), moment(dateY));

  return overlap;
};
