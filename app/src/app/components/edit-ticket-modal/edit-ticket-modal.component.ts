import { Component, OnInit } from '@angular/core';
import createFormGroup from '../../services/helpers/create-form-group';
import { DataService, Ticket, TicketItem } from '../../models/generated';
import { Validators, ValidationErrors, FormGroup } from '../../../../node_modules/@angular/forms';
import { TicketStateService } from '../../services/ticket-state.service';
import { tap, filter } from '../../../../node_modules/rxjs/operators';
import { DropDownItem } from '../inbox/inbox.component';
import { SearchParamsStateService } from '../../services/search-params-state.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-ticket-modal',
  templateUrl: './edit-ticket-modal.component.html',
  styleUrls: ['./edit-ticket-modal.component.scss']
})
export class EditTicketModalComponent implements OnInit {
  
  // cound use one form group but I thought it would be buggy.
  titleForm = createFormGroup<Pick<TicketItem, "Title">>(this.ticketState.SelectedTicket.state, {
    Title: [ Validators.required ],
  });

  descriptionForm = createFormGroup<Pick<TicketItem, "Description">>(this.ticketState.SelectedTicket.state, {
    Description: [ Validators.required ],
  });

  statusForm = createFormGroup<Pick<TicketItem, "StatusCode">>(this.ticketState.SelectedTicket.state, {
    StatusCode: [ Validators.required ],
  });

  defaultModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  statuses: DropDownItem[] = [
    {Code: 'INSUPPORT', Name: 'In Support'},
    {Code: 'APPRNEEDED', Name: 'CCB Approval Needed'},
    {Code: 'REJECTED', Name: 'CCB Rejected'},
    {Code: 'INDEV', Name: 'In Development'},
    {Code: 'RESOLVED', Name: 'Resolved'}
  ];

  isEditing: {[key: string]: boolean} = {};
  isSupport = false;

  constructor(public dataService: DataService, public ticketState: TicketStateService, public searchParamsState: SearchParamsStateService, private userService: UserService) {
    userService.currentUser.subject.pipe(filter(u => !!u)).subscribe(u => {
      if(u.UserRoles.some(r => r.RoleCode === "SUPPORT")) {
        this.isSupport = true;
      }
    });
   }

  ngOnInit() {
  }

  getControlErrors(form: FormGroup, name: keyof TicketItem): ValidationErrors {
    return form.get(name).errors;
  }

  save(form: FormGroup) {
    let ticket = new Ticket({
      ...this.ticketState.SelectedTicket.state as any,
      // StatusCode: this.ticketState.SelectedTicket.state.StatusCode,
      // SystemCode: this.ticketState.SelectedTicket.state.SystemCode,
      // Status: undefined,
      // System: undefined
    });
    
    if(form === this.descriptionForm) {
      ticket.Description = form.value['Description'];
    }
    
    if(form === this.titleForm) {
      ticket.Title = form.value['Title'];
    }

    if(form === this.statusForm) {
      ticket.StatusCode = form.value['StatusCode'];
      this.ticketState.SelectedTicket.state.Status.Name = this.statuses.find(s => s.Code === ticket.StatusCode).Name;
    }

    this.dataService.ticket.createOrUpdate(ticket).subscribe(nt => {
      this.ticketState.SelectedTicket.state = {
        ...this.ticketState.SelectedTicket.state,
        Title: nt.Title
      };

      this.dataService.ticket.getTickets(this.searchParamsState.params.state).subscribe(t => this.ticketState.List.state = t);
    });
  }

  cancel(form: FormGroup) {
    form.reset();
  }

  // save() {
  //   let ticket = new CreateUpdateTicketItem(...this.ticketForm.value);
  //   this.dataService.ticket.createOrUpdate(ticket).subscribe(newTicket => {
  //     this.ticketState.List.state = [...this.ticketState.List.state, newTicket as any];
  //   });
  // }
}
