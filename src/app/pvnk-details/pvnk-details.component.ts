import { Component, Input, OnInit } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { FEATURE, OBSESSION, QUIRK, STYLE, WANTS } from '../services/random-tables.constant';

@Component({
  selector: 'app-pvnk-details',
  templateUrl: './pvnk-details.component.html',
  styleUrls: ['./pvnk-details.component.scss']
})
export class PvnkDetailsComponent implements OnInit {
    pvnkDetails: {[key: string]: string} = {
        style : '',
        feature : '',
        wants : '',
        quirk : '',
        obsession : '',
    };

    randomTables: {[key: string]: string[]} = {
        style: STYLE,
        feature : FEATURE,
        wants : WANTS,
        quirk : QUIRK,
        obsession : OBSESSION,
    };

  constructor(
      private randomNumber: RandomNumberService
  ) { }


  ngOnInit(): void {
      this.getPvnkDetails();
  }


    private getPvnkDetails() {
        for (const [key, value] of Object.entries(this.pvnkDetails)) {
            const numToRoll = this.randomNumber.getRandomNumber(0, this.randomTables[key].length - 1);
            this.pvnkDetails[key] = this.randomTables[key][numToRoll];
        }
    }
}
