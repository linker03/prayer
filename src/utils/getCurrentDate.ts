export function getCurrentDate() {
  const date = new Date();
  const month = (date.getMonth() + 1).toString();
  const day =
    date.getDate().toString().length == 1
      ? '0' + date.getDate().toString()
      : date.getDate();
  const hour =
    date.getUTCHours().toString().length == 1
      ? '0' + date.getUTCHours().toString()
      : date.getUTCHours();
  const minute =
    date.getUTCMinutes().toString().length == 1
      ? '0' + date.getUTCMinutes().toString()
      : date.getUTCMinutes();
  const seconds =
    date.getUTCSeconds().toString().length == 1
      ? '0' + date.getUTCSeconds().toString()
      : date.getUTCSeconds();
  const jsDate = `${date.getFullYear()}-${
    month.length == 1 ? '0' + month : month
  }-${day}T${hour}:${minute}:${seconds}.448+06:00`;

  return jsDate;
}
