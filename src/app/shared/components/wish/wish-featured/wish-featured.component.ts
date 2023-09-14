import {Component, Input} from '@angular/core';
import {Banner} from "../../../model/banner";
import {HonkaiService} from "../../../../service/honkai.service";
import {SelectedBanner} from "../../../model/selectedBanner";

@Component({
  selector: 'app-wish-featured',
  templateUrl: './wish-featured.component.html',
  styleUrls: ['./wish-featured.component.scss']
})
export class WishFeaturedComponent {
  @Input()
  banner: SelectedBanner | undefined;

  constructor(private honkaiService: HonkaiService) {
  }

  getSrc(assetId: number|string|undefined) {
    if (this.banner && assetId) {
      if (typeof assetId == 'string'){
        return this.honkaiService.getAssetByName(assetId)
      } else {
        return this.honkaiService.getAssetById(assetId);
      }
    } else {
      return '';
    }
  }
}
