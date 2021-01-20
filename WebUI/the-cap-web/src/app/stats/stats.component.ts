import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { GrabSQLITEService } from '../grab-SQLITE/grab-sqlite.service';
import { PlayerStats } from '../interfaces/StatsComparisons';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(public test:GrabSQLITEService, private sqServ: GrabSQLITEService) {}

  pieDoc: HTMLCanvasElement
  timeDoc: HTMLCanvasElement
  FieldDoc: HTMLCanvasElement

  @Input() player: PlayerStats

  @ViewChild('pie_chart')
  set pieChart(el: ElementRef){
    this.pieDoc = el.nativeElement
    this.camembertChart()
  }
  @ViewChild('time_chart')
  set timeChart(el: ElementRef){
    this.timeDoc = el.nativeElement
    this.matchDurationChart()
  }
  @ViewChild('field_chart')
  set fieldChart(el: ElementRef){
    this.FieldDoc = el.nativeElement
    this.fieldVictoryChart()
  }

  camembertChart(): void {
    let winrate = Math.floor(this.player.win_loss_data[0] / (this.player.win_loss_data[0] + this.player.win_loss_data[1]) * 100)
    new Chart(this.pieDoc, {
        type: 'pie',
        data: {
            labels: this.player.win_loss_label,
            datasets: [{
                label: "W/L ratio % ",
                borderWidth: 3,
                backgroundColor: ["#66BB6A", "#EF5350"],
                borderColor: ["#449c49", "#ec3532"],
                data: this.player.win_loss_data
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: false,
                text: [this.player.athlete_name,'Win rate [ ' + winrate + ' %] ']
            }
        }
    });
}

matchDurationChart(): void {
  new Chart(this.timeDoc, {
      type: 'line',
      data: {
          labels: this.player.matches_duration_label,
          datasets: [{
              label: "duration (minutes) ",
              borderWidth: 3,
              borderColor: ["#0098c7"],
              backgroundColor: ["#aeecfe9e"],
              data: this.player.matches_duration_data
          }]
      },
      options: {
          legend: {
              display: false
          },
          title: {
              display: false,
              text: "Duration"
          },
          scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 600
                }
            }]
        }
      }
  });
}

fieldVictoryChart(): void {
  let winrate = Math.floor(this.player.win_loss_data[0] / (this.player.win_loss_data[0] + this.player.win_loss_data[1]) * 100)
  new Chart(this.FieldDoc, {
      type: 'bar',
      data: {
          labels: this.player.field_label,
          datasets: [
            {
              label: "Match won ",
              borderWidth: 3,
              backgroundColor: ["#ffffff33", "#ffffff33", "#ffffff33", "#ffffff33"],
              borderColor: ["#843c0180", "#1fa33980", "#7e01f480", "#6ad63880"],
              data: this.player.field_data_win
          },
          {
            label: "Match played ",
            borderWidth: 3,
            backgroundColor: ["#a34900", "#2b72ca", "#ff6183", "#a6f084"],
            borderColor: ["#843c01", "#1fa339", "#7e01f4", "#6ad638"],
            data: this.player.field_data_total
        }]
      },
      options: {
          legend: {
              display: false
          },
          title: {
              display: false,
              text: [this.player.athlete_name,'Win rate [ ' + winrate + ' %] ']
          },
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{
                    ticks: {
                        beginAtZero:false,
                        suggestedMin: 0
                    },
                    stacked: false
            }]
          }
      }
  });
}

  ngOnInit(): void {
  }
}
