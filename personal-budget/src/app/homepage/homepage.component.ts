import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { AppComponent } from '../app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PieController, ArcElement, Chart } from 'chart.js';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import * as d3 from 'd3';
import { DataService } from '../data.service';
import { Data } from '@angular/router';




@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [HttpClientModule,BreadcrumbsComponent,ArticleComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  host: {ngSkipHydration: 'true'}
})

export class HomepageComponent implements OnInit {

  public  dataSource = {
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

  getBudgetData()  {

   const budgetData =  this.dataService.getData();

   budgetData.subscribe((res) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
   })
  }

  constructor(private http: HttpClient, private dataService: DataService, private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    console.log(this.dataSource)
    this.getBudgetData()
    this.createChart();
    this.drawChart();
  }

  createChart() {
    console.log("data: ", this.dataSource)
    Chart.register(PieController,ArcElement)
     const ctx =  this.elementRef.nativeElement.querySelector('#myChart');
     var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

  private svg: any;
  private width = 350
  private height = 350
  private margin = 50
  private radius = Math.min(this.width, this.height) / 2 - this.margin
  private colors = d3.scaleOrdinal(['#ffcd56',  '#ff6384', '#36a2eb', '#fd6b19', '#ff0000', '#FF00FF', '#191970',])
  //const colorScale = d3.scaleOrdinal(['#ffcd56',  '#ff6384', '#36a2eb', '#fd6b19', '#ff0000', '#FF00FF', '#191970',])

  drawChart() {
    const data = this.dataSource.datasets[0].data
    console.log(data)
    this.svg = d3.select("#my_data")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
    const pie = d3.pie<any>().value(d => d).sort(null)
    const arc = d3.arc().outerRadius(this.radius).innerRadius(30)

    const g = this.svg.selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc")

    g.append("path")
    .attr("d", arc)
    .attr("class", "arc")
    .style("fill", (d,i) => this.colors(i))
    .style("stroke", "#FFF")
    .style("stroke-width", 4)

    g.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .text(function(d) {return d.value})
    .style('font-size', 10)
    .style('fill', '#FFF')
    .style('text-anchor', 'middle')
  }

}




