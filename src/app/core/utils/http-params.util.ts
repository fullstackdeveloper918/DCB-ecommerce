import { HttpParams } from '@angular/common/http';

export function buildHttpParams(paramsObj: Record<string, any>): HttpParams {
  let params = new HttpParams();
  Object.entries(paramsObj).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params = params.set(key, value.toString());
    }
  });
  return params;
}
