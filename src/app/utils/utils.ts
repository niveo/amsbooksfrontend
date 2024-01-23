import { HttpParams } from "@angular/common/http";

export function formatFileSize(bytes: any, si = false, dp = 2) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + ' ' + units[u];
}

export function carregarParametros(paramsObject: any): HttpParams | any {
  if (!paramsObject) return undefined;
  if (paramsObject instanceof Object) {
    let params = new HttpParams();
    const obj = paramsObject;
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        if (obj[key] != undefined) {
          params = params.set(key, obj[key]);
        }
      }
    }
    return params;
  } else {
    if (paramsObject instanceof HttpParams) {
      return paramsObject;
    }
  }
}
