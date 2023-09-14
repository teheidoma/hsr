import {Component, Input, OnInit} from '@angular/core';
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {Banner} from "../../../model/banner";
import {HonkaiService} from "../../../../service/honkai.service";
import {Pull} from "../../../model/pull";
import {Utils} from "../../../utils";
import {Banners} from "../../../model/banners";
import {SelectedBanner} from "../../../model/selectedBanner";
import {flatMap, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-wish-last-legendary',
  templateUrl: './wish-last-legendary.component.html',
  styleUrls: ['./wish-last-legendary.component.scss']
})
export class WishLastLegendaryComponent implements OnInit {
  @Input()
  selectedBanner: SelectedBanner | undefined;
  faStar = faStar;
  private pulls: Pull[] = [];

  constructor(private honkaiService: HonkaiService) {

  }

  ngOnInit(): void {
    this.honkaiService.getPulls(false, 'wish-last-legendary')
      .subscribe(pulls => this.pulls = pulls)
  }

  filteredPulls() {
    let result: Pull[] = [];
    if (this.selectedBanner) {
      result = this.pulls.filter(pull => pull.gacha_type == this.selectedBanner?.bannerType)
    } else {
      result = this.pulls;
    }


    return result.filter(p => p.rank_type === 5).sort((a, b) => b.id - a.id);
  }

  getPityFrom(pull: Pull): number {
    return Utils.lastPityFrom(this.pulls, pull);
  }

  redGradiate(pityFrom: number) {
    return Utils.redGradiate(pityFrom);
  }

  getImg(pull: Pull) {
    return this.honkaiService.getAsset(pull, true);
  }

  isWin5050(pull: Pull) {
    // let fpulls = this.pulls.filter(p => p.gacha_type == this.banners[0].type && p.rank_type == 5);
    // console.log('win5050', fpulls)
    // let current = fpulls.findIndex(p => p.id == pull.id)
    // if (current == fpulls.length) {
    //   return false;
    // }
    // console.log('win5050', current, fpulls[current], fpulls[current + 1]);
    // console.log('win5050', current, this.filteredPulls());
    // return !this.isStandard(fpulls[current + 1]) && this.isGuaranteed(pull);
    return false;
  }

  isStandard(pull: Pull) {
    return Banners.banners.find(b => b.legendaryId == pull?.name.toLowerCase()) == undefined;
  }

  isGuaranteed(pull: Pull): boolean {
    console.log('garant', pull?.name,
      pull?.gacha_id,
      Banners.banners.find(b => b.legendaryId === pull?.name.toLowerCase())
    )
    return Banners.banners.find(b => b.legendaryId === pull?.name.toLowerCase()) != undefined;
  }

// isGuaranteed(pull: Pull): boolean|null {
//   let filtered = this.pulls
//     .filter(fpull => fpull.rank_type === 5)
//     .filter(fpull => {
//       if (this.banner) {
//         return fpull.gacha_type === this.banner.type;
//       } else {
//         if (this.banners.length > 0) {
//           return fpull.gacha_type === this.banners[0].type;
//         } else {
//           return true;
//         }
//       }
//     });
//
//   let index = filtered.indexOf(pull);
//   console.log('lastlegendary', filtered);
//   console.log('lastlegendary', pull);
//   // console.log('pity', pull, filtered[index - 1]);
//   //TODO
//   // console.log('pity', Banners.banners.find(b => b.id === pull.gacha_id)?.legendaryId);
//
//   // return Banners.banners.find(b => b.id === pull.gacha_id)?.legendaryId! === pull.id;
//   if (this.banner) {
//     return this.banner.id == pull.gacha_id && this.banner.legendaryId == pull.name;
//   } else if (this.banners.length > 0){
//     return this.banners[0].id == pull.gacha_id && this.banners[0].legendaryId == pull.name;
//   } else {
//     return null;
//   }
// }
}
