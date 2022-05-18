import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pvnk-abilities',
  templateUrl: './pvnk-abilities.component.html',
  styleUrls: ['./pvnk-abilities.component.scss']
})
export class PvnkAbilitiesComponent implements OnInit {
  @Input() abilities: any;
  @Output() reRollEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  reRollAbility(abilityName: string) {
    this.reRollEvent.emit(abilityName);
  }

}
