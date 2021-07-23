import { Component, OnDestroy, OnInit } from '@angular/core';

import { QuestionnaireService } from '../../../../services/questionnaire.service';

@Component({
  selector: 'app-question-management',
  templateUrl: './questions-management.component.html',
  styleUrls: ['./questions-management.component.scss']
})
export class QuestionsManagementComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['date', 'questionTitle', 'edit', 'delete'];
  allQuestionsList$ = this.questionnaireService.allQuestionsList$;

  constructor(
    private questionnaireService: QuestionnaireService,
  ) {
  }

  ngOnInit(): void {
    this.questionnaireService.getAllQuestionsList();
  }

  dellQuestion(id): void {
    this.questionnaireService.deleteQuestion(id);
  }

  ngOnDestroy(): void {
  }

}
