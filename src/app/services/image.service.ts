import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../common/interfaces/image.interface';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  public loadImages(page: number): Observable<Image[]> {
    const params = new HttpParams()
      .set('key', environment.pixabyKey)
      .set('page', page);
    return this.http.get<Response>(environment.pixabyUrl, { params: params }).pipe(
      map((res: { [key: string]: any }) => {
        return res['hits']
      })
    )
  }
}
