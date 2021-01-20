import { summaryFileName } from '@angular/compiler/src/aot/util';
import { Component, Input, OnInit } from '@angular/core';
import { GrabSQLITEService } from '../grab-SQLITE/grab-sqlite.service';
import { PlayerStats } from '../interfaces/StatsComparisons';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  constructor(private sqServ: GrabSQLITEService) { }



  playerA: PlayerStats = this.sqServ.mockupPlayer();
  playerB: PlayerStats = this.sqServ.mockupPlayer();


  ngOnInit(): void {
    this.playerA.win_loss_data = [20, 55];
    this.playerA.athlete_name = 'Roger';
    this.playerA.wl_ratio = Math.floor(this.playerA.win_loss_data[0] / (this.playerA.win_loss_data[0] + this.playerA.win_loss_data[1]) * 100);
    this.playerA.matches_duration_data = [100, 100, 120, 90, 130, 600, 560, 130, 10, 450]
    this.playerA.field_data_win = [100, 200, 300, 500]
    this.playerA.field_data_total = [200, 230, 600, 900]
    this.playerA.field_perc = [Math.floor(this.playerA.field_data_win[0] / (this.playerA.field_data_total[0]) * 100), Math.floor(this.playerA.field_data_win[1] / (this.playerA.field_data_total[1]) * 100), Math.floor(this.playerA.field_data_win[2] / (this.playerA.field_data_total[2]) * 100), Math.floor(this.playerA.field_data_win[3] / (this.playerA.field_data_total[3]) * 100)];
    this.playerA.field_label = ["Clay [" + this.playerA.field_perc[0] + ' %]', "Hard [" + this.playerA.field_perc[1] + ' %]', "Carpet [" + this.playerA.field_perc[2] + ' %]', "Grass [" + this.playerA.field_perc[3] + ' %]'];
    this.playerA.matches_duration_average = Math.floor(this.playerA.matches_duration_data.reduce((a,b) => a + b, 0) / this.playerA.matches_duration_data.length);
    }

}
