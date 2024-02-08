import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { AppComponent } from '../app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PieController, ArcElement, Chart } from 'chart.js';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';


@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent ,HttpClientModule,BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit {


  //private document = inject(DOCUMENT);

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#ff0000',
                '#FF00FF',
                '#191970',

            ]
        }
    ],
    labels: []
  };
  //@ViewChild('myChart') chartRef: ElementRef;
  // @ViewChild("#myChart") myChart: ElementRef;
  constructor(private http: HttpClient, private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.http.get('http://localhost:80/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data.push(res.myBudget[i].budget);
        this.dataSource.labels[i] = res.myBudget[i].title;
        //createD3();
      }
    });

    this.createChart();

  };

  createChart() {
    Chart.register(PieController,ArcElement)
    // console.log(this.myChart)
     const ctx =  this.elementRef.nativeElement.querySelector('#myChart');
     //'const ctx = canvas.getContext('2d');
     var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource

    });
 }
}
