import {EventEmitter, Injectable} from '@angular/core';
import {catchError, EMPTY, from, Observable, of, tap, map, Timestamp, BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pull} from "../shared/model/pull";
import {environment} from "../../environments/environment";
import {TimeRange} from "../shared/model/timeRange";
import {Banner} from "../shared/model/banner";
import {Banners} from "../shared/model/banners";
import {Characters} from "../shared/model/characters";
import {log10} from "chart.js/helpers";


@Injectable({
  providedIn: 'root'
})
export class HonkaiService {

  private readonly LAST_PULLED_KEY = 'lastpulled';
  private readonly CACHE_THRESHOLD = 10000
  private updating:BehaviorSubject<Pull[]>|undefined

  constructor(private httpClient: HttpClient) {
    if (!localStorage.getItem(this.LAST_PULLED_KEY)) {
      localStorage.setItem(this.LAST_PULLED_KEY, '0')
    }
  }


  getPulls(forceUpdate: boolean = false, source: string = ''): Observable<Pull[]> {
    console.debug("pulling", source)
    const lastUpdated = this.getLastUpdated()

    console.log(forceUpdate, new Date().getTime(),lastUpdated.getTime())
    if (!forceUpdate && (new Date().getTime() - lastUpdated.getTime()) < this.CACHE_THRESHOLD) {
      console.debug("pulling", "using cache", source)
      return of(JSON.parse(localStorage.getItem('pulls')!));
    }

    if (this.updating) {
      console.log('pulling', 'waiting')
      return this.updating
        .pipe(
          tap(pulls => {
            console.debug('pulling', 'done waiting')
          })
        );
    } else {
      console.log('pulling', 'pull init')
      this.updating = new BehaviorSubject<Pull[]>([])

      return this.httpClient.get<Pull[]>(environment.baseUrl + '/pulls/all')
        .pipe(
          tap(pulls => {
            localStorage.setItem('pulls', JSON.stringify(pulls));
            localStorage.setItem(this.LAST_PULLED_KEY, Date.now().toString())
            this.updating?.next(pulls)
            this.updating?.complete()
            this.updating = undefined
            console.log('pulling', 'done from server')
          }),
          catchError((err, o) => {
            console.log(err);
            return EMPTY;
          }));
    }

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

  private getLastUpdated(): Date {
    let item = localStorage.getItem(this.LAST_PULLED_KEY);
    if (item == null) {
      return new Date(0)
    } else {
      return new Date(parseInt(item))
    }
  }
}
