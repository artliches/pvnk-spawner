import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pvnk-abilities',
  templateUrl: './pvnk-abilities.component.html',
  styleUrls: ['./pvnk-abilities.component.scss']
})
export class PvnkAbilitiesComponent implements OnInit {
  @Input() abilities: any;

  constructor() { }

  ngOnInit(): void {
  }

}
