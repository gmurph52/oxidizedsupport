import { Injectable } from '@angular/core';
import { Action } from './helpers/action';
import { User, DataService } from '../models/generated';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: Action<User> = new Action();
  constructor(private dataService: DataService) {
    dataService.ticket.getUser().subscribe(u => {
      dataService.ticket.getUserRoles(u.Id).subscribe(r => {
        u.UserRoles = r;
        this.currentUser.state = u;
      });
    });
  }
}
