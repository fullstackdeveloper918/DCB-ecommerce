import { HttpParams } from "@angular/common/http";

export function buildParams(userRole?: string, searchValue?: string, sort?: string): HttpParams {
  let params = new HttpParams();

  if (userRole) {
    params = params.set('user_role', userRole);
  }
  if (searchValue) {
    params = params.set('search', searchValue);
  }
  if (sort) {
    params = params.set('sort', sort);
  }

  return params;
}   