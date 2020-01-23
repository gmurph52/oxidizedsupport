import { Injectable } from '@angular/core';
import { GetTicketsParams } from '../models/generated';
import { Action } from './helpers/action';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsStateService {

  params: Action<GetTicketsParams> = new Action();
  constructor() { }
}
