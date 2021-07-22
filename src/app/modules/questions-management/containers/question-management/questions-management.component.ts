import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { fetchQuestionsAction } from '../../../../store/questions/actions/questions.actions';
// import { getQuestions } from '../../../../store/questions/selectors/questions.selectors';
import { Observable } from 'rxjs';
import { QuestionnaireService } from '../../../../services/questionnaire.service';
import { AnswersInterface } from '../../../../shared/interfaces/answers.interface';
import { QuestionsInterface } from '../../../../shared/interfaces/questions.interface';

@Component({
  selector: 'app-question-management',
  templateUrl: './questions-management.component.html',
  styleUrls: ['./questions-management.component.scss']
})
export class QuestionsManagementComponent implements OnInit {
  displayedColumns: string[] = ['date', 'questionTitle', 'edit', 'delete'];
  questions$ = this.questionnaireService.questions$;
  // answers$ = this.questionnaireService.answers$;

  answer: AnswersInterface;
  question: QuestionsInterface;

  public question$: Observable<any>;

  constructor(
    private store: Store<any>,
    private questionnaireService: QuestionnaireService,
  ) {
  }

  ngOnInit(): void {
    // this.store.dispatch(fetchQuestionsAction());
    // this.question$ = this.store.select(getQuestions);

    this.questionnaireService.getAllQuestionsList();
  }

  dellQuestion(id): void {
    console.log('id===', id);
    this.questionnaireService.deleteQuestion(id);
  }

  editQuestion(id): void {
    console.log('id===', id);
  }
}
