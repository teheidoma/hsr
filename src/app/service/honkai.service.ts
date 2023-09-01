import {EventEmitter, Injectable} from '@angular/core';
import {catchError, EMPTY, from, Observable, of, tap, map} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pull} from "../shared/model/pull";
import {environment} from "../../environments/environment";
import {TimeRange} from "../shared/model/timeRange";
import {Assets} from "../shared/model/assets";
import {Banner} from "../shared/model/banner";
import {Banners} from "../shared/model/banners";
import {Characters} from "../shared/model/characters";


@Injectable({
  providedIn: 'root'
})
export class HonkaiService {
  public statusEvent: EventEmitter<any> = new EventEmitter();
  public updatedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
  }


  getPulls(forceUpdate: boolean = false, source: string = ''): Observable<Pull[]> {
    console.log('pulling', source);
    const cached = localStorage.getItem('pulls');
    if (!forceUpdate && cached && cached !== '[]') {
      return of(JSON.parse(localStorage.getItem('pulls')!));
    }

    return this.httpClient.get<Pull[]>(environment.baseUrl + '/pulls/all')
      .pipe(
        tap(pulls => {
          localStorage.setItem('pulls', JSON.stringify(pulls));
        }),
        catchError((err, o) => {
          console.log(err);
          return EMPTY;
        }));
  }


  getTime(): Observable<TimeRange[]> {
    const secret = localStorage.getItem('secret');
    return this.httpClient.get<TimeRange[]>(environment.baseUrl + '/time')
      .pipe(tap(ranges => {
        localStorage.setItem('ranges', JSON.stringify(ranges));
      }));
  }

  getAsset(pull: Pull, icon = false): string {

    if (Characters.characters.find(p => p == pull.name.toLowerCase()) != null) {
      return `${environment.staticUrl}/assets/${pull.name.toLowerCase()}${icon ? '_icon' : ''}.webp`;
    } else {
      return `${environment.staticUrl}/assets/${pull.item_id}-iconpath.png`;
    }
  }

  getAssetById(itemId: number): string {
    return `${environment.staticUrl}/assets/${itemId}-iconpath.png`;
  }

  getAssetByName(name: string): string {
    return `${environment.staticUrl}/assets/${name}.webp`;
  }

  fetchBannerIcon(pull: Pull) {
    return `${environment.staticUrl}/assets/banner/${pull.gacha_id}.webp'`;
  }

  getBannersByType(type: number): Banner[] {
    return Banners.banners.filter(banner => banner.type === type);
  }

  fullClear(): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/pulls/reset', '');
  }
}
