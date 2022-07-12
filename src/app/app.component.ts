import { Component, OnInit } from '@angular/core';
import { AppCyberNanoService } from './services/app-cyber-nano.service';
import { RandomNumberService } from './services/random-number.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  abilities = [
    {
      name: 'agility',
      value: 0,
      descrip: 'Sneak, dodge, drive, autofire',
      dropLow: false,
      dieArray: []
    },
    {
      name: 'knowledge',
      value: 0,
      descrip: 'Science, use tech or App',
      dropLow: false,
      dieArray: []
    },
    {
      name: 'presence',
      value: 0,
      descrip: 'Snipe/shoot, use Nano, charm',
      dropLow: false,
      dieArray: []
    },
    {
      name: 'strength',
      value: 0,
      descrip: 'Strike, grapple, lift, throw',
      dropLow: false,
      dieArray: []
    },
    {
      name: 'toughness',
      value: 0,
      descrip: 'Survive falling, poison, and elements',
      dropLow: false,
      dieArray: []
    },
  ];
  chosenPvnk: any;
  hp = 0;
  prevPvnk = -1;
  specialPvnks: any[] = [
    {
      name: 'shunned nanomancer',
      flavor: `<strong class="flavor-font">It\'s inside you</strong>. Infesting your brain, warping your flesh. People are afraid of you now. They\'re afraid of the power that poisons you. <strong class="flavor-font">You\'re scared too.</strong>`,
      abilityMods: {
        hp: 4,
        gliches: 'd2',
        presence: +2,
        toughness: -2
      },
      equipMods: {
        weapons: 6,
        armor: 2,
        nano: 1,
      }
    },
    {
      name: 'burned hacker',
      flavor: `You were one of the sharpest deckers in Cy. No one could use tech or warp the world with an App like you could. You don\'t know what went wrong. <strong class="flavor-font">You messed up.</strong> Maybe you were tricked; maybe you got sloppy. You glimpsed a <strong class="flavor-font">terrible truth</strong>, and now you\'re burnt. No collective, no fallback, <strong class="flavor-font">nothing</strong>.`,
      abilityMods: {
        hp: 6,
        gliches: 'd2',
        knowledge: +2,
        toughness: -1,
        strength: -1
      },
      equipMods: {
        weapons: 8,
        armor: 2,
        apps: 1,
      }
    },
    {
      name: 'discharged corp killer',
      flavor: `<strong class="flavor-font">A good soldier in bad company</strong>, always fighting someone else\'s war in the name of greed. Capitalism crushed your enthusiasm quickly enough, and you were discharged without severance.`,
        abilityMods: {
        hp: 8,
        gliches: 'd2',
        presence: -1,
        knowledge: -1,
        toughness: +2
      },
      equipMods: {
        armor: 4
      }
    },
    {
      name: 'orphaned gearhead',
      flavor: `<strong class="flavor-font">People are unreliable.</strong> Socially. Physically. Emotionally. Weakbodies and weaker wills. They are worn down, unfixable. Instead, you have mastered emotionless steel and loyal code. You can fix, drive, and pilot any machine. Machines, you can <strong class="flavor-font">trust</strong>.`,
        abilityMods: {
        hp: 8,
        gliches: 'd4',
        presence: -2,
        knowledge: +2
      },
      equipMods: {
        weapons: 6,
        armor: 2
      }
    },
    {
      name: 'renagade cyberslasher',
      flavor: `You are <strong class="slasher">DEATH</strong> incarnate-afrenzied flurry of chrome, murder, and blood-stained steel. But yours is no mindless rage. You match your trained and cybernetically enhanced body with an equally disciplined mind. <strong class="flavor-font">You used to kill for a cause</strong>, for an ideal. Now? You kill for money.`,
        abilityMods: {
        hp: 10,
        gliches: 'd3',
        presence: +1,
        strength: +1,
        knowledge: -2
      },
      equipMods: {
        cybertech: 12
      }
    },
    {
      name: 'forsaken gang-goon',
      flavor: `You ran with the only gang to have your back and treat you like more than slum trash. <strong class="flavor-font">They were your family</strong>, and you bled, stole, fought, and killed for them. They\'re <strong class="flavor-font">gone</strong> now, so you have to keep your edge.`,
        abilityMods: {
        hp: 6,
        gliches: 'd3',
        strength: -2
      },
      equipMods: {
        weapons: 6,
        armor: 2
      }
    },
  ];
  classesPvnk = [
    {
      name: 'pvnk.classless()',
      flavor: `<strong class="flavor-font">We should have burned this city centuries ago.</strong> The Nu-Capitalists and Immortal OG Money Aristocrats that rule on high in their glass towers and walled gardens <strong class="flavor-font">poisoned the land</strong> and <strong class="flavor-font">stole our futures</strong>. The cops silence our voices and gun us down in the streets at their bidding. They turned us into wage-slaves; mindless drones working endlessly for what little scraps they decide to give us, and turned us against our fellow man just to survive. <strong class="flavor-font">No more.</strong>`,
      abilityMods: {
        hp: 8,
        gliches: 'd2',
      },
      equipMods: {
        weapons: 12,
        armor: 3
      }
    }
  ];
  pvnkArray: any[] = [];

  cyberTech: any[] = [];
  nano: any[]  = [];
  apps: any[]  = [];
  equipMods = {};
  reroll = false;
  rolledHp = 0;

  $currentTheme = this.weirdService.currentTheme;
  toughness = 0;
  maxHp = false;
  showClasslessPvnk = false;
  showDie = false;

  constructor(
    private randomRoller: RandomNumberService,
    private weirdService: AppCyberNanoService
  ) {}

  ngOnInit(): void {
    this.pvnkArray = this.specialPvnks;
    this.assignPvnk();
    const theme = localStorage.getItem('theme') || 'void';
    this.weirdService.updateTheme(theme);
  }

  assignPvnk(reroll?: boolean) {
    this.chosenPvnk = this.getAPvnk();
    this.getAbilityMods();
    if (reroll) {
      this.nano = [];
      this.apps = [];
      this.cyberTech = [];
      this.reroll = !this.reroll;
    }
  }

  getAPvnk() {
    const rolledNum = this.pvnkArray.length - 1 > 0 ? this.randomRoller.getRandomNumber(0, this.pvnkArray.length - 1, this.prevPvnk) : 0;
    const newPvnk = this.pvnkArray[rolledNum];
    this.prevPvnk = rolledNum;
    this.equipMods = newPvnk.equipMods;

    return newPvnk;
  }

  toggleClassless() {
    this.showClasslessPvnk = !this.showClasslessPvnk;
    this.pvnkArray = this.showClasslessPvnk ? this.classesPvnk : this.specialPvnks;
    this.assignPvnk(true);
  }

  getClasslessButtonWording() {
    return this.showClasslessPvnk ? 'pvnkClass = false' : 'pvnkClass = true';
  }

  getMaxHpButtonWording() {
    return this.maxHp ? 'maxHP = true' : 'maxHP = false'
  }

  getShowDieWording() {
    return this.showDie ? 'hideDie' : 'showDie';
  }

  assignAbilityScoreArray(value: {
    name: string;
    value: number;
    descrip: string;
    dropLow: boolean;
    dieArray: any[];
  }) {
    let numArray = [];

    value.dieArray = value.dropLow ? this.randomRoller.getDieArray(4, 6) : this.randomRoller.getDieArray(3,6);
    numArray = value.dieArray;
    if (value.dropLow) {
      numArray.sort((a, b) => b -a).pop;
    }
    value.value = numArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    // value.value = value.dropLow ? this.randomRoller.dropLowest(4, 6) : this.randomRoller.rollMultipleDice(3,6);
    if (this.chosenPvnk.abilityMods.hasOwnProperty(value.name)) {
      value.value = value.value + this.chosenPvnk.abilityMods[value.name];
    }
  }

  assignAbilityValue(value: {
      name: string;
      value: number;
      descrip: string;
    }, rerolledToughness?: boolean ) {

  switch(true) {
    case value.value <= 4: {
      value.value = -3;
      break;
    }
    case value.value >= 5 && value.value <= 6: {
      value.value = -2;
      break;
    }
    case value.value >= 7 && value.value <= 8: {
      value.value = -1;
      break;
    }
    case value.value >= 9 && value.value <=12: {
      value.value = 0;
      break;
    }
    case value.value >= 13 && value.value <=14: {
      value.value = +1;
      break;
    }
    case value.value >= 15 && value.value <=16: {
      value.value = +2;
      break;
    }
    case value.value >= 17 && value.value <=20: {
      value.value = +3;
      break;
    }
  }

  if (value.name === 'toughness') {
    this.toughness = value.value;
    this.rolledHp = rerolledToughness ? this.rolledHp : this.randomRoller.getRandomNumber(1, this.chosenPvnk.abilityMods.hp);
    this.hp = this.toughness + this.rolledHp;
    this.hp = this.hp <= 0 ? 1 : this.hp;
  }
};

  getAbilityMods(specificAbility?: string) {
    if (this.chosenPvnk.name.includes('pvnk') && !specificAbility) {
      // reset dropLow
      for (let i = 0; i < this.abilities.length - 1; i++) {
        this.abilities[i].dropLow = false;
      }
      let prevIndex = -1;

      // randomly assign dropLow flag
      for (let i = 0; i < 2; i++) {
        let index = this.randomRoller.getRandomNumber(0, this.abilities.length - 1, prevIndex);
        prevIndex = index;
        this.abilities[index].dropLow = true;
      }
    }

    if (specificAbility) {
      for (const [key, value] of Object.entries(this.abilities)) {
        if (value.name === specificAbility) {
          this.assignAbilityScoreArray(value);
          if (specificAbility === 'toughness') {
            this.assignAbilityValue(value, true);
          } else {
            this.assignAbilityValue(value);
          }
        }
      }
    } else {
      for (const [key, value] of Object.entries(this.abilities)) {
        this.assignAbilityScoreArray(value);
        this.assignAbilityValue(value);
      }
    }
  }

  getCyberNanoApp(event: any) {
    if (event.nano.length) {
      this.nano = event.nano;
    }

    if (event.apps.length) {
      this.apps = event.apps;
    }

    if (event.cyber.length) {
      this.cyberTech = event.cyber;
    }
  }

  setBackground() {
    const themeBackgrounds: any = {
      void: 'white',
      dark: 'black',
      mork: 'rgb(255, 232, 44)',
      hot: 'rgb(241, 66, 175)',
      terminal: 'rgb(51, 32, 42)',
      malfunction: 'rgb(51, 32, 42)',
      blues: 'blue',
    };
    const theme = localStorage.getItem('theme') || 'void';
    document.body.style.backgroundColor = themeBackgrounds[theme];

  }

  print() {
    document.body.style.backgroundColor = 'white';
    window.print();
    this.setBackground();
  }
}
