import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/generated';
import { TicketComment } from '../../models/generated/TicketComment';
import * as moment from 'moment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: TicketComment;

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

  constructor() { }

  ngOnInit() { }

  formatDate(date: moment.Moment) {
    if(!date) {
      return '';
    }
    let lastWeek = moment().add(-1, 'week');
    date = moment(date);
    if(date.isBefore(lastWeek)) {
      return date.calendar();
    }
    return date.fromNow();
  }

}
