import { Injectable } from '@angular/core';
import { Action } from './helpers/action';
import { TicketListItem, Ticket, TicketItem } from '../models/generated';

@Injectable({
  providedIn: 'root'
})
export class TicketStateService {

  public List: Action<TicketListItem[]> = new Action();
  public SelectedTicket: Action<TicketItem> = new Action();
}
