import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { catchError } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api.service.service';
Chart.register(...registerables);

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',  
  styleUrls: ['./bar-graph.component.scss'],
  providers: [DatePipe]
})
export class BarGraphComponent implements OnInit {

  constructor(private activ: ActivatedRoute,
    private api: ApiServiceService,
    private builder: FormBuilder,
    public datepipe: DatePipe) {

    this.chartFrom = this.builder.group({
      from: new FormControl('',[Validators.required]),
      to: new FormControl('',[Validators.required])
    })
  }
  reloadCurrentPage() {
    window.location.reload();
  }
  updateData() {
    this.m = this.chartFrom.value;
    this.chart()
  }

  barGraphData: any;
  apiData: any;
  chartFrom: any;
  devType: any;
  disabl!: boolean
  disabl1 = true;
  latest_from: any;
  latest_to: any;
  latest_date: any;

  m: any;
  laptop1 = 0
  printer1 = 0
  server1 = 0
  monitor1 = 0
  polycom1 = 0
  mobile1 = 0
  misc1 = 0
  phone1 = 0
  laptop2 = 0
  printer2 = 0
  server2 = 0
  monitor2 = 0
  polycom2 = 0
  mobile2 = 0
  misc2 = 0
  phone2 = 0
  a: any;
  c: any;
  con = true;

  chart() 
  {
    this.latest_from = this.m.form;
    this.latest_to = this.m.to;

    for (let x of this.barGraphData) {

      this.latest_date = this.datepipe.transform(x.PurchaseDate, 'YYYY-MM-dd');

      if (x.DevType == "Laptop/Desktop" && this.latest_date >= this.m.from && this.latest_date <= this.m.to) {
        this.laptop2++;

      }
      else if (x.DevType == "Printer" && this.latest_date >= this.m.from && this.latest_date <= this.m.to) {
        this.printer2++;

      }
      else if (x.DevType == "Server" && this.latest_date >= this.m.from && this.latest_date <= this.m.to) {
        this.server2++;

      }
      else if (x.DevType == "Monitor" && this.latest_date >= this.m.from && this.latest_date <= this.m.to) {
        this.monitor2++;

      }
      else if (x.DevType == "Polycom" && this.latest_date >= this.m.from && this.latest_date <= this.m.to) {
        this.polycom2++;

      }
      else if (x.DevType == "Mobile/Phone" && this.latest_date >= this.m.from && this.latest_date <= this.m.to) {
        this.mobile2++;
      }
      else if (x.DevType == "Misc" && this.latest_date >= this.m.from && this.latest_date <= this.m.to) {
        this.misc2++;

      }
      else {
        this.phone2++;
      }
    }

    this.disabl1 = false;
    this.disabl = true;
    this.c = new Chart("myChart2Canvas", {
      type: 'bar',
      data: {

        labels: ['Laptop/Desktop', 'Server', 'Printer', 'Polycom', 'Mobile/Phone', 'Monitor', 'Misc'],

        datasets: [{

          label: '# of Votes',

          data: [this.laptop2, this.server2, this.printer2, this.polycom2, this.mobile2, this.monitor2, this.misc2],

          backgroundColor: [

            'Red', 'Orange', 'Yellow', 'Green', '#0a20ad', 'Violet', 'Pink'

          ],

          borderColor: [

            'rgba(255, 99, 132, 1)',

            'rgba(54, 162, 235, 1)',

            'rgba(255, 206, 86, 1)',

            'rgba(75, 192, 192, 1)',

            'rgba(153, 102, 255, 1)',

            'rgba(255, 159, 64, 1)',
            'rgba(123, 159, 63, 0.8)',

          ],

          borderWidth: 1

        }]

      },

      options: {

        scales: {

          y: {

            beginAtZero: true

          }

        }

      }

    });

  }

  ngOnInit(): void {

    this.api.getAllDataFunc().pipe(catchError((err) => {
      return err
    })
    ).subscribe(res => {
      this.apiData = res;
      this.barGraphData = JSON.parse(this.apiData);

      for (let x of this.barGraphData) {

        if (x.DevType == "Laptop/Desktop") {
          this.laptop1++;
        }
        else if (x.DevType == "Printer") {
          this.printer1++;
        }
        else if (x.DevType == "Server") {
          this.server1++;
        }
        else if (x.DevType == "Monitor") {
          this.monitor1++;
        }
        else if (x.DevType == "Polycom") {
          this.polycom1++;
        }
        else if (x.DevType == "Mobile/Phone") {
          this.mobile1++;
        }
        else if (x.DevType == "Misc") {
          this.misc1++;
        }
        else {
          this.phone1++;
        }
        this.con = false;
      }

      new Chart("myChart1", {

        type: 'bar',

        data: {

          labels: ['Laptop/Desktop', 'Server', 'Printer', 'Polycom', 'Mobile/Phone', 'Monitor', 'Misc'],

          datasets: [{

            label: '# of Votes',

            data: [this.laptop1, this.server1, this.printer1, this.monitor1, this.polycom1, this.mobile1, this.misc1],

            backgroundColor: [

              'rgba(255, 99, 132, 0.8)',

              'rgba(54, 162, 235, 0.8)',

              'rgba(255, 206, 186, 0.8)',

              'rgba(75, 192, 192, 0.8)',

              'rgba(153, 102, 255, 0.8)',

              'rgba(255, 159, 64, 0.8)',
              'rgba(123, 159, 63, 0.8)',

            ],

            borderColor: [

              'rgba(255, 99, 132, 1)',

              'rgba(54, 162, 235, 1)',

              'rgba(255, 206, 86, 1)',

              'rgba(75, 192, 192, 1)',

              'rgba(153, 102, 255, 1)',

              'rgba(255, 159, 64, 1)',
              'rgba(123, 159, 63, 0.8)',

            ],

            borderWidth: 1

          }]

        },

        options: {

          scales: {

            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

  }

  


}
