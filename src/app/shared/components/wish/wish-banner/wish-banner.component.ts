import {Component, Input} from '@angular/core';
import {Pull} from "../../../model/pull";
import {Utils} from "../../../utils";
import {Banner} from "../../../model/banner";

@Component({
  selector: 'app-wish-banner',
  templateUrl: './wish-banner.component.html',
  styleUrls: ['./wish-banner.component.scss']
})
export class WishBannerComponent {
  @Input()
  public pulls: Pull[] = [];

  @Input()
  public banner: Banner | undefined;

  @Input()
  public banners: Banner[] = [];

  identify(index: number, item: Pull) {
    return item.id;
  }

  toggleContent(content: HTMLDivElement) {
    if (content.classList.contains('hidden')) {
      content.classList.remove('hidden');
    } else {
      content.classList.add('hidden');
    }
  }

  public updatePulls(pulls: Pull[]) {
    console.log('q');
    console.log(pulls);
    this.pulls.splice(0, this.pulls.length);
    this.pulls.push(...pulls.sort((a: Pull, b: Pull) => b.id - a.id));
  }

  public lastPity(rank: number): number {
    // const pity = Utils.lastPityFromRank(this.filteredPulls(), 5);
    const  pity = this.filteredPulls().findIndex(p=>p.rank_type == rank)
    console.log("bannerpity", this.banner, this.filteredPulls())
    console.log(this.pulls.length)
    // if (pity < 0) {
    //   return this.pulls.length;
    // }
    return pity;
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

  private filteredPulls() {
    if (this.banner) {
      return this.pulls.filter(pull => pull.gacha_type === this.banner?.type);
    } else {
      return this.pulls.filter(pull => pull.gacha_type === this.banners[0].type);
    }
  }
}
