import { Component, OnInit } from '@angular/core';
import { DataService, Ticket } from '../../models/generated';
import createFormGroup from '../../services/helpers/create-form-group';
import { Validators, ValidationErrors } from '@angular/forms';
import { TicketStateService } from '../../services/ticket-state.service';
import { DropDownItem } from '../inbox/inbox.component';
import { SearchParamsStateService } from '../../services/search-params-state.service';

@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.scss']
})
export class CreateTicketModalComponent implements OnInit {
  ticketForm = createFormGroup(new Ticket({Title: "", Description: "", SystemCode: ""}), {
    Title: [ Validators.required ],
    SystemCode: [ Validators.required ],
  });

  systems: DropDownItem[] = [
    {Code: 'CMP', Name: 'Camp'},
    {Code: 'HLX', Name: 'Helix'},
    {Code: 'RPS', Name: 'RPS'}
  ];

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

  constructor(public dataService: DataService, public ticketState: TicketStateService, private searchParamsState: SearchParamsStateService) { }

  ngOnInit() {
  }

  getControlErrors(name: keyof Ticket): ValidationErrors {
    return this.ticketForm.get(name).errors;
  }

  save() {
    let ticket = new Ticket(...this.ticketForm.value);
    this.dataService.ticket.createOrUpdate(ticket).subscribe(newTicket => {
      this.dataService.ticket.getTickets(this.searchParamsState.params.state).subscribe(t => this.ticketState.List.state = t);
    });
  }
}
