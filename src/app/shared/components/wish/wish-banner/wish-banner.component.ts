import {Component, Input, OnInit} from '@angular/core';
import {Pull} from "../../../model/pull";
import {Utils} from "../../../utils";
import {Banner} from "../../../model/banner";
import {SelectedBanner} from "../../../model/selectedBanner";
import {HonkaiService} from "../../../../service/honkai.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-wish-banner',
  templateUrl: './wish-banner.component.html',
  styleUrls: ['./wish-banner.component.scss']
})
export class WishBannerComponent implements OnInit {
  @Input()
  public selectedBanner: SelectedBanner | undefined;

  private pulls: Pull[] = [];

  constructor(private honkaiService: HonkaiService) {
  }

  ngOnInit(): void {
    this.honkaiService.getPulls(false, 'wish-banner')
      .subscribe(pulls => {
        if (this.selectedBanner) {
          this.pulls = pulls.filter(pull => pull.gacha_type == this.selectedBanner?.bannerType)
        } else {
          this.pulls = pulls;
        }
      });
  }


  toggleContent(content: HTMLDivElement) {
    if (content.classList.contains('hidden')) {
      content.classList.remove('hidden');
    } else {
      content.classList.add('hidden');
    }
  }

  // public updatePulls(pulls: Pull[]) {
  //   console.log('q');
  //   console.log(pulls);
  //   this.pulls.splice(0, this.pulls.length);
  //   this.pulls.push(...pulls.sort((a: Pull, b: Pull) => b.id - a.id));
  // }

  public lastPity(rank: number): number {
    return this.pulls.findIndex(p => p.rank_type === rank)
  }

  public lastPityFrom(rank: number, index: number): number {
    return 0;
    // const pity = this.pulls.slice(index + 1).findIndex(p => p.rank_type == rank);
    // if (pity < 0) {
    //   return this.pulls.slice(index + 1).length;
    // }
    // return pity + 1;
    // return Ut
  }

  public countPulls(): number {
    return this.pulls.length
  }

  private filteredPulls() {
    // if (this.banner) {
    //   return this.pulls.filter(pull => pull.gacha_type === this.banner?.type);
    // } else {
    //   return this.pulls.filter(pull => pull.gacha_type === this.banners[0].type);
    // }
  }
}
