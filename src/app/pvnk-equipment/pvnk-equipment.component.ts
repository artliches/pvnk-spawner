import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { APPS, ARMOR, BURNED_APPS, CYBERTECH, INFESTATION, NANO, START1, START2, START3, WEAPONS } from '../services/random-tables.constant';

@Component({
  selector: 'app-pvnk-equipment',
  templateUrl: './pvnk-equipment.component.html',
  styleUrls: ['./pvnk-equipment.component.scss']
})
export class PvnkEquipmentComponent implements OnInit, OnChanges {
    @Input() reroll = false;
    @Input() equipMods: any;
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
    prevNano = -1;
    prevInfection = -1;
    prevApp = -1;
    prevAppBurned = -1;
    prevCybertech = -1;

  constructor(
      private randomNumber: RandomNumberService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.equipment = [];
    this.nano = {};
    this.app = [];
    this.cyberTech = '';
      
    this.getEquipment();
  }

    private getEquipment() {
        for (const [key, value] of Object.entries(this.equipArray)) {
            let armorMod = 0;

            let upperNum = this.equipMods[key] ? this.equipMods[key] : value.length;
            if (key === 'armor' && !this.equipMods[key]) {
                upperNum = 3;
            } else if (key === 'armor' && this.equipMods[key] === 4) {
                armorMod += 1;
            }
            const numToRoll = this.randomNumber.getRandomNumber(0,upperNum - 1) + armorMod;

            if (value[numToRoll].includes('cybertech')) {
                if (!this.equipMods.hasOwnProperty('nano') && !this.equipMods.hasOwnProperty('apps')) {
                    this.getCybertech();
                    console.log('cybertech rolled');
                } else if(this.equipMods.hasOwnProperty('apps')) {
                    this.getApp();
                } else if (this.equipMods.hasOwnProperty('nano')) {
                    this.rollNano();
                }

                this.emitData();
            } else if (value[numToRoll].includes('nano')) {
                if (!this.equipMods.hasOwnProperty('apps') && !this.equipMods.hasOwnProperty('cybertech')) {
                    this.rollNano();
                } else if (this.equipMods.hasOwnProperty('apps')) {
                    this.getApp();
                } else if (this.equipMods.hasOwnProperty('cybertech')) {
                    this.getCybertech();
                }

                this.emitData();
            } else if (value[numToRoll].includes('Cyberdeck')) {
                if (!this.equipMods.hasOwnProperty('nano') && !this.equipMods.hasOwnProperty('cybertech')) {
                    for (let i = 0; i < 2; i++) {
                        this.getApp();
                    }

                    if (!this.equipMods.hasOwnProperty('apps')) {
                        this.equipment.push(value[numToRoll]);
                    }
                } else if (this.equipMods.hasOwnProperty('cybertech')) {
                    this.getCybertech();
                } else {
                    this.rollNano();
                }

                this.emitData();
            } else {
                this.equipment.push(value[numToRoll]);
            }
        }

        if (this.equipMods.hasOwnProperty('nano')) {
            this.rollNano();
            this.emitData();
        }

        if (this.equipMods.hasOwnProperty('apps')) {
            this.getApp();
            this.getApp(true);
            this.emitData();
            this.equipment.push('<strong>Cyberdeck</strong> with knowledge+4 slots');
        }

        if (this.equipMods.hasOwnProperty('cybertech')) {
            this.getCybertech();
            this.emitData();
        }
    }

    private getApp(burned?: boolean) {
        const rolledApp = burned ?
            this.randomNumber.getRandomNumber(0, BURNED_APPS.length - 1, this.prevAppBurned) :
            this.randomNumber.getRandomNumber(0, APPS.length - 1, this.prevApp);
        if (burned) {
            this.prevAppBurned = rolledApp;
            this.app.push(BURNED_APPS[rolledApp]);
        } else {
            this.prevApp = rolledApp;
            this.app.push(APPS[rolledApp]);
        }
    }

    private getCybertech() {
        const techToRoll = this.randomNumber.getRandomNumber(0, 9, this.prevCybertech);
        this.cyberTech = CYBERTECH[techToRoll];
        this.prevCybertech = techToRoll;
    }

    private rollNano() {
        const nanoNum = this.randomNumber.getRandomNumber(0, 9, this.prevNano);
        const infectionNum = this.randomNumber.getRandomNumber(0, 9, this.prevInfection);

        this.prevNano = nanoNum;
        this.prevInfection = infectionNum;
        this.nano = {
            power: NANO[nanoNum],
            infestation: INFESTATION[infectionNum]
        };
    }

  emitData() {
      this.onCyberNanoApp.emit({
        cyber: this.cyberTech,
        nano: this.nano,
        apps: this.app
      });
  }

}
