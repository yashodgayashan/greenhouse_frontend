export function getIdFromUrl() {
  let url = window.location.href;
  return url.substring(url.lastIndexOf("/") + 1);
}
