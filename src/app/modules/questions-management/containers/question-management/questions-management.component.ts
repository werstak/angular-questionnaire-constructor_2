import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchQuestionsAction } from '../../../../store/questions/actions/questions.actions';
import { getQuestions } from '../../../../store/questions/selectors/questions.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-management',
  templateUrl: './questions-management.component.html',
  styleUrls: ['./questions-management.component.scss']
})
export class QuestionsManagementComponent implements OnInit {

  public question$: Observable<any>;

  constructor(
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(fetchQuestionsAction());

    this.question$ = this.store.select(getQuestions);

  }

}
