
import { Component, OnInit, Input, ElementRef, ViewChild  } from '@angular/core';
import { ShortLinkService } from '../short-link.service';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  
})
export class AnalyticsComponent implements OnInit {
  @Input() modalId: string = '';
  @ViewChild('modal') modal!: ElementRef;
  analyticsData: any[] = [];
  showModal = false;
  chartOptions: AgChartOptions = {}; 

  constructor(private shortLinkService: ShortLinkService) {
    
  }

  ngOnInit() {
    this.loadAnalyticsData();
  }

  loadAnalyticsData() {
    this.shortLinkService.getAnalytics()
      .subscribe(
        data => {

          console.log(data.analytics);

          for (let i = 0; i < data.analytics.length; i++) {
            const eachChartOptions: AgChartOptions = {
              data : 
                data.analytics[i].visitors
              ,
              series: [{ type: 'bar', xKey: 'date', yKey: 'count' }]
            }

            let eachData = data.analytics[i];
            eachData['chartOptions'] = eachChartOptions;
            this.analyticsData.push(eachData);
          }

        },
        error => {
          console.error(error);
          
        }
      );
  }

  openModal(modelId: string) {
    const element = document.getElementById(`${modelId}`);
    if (element) {
      (element as HTMLElement).style.display = 'block';
    }
  }

  closeModal(modelId: string) {
    const element = document.getElementById(`${modelId}`);
    if (element) {
      (element as HTMLElement).style.display = 'none';
    }
  }
}

