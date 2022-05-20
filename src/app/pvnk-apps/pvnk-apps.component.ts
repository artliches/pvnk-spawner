import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppCyberNanoService } from '../services/app-cyber-nano.service';

@Component({
  selector: 'app-pvnk-apps',
  templateUrl: './pvnk-apps.component.html',
  styleUrls: ['./pvnk-apps.component.scss']
})
export class PvnkAppsComponent implements OnChanges {
  @Input() apps: any;
  @Input() isHacker: boolean = false;

  constructor(
    private weirdService: AppCyberNanoService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
      this.weirdService.currentApps.subscribe(result => this.apps = result);
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
    this.weirdService.updateApps(this.apps);
  }
}
