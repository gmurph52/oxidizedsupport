import { Component, OnInit } from '@angular/core';
import { CommentStateService } from '../../services/comment-state.service';
import { Comment, User, TicketItem, DataService } from '../../models/generated';
import { TicketComment } from '../../models/generated/TicketComment';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import createFormGroup from '../../services/helpers/create-form-group';
import { Validators, FormGroup, ValidationErrors } from '../../../../node_modules/@angular/forms';
import { TicketStateService } from '../../services/ticket-state.service';

@Component({
  selector: 'app-ticket-comments',
  templateUrl: './ticket-comments.component.html',
  styleUrls: ['./ticket-comments.component.scss']
})
export class TicketCommentsComponent implements OnInit {

  commentForm = createFormGroup<Pick<Comment, "BodyText">>({ BodyText: undefined}, {
    BodyText: [ Validators.required ],
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

  constructor(public commentState: CommentStateService, public ticketStateService: TicketStateService, public userService: UserService, public dataService: DataService) { }

  ngOnInit() { }

  save() {
    let comment = new Comment({
      TicketId: this.ticketStateService.SelectedTicket.state.Id,
      BodyText: this.commentForm.value['BodyText']
    });

    this.commentForm.reset();

    this.dataService.ticket.addComment(comment).subscribe(c => {
      this.commentState.List.state = [...this.commentState.List.state, c];
    });
  }
}
