import { Component, OnInit } from '@angular/core';
import { TicketStateService } from '../../services/ticket-state.service';
import { DataService, TicketListItem, Status } from '../../models/generated';
import { MatDialog, MatSelectChange } from '@angular/material';
import { CreateTicketModalComponent } from '../create-ticket-modal/create-ticket-modal.component';
import { GetTicketsParams } from '../../models/generated/GetTicketsParams';
import { SearchParamsStateService } from '../../services/search-params-state.service';
import { UserService } from '../../services/user.service';
import { filter } from '../../../../node_modules/rxjs/operators';

export interface DropDownItem {
  Code: string;
  Name: string;
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class inboxComponent implements OnInit {
  status: DropDownItem[] = [
    {Code: 'ALL', Name: 'All'},
    {Code: 'INSUPPORT', Name: 'In Support'},
    {Code: 'APPRNEEDED', Name: 'CCB Approval Needed'},
    {Code: 'REJECTED', Name: 'CCB Rejected'},
    {Code: 'INDEV', Name: 'In Development'},
    {Code: 'RESOLVED', Name: 'Resolved'}
  ];

  systems: DropDownItem[] = [
    {Code: 'ALL', Name: 'All'},
    {Code: 'CMP', Name: 'Camp'},
    {Code: 'HLX', Name: 'Helix'},
    {Code: 'RPS', Name: 'RPS'}
  ];

  selectedStatus: string = 'ALL';
  selectedSystem: string = 'ALL';
  userId: number = null;

  filteredTickets: TicketListItem[];

  isSupport = false;

  constructor(public ticketState: TicketStateService, public dataService: DataService, private matDialog: MatDialog, private searchParamsState: SearchParamsStateService, private userService: UserService) {
    
    userService.currentUser.subject.pipe(filter(u => !!u)).subscribe(u => {
      this.userId = u.Id;
      if(u.UserRoles.some(r => r.RoleCode === "SUPPORT")) {
        this.userId = null;
        this.isSupport = true;
      }
      searchParamsState.params.state = new GetTicketsParams({StatusCode: null, SystemCode: null, UserId: this.userId});
      this.search();
    });
  }
  
  search() {
    let statusCode = this.selectedStatus === 'ALL' ? null: this.selectedStatus;
    let systemCode = this.selectedSystem === 'ALL' ? null: this.selectedSystem;
    this.searchParamsState.params.state = new GetTicketsParams({StatusCode: statusCode, SystemCode: systemCode, UserId: this.userId});
    this.dataService.ticket.getTickets(this.searchParamsState.params.state).subscribe(d => this.ticketState.List.state = d);
  }

  ngOnInit() {
  }

  openCreateTicketModal() {
    let dialogRef = this.matDialog.open(CreateTicketModalComponent, {
      data: { },
      position: {top: '10vh' },
      panelClass: 'modal-responsive'
    });
  }

  filterTickets(selectOption: MatSelectChange) {
    this.search();
  }
}
