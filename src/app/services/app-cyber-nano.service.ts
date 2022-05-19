import { Injectable } from '@angular/core';
import { RandomNumberService } from './random-number.service';
import { APPS, BURNED_APPS, INFESTATION, NANO } from './random-tables.constant';

@Injectable({
    providedIn: 'root'
})

export class AppCyberNanoService {
    prevApp = -1;
    prevBurnedApp = -1;
    prevNano = -1;
    prevInfestation = -1;

    constructor(
        private randomNumber: RandomNumberService
    ) {}

    getApps() {
        const indexApp = this.randomNumber.getRandomNumber(0, APPS.length - 1, this.prevApp);
        this.prevApp = indexApp;
        return APPS[indexApp];
    }

    getBurnedApps() {
        const indexBurnedApp = this.randomNumber.getRandomNumber(0, BURNED_APPS.length - 1, this.prevBurnedApp);
        this.prevBurnedApp = indexBurnedApp;
        return BURNED_APPS[indexBurnedApp];
    }

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
