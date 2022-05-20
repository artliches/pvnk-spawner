import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppCyberNanoService } from '../services/app-cyber-nano.service';

@Component({
  selector: 'app-pvnk-nano',
  templateUrl: './pvnk-nano.component.html',
  styleUrls: ['./pvnk-nano.component.scss']
})
export class PvnkNanoComponent implements OnChanges {
  @Input() nano: any;

  constructor(
    private weirdService: AppCyberNanoService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.weirdService.currentNano.subscribe(result => {
      this.nano = result;
    });
  }

  rerollNano() {
    const numNanos = this.nano.length;

    this.nano = [];
    for (let i = 0; i < numNanos; i++) {
      this.nano.push(this.weirdService.getNano());
    }
    this.updateNano();
  }

  rerollPower(index: number) {
    this.nano[index].power = this.weirdService.getNanoPower();
    this.updateNano();
  }

  rerollInfestation(index: number) {
    this.nano[index].infestation = this.weirdService.getInfestation();
    this.updateNano();
  }

  updateNano() {
    this.weirdService.updateNano(this.nano);
  }
}
