import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { CYBERSLASHER_ORIGINS, DEBT, FEATURE, FORSAKEN_EXTRA, FORSAKEN_ORIGINS, GEARHEAD_ORIGINS, HACKER_ORIGINS, KILLER_ORIGINS, NAMES, NANOMANCER_ORIGIN, OBSESSION, QUIRK, STYLE, WANTS } from '../services/random-tables.constant';

@Component({
  selector: 'app-pvnk-details',
  templateUrl: './pvnk-details.component.html',
  styleUrls: ['./pvnk-details.component.scss']
})
export class PvnkDetailsComponent implements OnInit, OnChanges {
    @Input() reroll = false;
    @Input() pvnkClass: string = '';

    originIntro = '';
    originResult = '';
    originExtra = '';
    debtAmount = 0;
    pvnkDetails: {[key: string]: string} = {
        style : '',
        feature : '',
        wants : '',
        quirk : '',
        obsession : '',
        debt: '',
    };

    randomTables: {[key: string]: string[]} = {
        style: STYLE,
        feature : FEATURE,
        wants : WANTS,
        quirk : QUIRK,
        obsession : OBSESSION,
        debt: DEBT,
    };
  pvnkName: string = '';

  constructor(
      private randomNumber: RandomNumberService
  ) { }


  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.getPvnkDetails();
    this.getPvnkOrigin();
    this.getName();
    this.debtAmount = this.pvnkClass.includes('hacker') ? this.randomNumber.rollMultipleDice(6, 10) * 1000 : this.randomNumber.rollMultipleDice(3, 6) * 1000;
  }

  private getPvnkDetails() {
    for (const [key, value] of Object.entries(this.pvnkDetails)) {
        const numToRoll = this.randomNumber.getRandomNumber(0, this.randomTables[key].length - 1);
        this.pvnkDetails[key] = this.randomTables[key][numToRoll];
    }
  }

  getPvnkOrigin() {
    this.originExtra = '';
    this.originIntro = '';
    this.originResult = '';
    switch(true) {
      case this.pvnkClass.includes('nanomancer') : {
        this.originIntro = 'You got infected when ';
        this.originResult = NANOMANCER_ORIGIN[this.randomNumber.getRandomNumber(0, NANOMANCER_ORIGIN.length - 1)];
        break;
      }
      case this.pvnkClass.includes('hacker') : {
        this.originIntro = 'On a deep dive of the Cyber Cosmos, you’ve found a terrible truth: ';
        this.originResult = HACKER_ORIGINS[this.randomNumber.getRandomNumber(0, HACKER_ORIGINS.length - 1)];
        break;
      }
      case this.pvnkClass.includes('killer') : {
        this.originIntro = 'You were deployed ';
        this.originResult = KILLER_ORIGINS[this.randomNumber.getRandomNumber(0, KILLER_ORIGINS.length - 1)];
        this.originExtra = ` Your training means that your <strong>autofire tests are always -1DR</strong>. The Corp wants you <strong>dead</strong>.`
        break;
      }
      case this.pvnkClass.includes('gearhead') : {
        this.originIntro = 'You trusted people and they ';
        this.originResult = GEARHEAD_ORIGINS[this.randomNumber.getRandomNumber(0, GEARHEAD_ORIGINS.length - 1)];
        this.originExtra = ` Because of this, you <strong>prefer machines</strong>. You test Knowledge DR10 when you try to repair a piece of tech or to pilot a vehicle, drone or other machine.`;
        break;
      }
      case this.pvnkClass.includes('cyberslasher') : {
        this.originIntro = 'You try to start each day with ';
        this.originResult = CYBERSLASHER_ORIGINS[this.randomNumber.getRandomNumber(0, CYBERSLASHER_ORIGINS.length - 1)];
        break;
      }
      case this.pvnkClass.includes('forsaken') : {
        this.originIntro = 'Your gang ';
        this.originResult = FORSAKEN_ORIGINS[this.randomNumber.getRandomNumber(0, FORSAKEN_ORIGINS.length - 1)];

        // need to add reroll mechanic to this
        const specialization = FORSAKEN_EXTRA[this.randomNumber.getRandomNumber(0, FORSAKEN_EXTRA.length - 1)];
        this.originExtra = ` You are also <strong>stealthy</strong>, all Presence and Agility tests are –2DR, and you specialized in ${specialization}`        
        break;
      }
      default: {
        break;
      }
    }
  }

  getName() {
    const firstName = NAMES[this.randomNumber.getRandomNumber(0, NAMES.length - 1)];
    const lastName = NAMES[this.randomNumber.getRandomNumber(0, NAMES.length - 1)];

    this.pvnkName = `${firstName[this.randomNumber.getRandomNumber(0, firstName.length - 1)]} ${lastName[this.randomNumber.getRandomNumber(0, firstName.length - 1)]}`;
  }
}
