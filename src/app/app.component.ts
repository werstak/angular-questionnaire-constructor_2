import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './modules/questionnaire/questionnaire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-questionnaire-constructor';

  constructor(
    private questionnaireService: QuestionnaireService,
  ) {
  }

  ngOnInit(): void {
    this.questionnaireService.setAllQuestions();
  }
}
