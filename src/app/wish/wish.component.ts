import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Pull} from "../shared/model/pull";
import {Banner} from "../shared/model/banner";
import {HonkaiService} from "../service/honkai.service";
import {Banners} from "../shared/model/banners";


@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {
  pulls: Pull[] = [];
  banners: Banner[] = [];
  selectedBanner: Banner | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private honkaiService: HonkaiService) {
  }


  ngOnInit(): void {
    this.honkaiService.getPulls()
      .subscribe(pulls => {
        this.showPulls(pulls);
      });
  }

  private showPulls(pulls: Pull[]) {
    this.activatedRoute.data
      .subscribe(data => {
        if (data['gacha_type'] > 0) {
          this.pulls = pulls.filter(p => p.gacha_type === data['gacha_type']).sort((a: Pull, b: Pull) => b.id - a.id);
          this.banners = Banners.banners.filter(b => b.type === data['gacha_type']);
          this.selectedBanner = this.banners.sort((a, b) => a.id - b.id)[0];
        } else {
          this.pulls = pulls;
          this.banners = [];
          this.selectedBanner = undefined;
        }
      });
  }

  selectBanner(id: number | null) {
    if (id) {
      this.selectedBanner = this.banners.filter(b => b.id === id)[0];
    } else {
      this.selectedBanner = undefined;
    }
  }

  countPullsForBanner(banner: Banner) {
    return this.pulls.filter(pull => pull.gacha_id == banner.id).length;
  }

  getSelectedBannerName() {
    if (this.selectedBanner) {
      return this.selectedBanner.name;
    } else {
      return 'Total';
    }
  }

  getSortedBanners() {
    return this.banners.sort((a, b) => b.id - a.id)
      .filter(banner => this.pulls.find(pull => pull.gacha_id==banner.id) != undefined)
  }

  protected readonly JSON = JSON;
}
