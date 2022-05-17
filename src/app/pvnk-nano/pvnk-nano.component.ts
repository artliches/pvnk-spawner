import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pvnk-nano',
  templateUrl: './pvnk-nano.component.html',
  styleUrls: ['./pvnk-nano.component.scss']
})
export class PvnkNanoComponent implements OnInit {
  @Input() nano: any;

  constructor() { }

  ngOnInit(): void {
  }

}
