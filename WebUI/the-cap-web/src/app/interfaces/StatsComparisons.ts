/* SQLITE Backend :
type PlayerStats struct {
}
*/
export interface PlayerStats{
    athlete_name : string;
    win_loss_data: Array<number>;
    win_loss_label: Array<string>;
    wl_ratio: number;
    matches_duration_data: Array<number>;
    matches_duration_label: Array<string>;
    matches_duration_average: number;
    field_data_total: Array<number>;
    field_data_win: Array<number>;
    field_label: Array<string>;
    field_perc: Array<number>;

}

interface point{
  x: number;
  y: number;
}
