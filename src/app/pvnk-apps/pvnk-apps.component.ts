import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pvnk-apps',
  templateUrl: './pvnk-apps.component.html',
  styleUrls: ['./pvnk-apps.component.scss']
})
export class PvnkAppsComponent implements OnInit {
  @Input() apps: any;

  constructor() { }

  ngOnInit(): void {
  }

}
