import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {
  @Output() userAccess: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  userAccessed(name: string): void{
    this.userAccess.emit(name);
  }

}
