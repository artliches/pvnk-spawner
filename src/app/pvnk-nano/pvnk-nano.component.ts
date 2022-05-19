import { Component, Input, OnInit } from '@angular/core';
import { AppCyberNanoService } from '../services/app-cyber-nano.service';

@Component({
  selector: 'app-pvnk-nano',
  templateUrl: './pvnk-nano.component.html',
  styleUrls: ['./pvnk-nano.component.scss']
})
export class PvnkNanoComponent implements OnInit {
  @Input() nano: any;

  constructor(
    private weirdService: AppCyberNanoService
  ) { }

  ngOnInit(): void {
  }

  rerollNano() {
    const numNanos = this.nano.length;

    this.nano = [];
    for (let i = 0; i < numNanos; i++) {
      this.nano.push(this.weirdService.getNano());
    }
  }

  rerollPower(index: number) {
    this.nano[index].power = this.weirdService.getNanoPower();
  }

  rerollInfestation(index: number) {
    this.nano[index].infestation = this.weirdService.getInfestation();
  }

}
