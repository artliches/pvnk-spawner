import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RandomNumberService } from './random-number.service';
import { APPS, BURNED_APPS, CYBERTECH, INFESTATION, NANO } from './random-tables.constant';

@Injectable({
    providedIn: 'root'
})

export class AppCyberNanoService {
    private nano = new BehaviorSubject([]);
    currentNano = this.nano.asObservable();

    private cybertech = new BehaviorSubject([]);
    currentCybertech = this.cybertech.asObservable();

    private apps = new BehaviorSubject([]);
    currentApps = this.apps.asObservable();

    private theme = new BehaviorSubject('void');
    private currThemeId = 0;
    private themeArray = [
        'void',
        'dark',
        'mork',
        'hot',
        'terminal',
        'malfunction',
        'blues',
    ];
    currentTheme = this.theme.asObservable();

    prevApp = -1;
    prevBurnedApp = -1;
    prevNano = -1;
    prevInfestation = -1;
    prevCybertech = -1;

    constructor(
        private randomNumber: RandomNumberService
    ) {}

    updateNano(value: any) {
        this.nano.next(value);
    }

    updateCybertech(value: any) {
        this.cybertech.next(value);
    }

    updateApps(value: any) {
        this.apps.next(value);
    }

    updateTheme(savedTheme?: string) {
        if (savedTheme) {
            this.theme.next(savedTheme);
        } else {
            this.currThemeId = this.currThemeId === this.themeArray.length - 1 ?
            0 : this.currThemeId + 1;
    
            const theme = this.themeArray[this.currThemeId];
            
            this.theme.next(theme);
        }
    }

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

    getCybertech(dieSize: number) {
        const indexCybertech = this.randomNumber.getRandomNumber(0, dieSize - 1, this.prevCybertech);
        this.prevCybertech = indexCybertech;
        return CYBERTECH[indexCybertech];
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
