import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { inboxComponent } from './components/inbox/inbox.component';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { CreateTicketModalComponent } from './components/create-ticket-modal/create-ticket-modal.component';
import { EditTicketModalComponent } from './components/edit-ticket-modal/edit-ticket-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { TicketStateService } from './services/ticket-state.service';
import { DataService } from './models/generated';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { MatCardModule, MatIconModule, MatTooltipModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TicketCommentsComponent } from './components/ticket-comments/ticket-comments.component';
import { CommentComponent } from './components/comment/comment.component';
import {NgArrayPipesModule} from 'angular-pipes';

@NgModule({
  declarations: [
    AppComponent,
    inboxComponent,
    TicketCardComponent,
    CreateTicketModalComponent,
    EditTicketModalComponent,
    HeaderComponent,
    TicketCommentsComponent,
    CommentComponent,
  ],
  imports: [
    NgArrayPipesModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    QuillModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [
    DataService,
    TicketStateService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateTicketModalComponent, EditTicketModalComponent]
})
export class AppModule { }
