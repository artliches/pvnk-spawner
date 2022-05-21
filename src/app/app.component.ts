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
    {name: 'agility', value: 0, descrip: 'Sneak, dodge, drive, autofire'},
    {name: 'knowledge', value: 0, descrip: 'Science, use tech or App'},
    {name: 'presence', value: 0, descrip: 'Snipe/shoot, use Nano, charm'},
    {name: 'strength', value: 0, descrip: 'Strike, grapple, lift, throw'},
    {name: 'toughness', value: 0, descrip: 'Survive falling, poison, and elements'},
  ];
  chosenPvnk: any;
  hp = 0;
  prevPvnk = -1;
  specialPvnks = [
    {
      name: 'shunned nanomancer',
      flavor: `<strong>It\'s inside you</strong>. Infesting your brain, warping your flesh. People are afraid of you now. They\'re afraid of the power that poisons you. <strong>You\'re scared too.</strong>`,
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
      flavor: `You were one of the sharpest deckers in Cy. No one could use tech or warp the world with an App like you could. You don\'t know what went wrong. <strong>You messed up.</strong> Maybe you were tricked; maybe you got sloppy. You glimpsed a <strong>terrible truth</strong>, and now you\'re burnt. No collective, no fallback, <strong>nothing</strong>.`,
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
      flavor: `<strong>A good soldier in bad company</strong>, always fighting someone else\'s war in the name of greed. Capitalism crushed your enthusiasm quickly enough, and you were discharged without severance.`,
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
      flavor: `<strong>People are unreliable.</strong> Socially. Physically. Emotionally. Weakbodies and weaker wills. They are worn down, unfixable. Instead, you have mastered emotionless steel and loyal code. You can fix, drive, and pilot any machine. Machines, you can <strong>trust</strong>.`,
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
      flavor: `You are <strong class="slasher">DEATH</strong> incarnate-afrenzied flurry of chrome, murder, and blood-stained steel. But yours is no mindless rage. You match your trained and cybernetically enhanced body with an equally disciplined mind. <strong>You used to kill for a cause</strong>, for an ideal. Now? You kill for money.`,
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
      flavor: `You ran with the only gang to have your back and treat you like more than slum trash. <strong>They were your family</strong>, and you bled, stole, fought, and killed for them. They\'re <strong>gone</strong> now, so you have to keep your edge.`,
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
  cyberTech: any[] = [];
  nano: any[]  = [];
  apps: any[]  = [];
  equipMods = {};
  reroll = false;

  $currentTheme = this.weirdService.currentTheme;
  toughness = 0;
  maxHp = false;

  constructor(
    private randomRoller: RandomNumberService,
    private weirdService: AppCyberNanoService
  ) {}

  ngOnInit(): void {
    this.assignPvnk();
    const theme = localStorage.getItem('theme') || '';
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
    const rolledNum = this.randomRoller.getRandomNumber(0, this.specialPvnks.length - 1, this.prevPvnk);
    const newPvnk = this.specialPvnks[rolledNum];
    this.prevPvnk = rolledNum;
    this.equipMods = newPvnk.equipMods;

    return newPvnk;
  }

  assignAbilityValue(value: {
    name: string;
    value: number;
    descrip: string;
  } ) {
  value.value = this.randomRoller.rollMultipleDice(3,6);
  if (this.chosenPvnk.abilityMods.hasOwnProperty(value.name)) {
    value.value = value.value + this.chosenPvnk.abilityMods[value.name];
  }

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
    this.hp = value.value + this.randomRoller.getRandomNumber(1, this.chosenPvnk.abilityMods.hp);
    this.hp = this.hp <= 0 ? 1 : this.hp;
  }
};

  getAbilityMods(specificAbility?: string) {
    if (specificAbility) {
      for (const [key, value] of Object.entries(this.abilities)) {
        if (value.name === specificAbility) {
          this.assignAbilityValue(value);
        }
      }
    } else {
      for (const [key, value] of Object.entries(this.abilities)) {
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
