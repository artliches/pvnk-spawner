import { Component, Input, OnInit } from '@angular/core';
import { AppCyberNanoService } from '../services/app-cyber-nano.service';

@Component({
  selector: 'app-pvnk-apps',
  templateUrl: './pvnk-apps.component.html',
  styleUrls: ['./pvnk-apps.component.scss']
})
export class PvnkAppsComponent implements OnInit {
  @Input() apps: any;
  @Input() isHacker: boolean = false;

  constructor(
    private weirdService: AppCyberNanoService
  ) { }

  ngOnInit(): void {
  }

  rerollApp(index?: number) {
    if (index === undefined) {
      const numApps = this.isHacker ? this.apps.length - 1 : this.apps.length;
      this.apps = [];

      if (this.isHacker) {
        this.apps.push(this.weirdService.getBurnedApps());
      }

      for (let i = 0; i < numApps; i++) {
        this.apps.push(this.weirdService.getApps());
      }
    } else {
      this.apps[index] = this.isHacker && index === 0 ?
        this.weirdService.getBurnedApps() : this.weirdService.getApps(); 
    }
  }

}
