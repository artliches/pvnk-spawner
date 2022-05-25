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
    blues: 'blue',
  }
  glitches = 0;
  lastGlitch = -1;
  prevHp = -1;

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
    this.getGlitches();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.maxHp) {
      this.hp = this.toughness + this.hpMod;
    } else {
      this.hp = this.toughness + this.randomRoller.getRandomNumber(1, this.hpMod);
    }
  }

  getGlitches() {
    const glitchMod = this.pvnk.abilityMods.gliches[1];
    const rolledGlitch = this.randomRoller.getRandomNumber(1, glitchMod, this.lastGlitch);
    this.lastGlitch = rolledGlitch;
    this.glitches = rolledGlitch;
  }

  shuffleTheme() {
    this.weirdService.updateTheme();
    this.weirdService.currentTheme.subscribe(result => {
      localStorage.setItem('theme', result);
      document.body.style.backgroundColor = this.themeBackgrounds[result];
    });
  }

  rerollHp() {
    if (this.maxHp) {
      this.hp = this.toughness + this.hpMod;
    } else {
      const rolledHP = this.randomRoller.getRandomNumber(1, this.hpMod, this.prevHp);
      this.prevHp = rolledHP;
      this.hp = this.toughness + rolledHP;
    }
    this.hp = this.hp <= 0 ? 1 : this.hp;
  }
}
