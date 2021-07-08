export const YYYY_MM_DD = "yyyyMMdd";

export function isValidDate(dateString, format) {
  if (format === "yyyyMMdd") {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    let d = new Date(dateString);
    let dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
  }
}

export function format2NiceDate(date) {
  let d = new Date(date);

  let yyyy = d.getFullYear();
  let month = getMonthName(d);
  let dd = d.getDate();

  let hh = formatNo2TwoDigits(d.getHours());
  let mm = formatNo2TwoDigits(d.getMinutes());
  let ss = formatNo2TwoDigits(d.getSeconds());

  return month + " " + dd + ", " + yyyy + " " + hh + ":" + mm + ":" + ss;
}

export function format2Time (date) {
  let d = new Date(date);

  let hh = formatNo2TwoDigits(d.getHours());
  let mm = formatNo2TwoDigits(d.getMinutes());

  if (hh === "00") {

  }

  return hh + ":" + mm;
}

function getMonthName(date) {
  let month = [];
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  return month[date.getMonth()];
}

function formatNo2TwoDigits(number) {
  return ("0" + number).slice(-2);
}
