import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { apiResponse } from '../common/interfaces/apiResponse.interface';
import { Image } from '../common/interfaces/image.interface';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  public loadImages(page: number): Observable<apiResponse> {
    const params = new HttpParams()
      .set('key', environment.pixabyKey)
      .set('page', page);
    return this.http.get<apiResponse>(environment.pixabyUrl, { params: params }).pipe(
      map((res: apiResponse) => {
        return {
          hits: res.hits,
          totalHits: res.totalHits
        }
      })
    )
  }
}
