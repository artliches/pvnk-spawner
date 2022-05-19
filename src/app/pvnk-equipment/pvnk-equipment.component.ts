import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { APPS, ARMOR, BURNED_APPS, CYBERSLASHER_EXTRA, CYBERTECH, GEARHEAD_EXTRA, INFESTATION, KILLER_EXTRA, NANO, NANOMANCER_EXTRA, START1, START2, START3, WEAPONS } from '../services/random-tables.constant';

@Component({
  selector: 'app-pvnk-equipment',
  templateUrl: './pvnk-equipment.component.html',
  styleUrls: ['./pvnk-equipment.component.scss']
})
export class PvnkEquipmentComponent implements OnInit, OnChanges {
    @Input() reroll = false;
    @Input() equipMods: any;
    @Input() pvnkClass: string = '';
    @Output() onCyberNanoApp: EventEmitter<any> = new EventEmitter<any>();
    equipment: any[] = [];
    equipArray = {
        start1: START1,
        start2: START2,
        start3: START3,
        weapons: WEAPONS,
        armor: ARMOR,
    };
    classSpecificEquipObj = {
        killer_extra: KILLER_EXTRA,
        cyberslasher_extra: CYBERSLASHER_EXTRA,
        nanomancer_extra: NANOMANCER_EXTRA,
        gearhead_extra: GEARHEAD_EXTRA,
    };
    prevRollObj: {[key: string]: number}  = {
        start1:  -1,
        start2:  -1,
        start3:  -1,
        weapons: -1,
        armor:   -1,
        killer_extra: -1,
        cyberslasher_extra: -1,
        nanomancer_extra: -1
    };
    cyberTech: string[] = [];
    nano: any[] = [];
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
    this.rollEquipment();
  }

  reRollEquip(equip: any) {
      // check if removing keywords nano, cybertech, Cyberdeck
      const standardEquipKeys = Object.keys(this.equipArray).includes(equip);
      const equipObj = standardEquipKeys ? this.equipArray : this.classSpecificEquipObj;

      for (const [key, value] of Object.entries(equipObj)) {
        if (equip === key) {
          let armorMod = 0;

          let upperNum = this.equipMods[key] ? this.equipMods[key] : value.length;
          if (key === 'armor' && !this.equipMods[key]) {
              upperNum = 3;
          } else if (key === 'armor' && this.equipMods[key] === 4) {
              armorMod += 1;
          }
          
          this.equipment.map(result => {
              if (result.key === equip) {
                  const prevEquipment = result.value;

                  if (prevEquipment.includes('Cyberdeck') || prevEquipment.includes('cybertech') || prevEquipment.includes('nano')) {
                    switch (true) {
                        case prevEquipment.includes('Cyberdeck'): {
                            if (this.equipMods.hasOwnProperty('nano')) {
                                this.nano.splice(this.nano.length - 1);
                            } else if (this.equipMods.hasOwnProperty('cybertech')) {
                                this.cyberTech.splice(this.cyberTech.length - 1);
                            } else {
                                this.app.splice(this.app.length - 2);
                            }
                            break;
                        }
                        case prevEquipment.includes('cybertech'): {
                            if (this.equipMods.hasOwnProperty('nano')) {
                                this.nano.splice(this.nano.length - 1);
                            } else if (this.equipMods.hasOwnProperty('apps')) {
                                this.app.splice(this.app.length - 1);
                            } else {
                                this.cyberTech.splice(this.cyberTech.length - 1);
                            }
                            break;
                        }
                        case prevEquipment.includes('nano'): {
                            if (this.equipMods.hasOwnProperty('cybertech')) {
                                this.cyberTech.splice(this.cyberTech.length - 1);
                            } else if (this.equipMods.hasOwnProperty('apps')) {
                                this.app.splice(this.app.length - 1);
                            } else {
                                this.nano.splice(this.nano.length - 1);
                            }
                            break;
                        }
                    }
                  }

                  const index = this.randomNumber.getRandomNumber(0, upperNum - 1, this.prevRollObj[key]);
                  this.prevRollObj[key] = index;
                  result.value = value[index  + armorMod];
              }
          });
        }
    }
    for (const [key, value] of Object.entries(this.equipment)) {
        if (key === equip) {
            this.addAppsCyberNano(value);
        }
    }
    this.emitData();

  }

    public rollEquipment() {
        const creds = this.randomNumber.rollMultipleDice(2, 6) * 10;
        this.equipment = [
            {key: 'default', value: `<strong class="clickable">${creds}¤</strong> on an <strong>anonymous credstick</strong>`},
            {key: 'default', value: `some <strong>cheap clothes</strong>`},
            {key: 'default', value: `a <strong>Retinal Com Device ( R C D )</strong>`}
        ];
        this.nano = [];
        this.app = [];
        this.cyberTech = [];
        this.emitData();

        this.getEquipment();
        this.getClassSpecificEquipment();
    }

    private getEquipment() {
        // randomly assign equipment, armors, weapons
        for (const [key, value] of Object.entries(this.equipArray)) {
            let armorMod = 0;

            let upperNum = this.equipMods[key] ? this.equipMods[key] : value.length;
            if (key === 'armor' && !this.equipMods[key]) {
                upperNum = 3;
            } else if (key === 'armor' && this.equipMods[key] === 4) {
                armorMod += 1;
            }
            const numToRoll = this.randomNumber.getRandomNumber(0, upperNum - 1, this.prevRollObj[key]);
            this.prevRollObj[key] = numToRoll;

            this.equipment.push({key: key, value: value[numToRoll + armorMod]});
        }

        // get extra apps, cybertech, nano if class includes it
        if (this.equipMods.hasOwnProperty('nano')) {
            this.getNano();
        }

        if (this.equipMods.hasOwnProperty('apps')) {
            this.getApp(true);
            this.getApp();
            this.equipment.push({key: '', value: '<strong>Cyberdeck</strong> with Knowledge+4 slots'});
        }

        if (this.equipMods.hasOwnProperty('cybertech')) {
            this.getCybertech();
        }

        // add apps, cybertech, and nano if randomly rolled
        for (const [key, value] of Object.entries(this.equipment)) {
            this.addAppsCyberNano(value);
        }
        this.emitData();
    }

    private addAppsCyberNano(value: any) {
        if (value.value.includes('cybertech')) {
            if (this.equipMods.hasOwnProperty('apps')) {
                this.getApp();
                value.value = value.value + ' <em>(replaced with a random App)</em>';
            } else if (this.equipMods.hasOwnProperty('nano')) {
                this.getNano();
                value.value = value.value + ' <em>(replaced with a random Nano)</em>';
            } else {
                this.getCybertech();
            }
        }

        if (value.value.includes('nano')) {
            if (this.equipMods.hasOwnProperty('apps')) {
                this.getApp();
                value.value = value.value + ' <em>(replaced with a random App)</em>';
            } else if (this.equipMods.hasOwnProperty('cybertech')) {
                this.getCybertech();
                value.value = value.value + ' <em>(replaced with a random Cybertech)</em>';
            } else {
                this.getNano();
            }
        }

        if (value.value.includes('Cyberdeck')) {
            if (this.equipMods.hasOwnProperty('nano')) {
                this.getNano();
                value.value = value.value + ' <em>(replaced with a random Nano)</em>';
            } else if (this.equipMods.hasOwnProperty('cybertech')) {
                this.getCybertech();
                value.value = value.value + ' <em>(replaced with a random Cybertech)</em>';
            } else {
                for (let i = 0; i < 2; i++) {
                    this.getApp();
                }
            }
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
        this.cyberTech.push(CYBERTECH[techToRoll]);
        this.prevCybertech = techToRoll;
    }

    private getNano() {
        const nanoNum = this.randomNumber.getRandomNumber(0, 9, this.prevNano);
        const infectionNum = this.randomNumber.getRandomNumber(0, 9, this.prevInfection);

        this.prevNano = nanoNum;
        this.prevInfection = infectionNum;
        this.nano.push({
            power: NANO[nanoNum],
            infestation: INFESTATION[infectionNum]
        });
    }

    getClassSpecificEquipment() {
        switch(true) {
            case this.pvnkClass.includes('nanomancer') : {
                const index = this.randomNumber.getRandomNumber(0, NANOMANCER_EXTRA.length - 1, this.prevRollObj['nanomancer_extra']);
                this.prevRollObj['nanomancer_extra'] = index;
                this.equipment.push({key: 'nanomancer_extra', value: NANOMANCER_EXTRA[index]});
              break;
            }
            case this.pvnkClass.includes('killer') : {
                const index = this.randomNumber.getRandomNumber(0, NANOMANCER_EXTRA.length - 1, this.prevRollObj['killer_extra']);
                this.prevRollObj['killer_extra'] = index;
                this.equipment.push({key: 'killer_extra', value: KILLER_EXTRA[index]});
              break;
            }
            case this.pvnkClass.includes('gearhead') : {
                const index = this.randomNumber.getRandomNumber(0, NANOMANCER_EXTRA.length - 1, this.prevRollObj['gearhead_extra']);
                this.prevRollObj['gearhead_extra'] = index;
                this.equipment.push({key: 'gearhead_extra', value: GEARHEAD_EXTRA[index]});
              break;
            }
            case this.pvnkClass.includes('cyberslasher') : {
                const index = this.randomNumber.getRandomNumber(0, NANOMANCER_EXTRA.length - 1, this.prevRollObj['cyberslasher_extra']);
                this.prevRollObj['cyberslasher_extra'] = index;
                this.equipment.push({key: 'cyberslasher_extra', value: CYBERSLASHER_EXTRA[index]});
              break;
            }
            default: {
              break;
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
