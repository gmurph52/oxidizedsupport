import { Injectable } from '@angular/core';
import { Comment } from '../models/generated';
import { Action } from './helpers/action';
import { TicketComment } from '../models/generated/TicketComment';

@Injectable({
  providedIn: 'root'
})
export class CommentStateService {

  List: Action<TicketComment[]> = new Action();
  constructor() { }
}
