import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppCyberNanoService } from '../services/app-cyber-nano.service';

@Component({
  selector: 'app-pvnk-cybertech',
  templateUrl: './pvnk-cybertech.component.html',
  styleUrls: ['./pvnk-cybertech.component.scss']
})
export class PvnkCybertechComponent implements OnChanges {
  @Input() cyberTech: any;
  @Input() isSlasher: boolean = false;

  constructor(
    private weirdService: AppCyberNanoService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
      this.weirdService.currentCybertech.subscribe(result => this.cyberTech = result);
  }

  rerollCybertech(index?: number) {
    if (index === undefined) {
      const numCybertech = this.isSlasher ? this.cyberTech.length - 1 : this.cyberTech.length
      this.cyberTech = [];

      if (this.isSlasher) {
        this.cyberTech.push(this.weirdService.getCybertech(12));
      }

      for (let i = 0; i < numCybertech; i++) {
        this.cyberTech.push(this.weirdService.getCybertech(10));
      }
    } else {
      this.cyberTech[index] = this.isSlasher && index === 0 ?
        this.weirdService.getCybertech(12) : this.weirdService.getCybertech(10);
    }
    this.weirdService.updateCybertech(this.cyberTech);
  }
}
