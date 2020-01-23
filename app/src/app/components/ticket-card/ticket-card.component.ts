import { Component, OnInit, Input } from '@angular/core';
import { TicketListItem, Ticket, DataService } from '../../models/generated';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { EditTicketModalComponent } from '../edit-ticket-modal/edit-ticket-modal.component';
import { TicketStateService } from '../../services/ticket-state.service';
import { zip } from '../../../../node_modules/rxjs';
import { CommentStateService } from '../../services/comment-state.service';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent implements OnInit {

  @Input() ticket: TicketListItem;

  constructor(private matDialog: MatDialog, private ticketState: TicketStateService, private commentState: CommentStateService, private dataService: DataService) { }

  ngOnInit() { }

  editTicket() {
    zip(
      this.dataService.ticket.getCommentsForTicketId(this.ticket.Id),
      this.dataService.ticket.getSingleTicket(this.ticket.Id)
    ).subscribe(t => {
      this.commentState.List.state = t[0];
      this.ticketState.SelectedTicket.state = t[1];
      this.matDialog.open(EditTicketModalComponent, {
        position: {top: '10vh' },
        panelClass: 'modal-responsive',
        autoFocus: false
      });
    });
    
  }
}
