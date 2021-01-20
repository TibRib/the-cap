import { Injectable } from '@angular/core';
import { PlayerStats } from '../interfaces/StatsComparisons';

@Injectable({
  providedIn: 'root'
})
export class GrabSQLITEService {

  constructor() { }

  initFullPlayer(name:string): PlayerStats {
    let player = this.mockupPlayer();
    //json = TODO request API

    return player;
  }

  mockupPlayer(): PlayerStats {
    let player: PlayerStats = {
      athlete_name: 'Djokovic',
      win_loss_data : [5557, 679],
      wl_ratio : 0,
      matches_duration_data : [145, 40, 456, 234, 234, 222, 21, 456, 489, 100],
      matches_duration_average: 0,
      matches_duration_label : ['01-01-1902', '01-01-1902', '01-01-1902', '01-01-1902', '01-01-1902',
        '01-01-1902', '01-05-1904', '01-05-1905', '01-05-1955', '01-01-1999'],
      field_data_total : [3456, 4565, 1500, 500],
      field_data_win : [1456, 2000, 1400, 400],
      field_perc : [0, 0, 0],//[Math.floor(field_data_win[0] / (field_data_total[0]) * 100), Math.floor(field_data_win[1] / (field_data_total[1]) * 100), Math.floor(field_data_win[2] / (field_data_total[2]) * 100), Math.floor(player.field_data_win[3] / (player.field_data_total[3]) * 100)],
      field_label : ['0', '0', '0', '0'],//["Clay " + field_perc[0] + ' %', "Hard " + field_perc[1] + ' %', "Carpet " + field_perc[2] + ' %', "Grass " + field_perc[3] + ' %']
      win_loss_label: ['win', 'loss']
    }

    player.field_perc = [Math.floor(player.field_data_win[0] / (player.field_data_total[0]) * 100), Math.floor(player.field_data_win[1] / (player.field_data_total[1]) * 100), Math.floor(player.field_data_win[2] / (player.field_data_total[2]) * 100), Math.floor(player.field_data_win[3] / (player.field_data_total[3]) * 100)];
    player.wl_ratio = Math.floor(player.win_loss_data[0] / (player.win_loss_data[0] + player.win_loss_data[1]) * 100);
    player.field_label = ["Clay [" + player.field_perc[0] + ' %]', "Hard [" + player.field_perc[1] + ' %]', "Carpet [" + player.field_perc[2] + ' %]', "Grass [" + player.field_perc[3] + ' %]'];
    player.matches_duration_average = Math.floor(player.matches_duration_data.reduce((a,b) => a + b, 0) / player.matches_duration_data.length);
    return player;
  }
}
