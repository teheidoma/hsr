import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Utils} from '../../../utils';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {Pull} from "../../../model/pull";
import {Banner} from "../../../model/banner";
import {HonkaiService} from "../../../../service/honkai.service";
import {formatDate} from "@angular/common";
import {SelectedBanner} from "../../../model/selectedBanner";
import {filter, flatMap, map, mergeMap, Observable, of} from "rxjs";
import {registrationRoutes} from "../../../../registartion/registration.module";
import {Banners} from "../../../model/banners";


@Component({
  selector: 'app-wish-table',
  templateUrl: './wish-table.component.html',
  styleUrls: ['./wish-table.component.css']
})
export class WishTableComponent implements OnInit {
  @Input()
  public selectedBanner: SelectedBanner | undefined;
  public selectedRanks = [5, 4, 3];
  faStar = faStar;
  pulls: Pull[] = [];

  constructor(private honkaiService: HonkaiService,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.honkaiService.getPulls(false, 'wish-table')
      .subscribe(pulls => {
        let result: Pull[] = [];
        if (this.selectedBanner) {
          console.log('table', this.selectedBanner)
          result = pulls.filter(pull => pull.gacha_type === this.selectedBanner?.bannerType);
        }
        this.pulls = result
      })
  }


  getPulls() {
    return this.pulls.filter(pull => this.selectedRanks.indexOf(pull.rank_type) !== -1)
  }

  getBannerName(pull: Pull) {
    let name = Banners.banners.find(banner => banner.id == pull.gacha_id)?.name;
    if (name == null) {
      return ''
    }
    return name;
  }

  public lastPity(rank: number): number {
    const pity = this.pulls.findIndex(p => p.rank_type == rank) + 1;
    if (pity < 0) {
      return this.pulls.length;
    }
    return pity;
  }

  public lastPityFrom(pull: Pull): number {
    return Utils.lastPityFrom(this.pulls, pull);
  }

  public fetchBannerIcon(pull: Pull) {
    return this.honkaiService.fetchBannerIcon(pull);
  }

  findIconForPull(pull: Pull) {
    return this.honkaiService.getAsset(pull, true);
  }


  // protected readonly formatDate = formatDate;

  isSelected(rank: number): boolean {
    return this.selectedRanks.find(selectedRank => selectedRank === rank) !== undefined;
  }

  toggleSelect(rank: number) {
    console.log(this.selectedRanks);
    const index = this.selectedRanks.indexOf(rank);
    console.log(index);
    if (index >= 0) {
      this.selectedRanks.splice(index, 1);
    } else {
      this.selectedRanks.push(rank);
    }
  }

  getPityColor(pull: Pull) {
    if (pull.rank_type > 3) {
      return Utils.redGradiate(this.lastPityFrom(pull), pull.rank_type === 4 ? 10 : 90);
    } else {
      return '';
    }
  }


  protected readonly formatDate = formatDate;
}
