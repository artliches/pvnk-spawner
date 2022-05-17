import { Component, Input, OnInit } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { DEBT, FEATURE, OBSESSION, QUIRK, STYLE, WANTS } from '../services/random-tables.constant';

@Component({
  selector: 'app-pvnk-details',
  templateUrl: './pvnk-details.component.html',
  styleUrls: ['./pvnk-details.component.scss']
})
export class PvnkDetailsComponent implements OnInit {
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

  constructor(
      private randomNumber: RandomNumberService
  ) { }


  ngOnInit(): void {
      this.getPvnkDetails();
      this.debtAmount = this.randomNumber.rollMultipleDice(3, 6) * 1000;
  }


    private getPvnkDetails() {
        for (const [key, value] of Object.entries(this.pvnkDetails)) {
            const numToRoll = this.randomNumber.getRandomNumber(0, this.randomTables[key].length - 1);
            this.pvnkDetails[key] = this.randomTables[key][numToRoll];
        }
    }
}
