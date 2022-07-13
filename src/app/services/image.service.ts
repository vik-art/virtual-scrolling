import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiResponse } from '../common/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  public loadImages(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.pixabyUrl, {
        params: {
          key: environment.pixabyKey,
          page: page,
        },
      })
      .pipe(
        map((res: ApiResponse) => {
          return {
            hits: res.hits,
            totalHits: res.totalHits,
          };
        })
      );
  }
}
