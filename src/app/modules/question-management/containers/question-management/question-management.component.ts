import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchQuestionsAction } from '../../../../store/questions/actions/questions.actions';
import { getQuestions } from '../../../../store/questions/selectors/questions.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {

  public question$: Observable<any>;

  constructor(
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(fetchQuestionsAction());

    this.question$ = this.store.select(getQuestions);

    console.log('QuestionManagementComponent', this.question$);

  }

}
