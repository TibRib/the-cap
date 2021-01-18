import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { GrabSQLITEService } from '../grab-SQLITE/grab-sqlite.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(public test:GrabSQLITEService) { }


  camembertChart(): void {
    let doc = document.getElementById("pie-chart")

    let winrate = Math.floor(this.test.win_loss[0] / (this.test.win_loss[0] + this.test.win_loss[1]) * 100)
    new Chart(doc, {
        type: 'pie',
        data: {
            labels: this.test.win_loss_labels,
            datasets: [{
                label: "W/L ratio % ",
                borderWidth: 3,
                backgroundColor: ["#66BB6A", "#EF5350"],
                borderColor: ["#449c49", "#ec3532"],
                data: this.test.win_loss
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: false,
                text: [this.test.athlete_name,'Win rate [ ' + winrate + ' %] ']
            }
        }
    });
}

matchDurationChart(): void {
  console.log('ok');
  let doc = document.getElementById("time-chart")

  let winrate = Math.floor(this.test.win_loss[0] / (this.test.win_loss[0] + this.test.win_loss[1]) * 100)
  new Chart(doc, {
      type: 'line',
      data: {
          labels: this.test.matches_duration_last_10_labels,
          datasets: [{
              label: "duration (minutes) ",
              borderWidth: 3,
              borderColor: ["#0098c7"],
              backgroundColor: ["#aeecfe9e"],
              data: this.test.matches_duration_last_10
          }]
      },
      options: {
          legend: {
              display: false
          },
          title: {
              display: false,
              text: [this.test.athlete_name,'Win rate [ ' + winrate + ' %] ']
          }
      }
  });
}

fieldVictoryChart(): void {
  console.log('ok');
  let doc = document.getElementById("field-chart")

  let winrate = Math.floor(this.test.win_loss[0] / (this.test.win_loss[0] + this.test.win_loss[1]) * 100)
  new Chart(doc, {
      type: 'bar',
      data: {
          labels: this.test.fields_label,
          datasets: [
            {
              label: "Match won ",
              borderWidth: 3,
              backgroundColor: ["#ffffff33", "#ffffff33", "#ffffff33", "#ffffff33"],
              borderColor: ["#843c0180", "#1fa33980", "#7e01f480", "#6ad63880"],
              data: this.test.field_data_win
          },
          {
            label: "Match played ",
            borderWidth: 3,
            backgroundColor: ["#a34900", "#2b72ca", "#ff6183", "#a6f084"],
            borderColor: ["#843c01", "#1fa339", "#7e01f4", "#6ad638"],
            data: this.test.fields_data_total
        }]
      },
      options: {
          legend: {
              display: false
          },
          title: {
              display: false,
              text: [this.test.athlete_name,'Win rate [ ' + winrate + ' %] ']
          },
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{
                    ticks: {
                        beginAtZero:false
                    },
                    stacked: false
            }]
          }
      }
  });
}

  ngOnInit(): void {
    this.camembertChart()
    this.matchDurationChart()
    this.fieldVictoryChart()
  }
}
