import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pvnk-identity',
  templateUrl: './pvnk-identity.component.html',
  styleUrls: ['./pvnk-identity.component.scss']
})
export class PvnkIdentityComponent implements OnInit {
  @Input() pvnk: any;
  @Input() hp = 0;

  constructor() { }

  ngOnInit(): void {
    
  }

}
