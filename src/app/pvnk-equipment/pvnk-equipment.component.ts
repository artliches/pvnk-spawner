import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { APPS, ARMOR, CYBERTECH, INFESTATION, NANO, START1, START2, START3, WEAPONS } from '../services/random-tables.constant';

@Component({
  selector: 'app-pvnk-equipment',
  templateUrl: './pvnk-equipment.component.html',
  styleUrls: ['./pvnk-equipment.component.scss']
})
export class PvnkEquipmentComponent implements OnInit {
    @Output() onCyberNanoApp: EventEmitter<any> = new EventEmitter<any>();
    equipment: any[] = [];
    equipArray = {
        start1: START1,
        start2: START2,
        start3: START3,
        weapons: WEAPONS,
        armor: ARMOR,
    };
    cyberTech = '';
    nano = {};
    app: any[] = [];

  constructor(
      private randomNumber: RandomNumberService
  ) { }

  ngOnInit(): void {
    this.getEquipment();
  }

    private getEquipment() {
        for (const [key, value] of Object.entries(this.equipArray)) {
            const numToRoll = this.randomNumber.getRandomNumber(0, value.length - 1);
            let prevApp = -1;
            let prevCybertech = -1;
            if (value[numToRoll].includes('cybertech')) {
                const techToRoll = this.randomNumber.getRandomNumber(0, 9, prevCybertech);
                this.cyberTech = CYBERTECH[techToRoll];
                prevCybertech = techToRoll;
                console.log('cybertech rolled');

                this.emitData();
            } else if (value[numToRoll].includes('nano')) {
                this.nano = {
                    power: NANO[this.randomNumber.getRandomNumber(0, 9)],
                    infestation: INFESTATION[this.randomNumber.getRandomNumber(0, 9)]
                };
                console.log('nano rolled');

                this.emitData();
            } else if (value[numToRoll].includes('cyberdeck')) {
                for (let i = 0; i < 2; i++) {
                    const rolledApp = this.randomNumber.getRandomNumber(0, APPS.length - 1, prevApp);
                    prevApp = rolledApp;
                    this.app.push(APPS[rolledApp]);
                }
                console.log('apps rolled');
                this.equipment.push(value[numToRoll]);
                this.emitData();
            } else {
                this.equipment.push(value[numToRoll]);
            }
        }
    }

  emitData() {
      this.onCyberNanoApp.emit({
        cyber: this.cyberTech,
        nano: this.nano,
        apps: this.app
      });
  }

}
