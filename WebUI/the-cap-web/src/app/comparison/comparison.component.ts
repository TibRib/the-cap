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

  playerA: PlayerStats = this.sqServ.mockupPlayer('Novak Djokovic')
  playerB: PlayerStats = this.sqServ.mockupPlayer('Roger Federer')


  ngOnInit(): void {
  }

}
