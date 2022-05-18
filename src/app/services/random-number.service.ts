import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RandomNumberService {
    getRandomNumber(min: number, max: number, prev?: number): number {
        let numToReturn = Math.floor(Math.random() * (max - min + 1) ) + min;
        if (prev !== undefined && prev > -1 && prev === numToReturn) {
            do {
                numToReturn = Math.floor(Math.random() * (max - min + 1) ) + min;
            } while (prev === numToReturn);
        }
        return numToReturn;
    }

    rollMultipleDice(numDice: number, max: number) {
        let sum = 0;
        for (let i = 0; i < numDice; i++) {
            sum += this.getRandomNumber(1, max);
        }
        return sum;
    }
}
