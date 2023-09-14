import {Component, Input, OnInit} from '@angular/core';
import {Pull} from "../../../model/pull";
import {Chart} from 'chart.js/auto';
import {HonkaiService} from "../../../../service/honkai.service";
import {SelectedBanner} from "../../../model/selectedBanner";

@Component({
  selector: 'app-wish-ratio',
  templateUrl: './wish-ratio.component.html',
  styleUrls: ['./wish-ratio.component.css']
})
export class WishRatioComponent implements OnInit {
  @Input()
  public selectedBanner: SelectedBanner | undefined = undefined;
  public chart: any;


  constructor(private honkaiService: HonkaiService) {
  }

  ngOnInit(): void {
    this.chart = new Chart('ratio-chart', {
      type: 'pie',
      data: {
        labels: ['3', '4', '5'],
        datasets: [{
          data: this.prepareData(),
          label: 'pulls',
          backgroundColor: ['#60A5FAFF', 'rgb(192 132 252)', 'rgb(251 191 36)']
        }
        ]
      },
      options: {
        responsive: true,
        borderColor: '#38393d',
        plugins: {
          legend: {
            position: 'left'
          }
        }
      }
    })
  }


  private prepareData() {
    return [5, 5, 3];
  }
}
