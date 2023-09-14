import {ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Pull} from "../shared/model/pull";
import {Banner} from "../shared/model/banner";
import {HonkaiService} from "../service/honkai.service";
import {Banners} from "../shared/model/banners";
import {SelectedBanner} from "../shared/model/selectedBanner";
import {formatNumber} from "@angular/common";


@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {
  selectedBanner: SelectedBanner | undefined;
  private pulls: Pull[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private changeDetect: ChangeDetectorRef,
              private honkaiService: HonkaiService,
              private ngZone: NgZone) {
  }


  ngOnInit(): void {
    console.log("wish", 'update')
    let data = this.activatedRoute.snapshot.data
    if (data['gacha_type'] > 0) {
      this.selectedBanner = {
        bannerType: data['gacha_type'],
        bannerId: undefined,
      }
    } else {
      this.selectedBanner = undefined;
    }
    this.honkaiService.getPulls(false, 'wish')
      .subscribe(pulls => {
        if (this.selectedBanner) {
          this.pulls = pulls.filter(p=>p.gacha_type == this.selectedBanner?.bannerType);
        } else {
          this.pulls = pulls;
        }
      })
    console.log('wish', this.selectedBanner)

  }


  // selectBanner(id: number | null) {
  //   if (this.selectedBanner) {
  //     if (id) {
  //       this.selectedBanner.bannerId = this.
  //     } else {
  //       this.selectedBanner.bannerId = undefined;
  //     }
  //   }
  // }

  countPullsForBanner(banner: Banner) {
    // return this.pulls.filter(pull => pull.gacha_id == banner.id).length;
    return 0;
  }

  getSelectedBannerName() {
    if (this.selectedBanner) {
      return Banners.banners.find(b => b.type == this.selectedBanner?.bannerType);
    } else {
      return 'Total';
    }
  }

  getSortedBanners() {
    // return this.banners.sort((a, b) => b.id - a.id)
    //   .filter(banner => this.pulls.find(pull => pull.gacha_id == banner.id) != undefined)
    return [];
  }

  getLegendaryPityPercentage(rank: number) {
    console.log(this.pulls, this.pulls.filter(p => p.rank_type === 5).length)
    if (this.pulls.length > 0) {
      return `${(this.pulls.length / this.pulls.filter(p => p.rank_type === rank).length).toFixed(1)}`
    } else {
      return '0'
    }
  }


  protected readonly JSON = JSON;

  getTotalMoraSpent() {
    return (this.pulls.length*160).toString();
  }

  getLegendaryCount() {
    return this.pulls.filter(p=>p.rank_type===5).length.toString();
  }
}
