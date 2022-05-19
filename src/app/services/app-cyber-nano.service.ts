import { Injectable } from '@angular/core';
import { RandomNumberService } from './random-number.service';
import { INFESTATION, NANO } from './random-tables.constant';

@Injectable({
    providedIn: 'root'
})

export class AppCyberNanoService {
    prevNano = -1;
    prevInfestation = -1;

    constructor(
        private randomNumber: RandomNumberService
    ) {}

    getNanoPower() {
        const indexPower = this.randomNumber.getRandomNumber(0, NANO.length - 1, this.prevNano);
        this.prevNano = indexPower;
        return NANO[indexPower];
    }

    getInfestation() {
        const indexInfestation = this.randomNumber.getRandomNumber(0, INFESTATION.length - 1, this.prevInfestation);
        this.prevInfestation = indexInfestation;
        return INFESTATION[indexInfestation];
    }

    getNano() {
        return {
            power: this.getNanoPower(),
            infestation: this.getInfestation()
        };
    }
}
