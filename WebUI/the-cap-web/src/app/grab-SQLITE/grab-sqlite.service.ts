import { Injectable } from '@angular/core';
import { PlayerStats } from '../interfaces/StatsComparisons';

@Injectable({
  providedIn: 'root'
})
export class GrabSQLITEService {

  constructor() { }

  mockupPlayer(name: string): PlayerStats {
    let player: PlayerStats = {
      athlete_name: name,
      win_loss_data : [5557, 679],
      wl_ratio : 0,
      matches_duration_data : [{ x: 0, y: 134 },
      { x: 1, y: 186 },
      { x: 2, y: 245 },
      { x: 3, y: 43 },
      { x: 4, y: 76 },
      { x: 5, y: 890 },
      { x: 6, y: 123 },
      { x: 7, y: 122 },
      { x: 8, y: 176 },
      { x: 9, y: 300 }],
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

    return player;
  }
}
