import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pvnk-cybertech',
  templateUrl: './pvnk-cybertech.component.html',
  styleUrls: ['./pvnk-cybertech.component.scss']
})
export class PvnkCybertechComponent implements OnInit {
  @Input() cyberTech: any;

  constructor() { }

  ngOnInit(): void {
  }

}
