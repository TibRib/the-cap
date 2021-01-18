import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GrabSQLITEService {

  constructor() { }

  athlete_name = 'Novak Djokovic'
  win_loss = [5557, 679]
  win_loss_labels = ['win', 'loss']
  wl_ratio = Math.floor(this.win_loss[0] / (this.win_loss[0] + this.win_loss[1]) * 100)
  matches_duration_last_10 = [{x: 0, y: 134 },
                              {x: 1, y: 186},
                              {x: 2, y: 245},
                              {x: 3, y:  43},
                              {x: 4, y:  76},
                              {x: 5, y: 890},
                              {x: 6, y: 123},
                              {x: 7, y: 122},
                              {x: 8, y: 176},
                              {x: 9, y: 300}]

  matches_duration_last_10_labels = [ '01-01-1902', '01-01-1902', '01-01-1902', '01-01-1902', '01-01-1902',
                                      '01-01-1902', '01-05-1904', '01-05-1905', '01-05-1955', '01-01-1999',  ]

  fields_data_total  = [3456, 4565, 1500, 500]
  field_data_win = [1456, 2000, 1400, 400]
  perc = [Math.floor(this.field_data_win[0] / (this.fields_data_total[0]) * 100), Math.floor(this.field_data_win[1] / (this.fields_data_total[1]) * 100), Math.floor(this.field_data_win[2] / (this.fields_data_total[2]) * 100), Math.floor(this.field_data_win[3] / (this.fields_data_total[3]) * 100)]
  fields_label = ["Clay " + this.perc[0] + ' %', "Hard " + this.perc[1] + ' %', "Carpet " + this.perc[2] + ' %', "Grass " + this.perc[3] + ' %']
  }
