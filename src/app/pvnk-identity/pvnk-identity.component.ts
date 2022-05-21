import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppCyberNanoService } from '../services/app-cyber-nano.service';
import { RandomNumberService } from '../services/random-number.service';

@Component({
  selector: 'app-pvnk-identity',
  templateUrl: './pvnk-identity.component.html',
  styleUrls: ['./pvnk-identity.component.scss']
})
export class PvnkIdentityComponent implements OnInit, OnChanges {
  @Input() pvnk: any;
  @Input() hp = 0;
  @Input() toughness = 0;
  @Input() hpMod: any;
  @Input() maxHp: boolean = false;

  themeBackgrounds: any = {
    void: 'white',
    dark: 'black',
    mork: 'rgb(255, 232, 44)',
    hot: 'rgb(241, 66, 175)',
    terminal: 'rgb(51, 32, 42)',
    malfunction: 'rgb(51, 32, 42)',
  }

  constructor(
    private weirdService: AppCyberNanoService,
    private randomRoller: RandomNumberService,
  ) { }

  ngOnInit(): void {
    const theme = localStorage.getItem('theme') || 'void';
    document.body.style.backgroundColor = this.themeBackgrounds[theme];

    if (this.maxHp) {
      this.hp = this.toughness + this.hpMod;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.maxHp) {
      this.hp = this.toughness + this.hpMod;
    }
  }

  shuffleTheme() {
    this.weirdService.updateTheme();
    this.weirdService.currentTheme.subscribe(result => {
      localStorage.setItem('theme', result);
      document.body.style.backgroundColor = this.themeBackgrounds[result];
    });
  }

  rerollHp() {
    this.hp = this.toughness + this.randomRoller.getRandomNumber(1, this.hpMod);
    this.hp = this.hp <= 0 ? 1 : this.hp;
  }
}
