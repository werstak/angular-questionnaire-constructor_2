import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../../questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  questions$ = this.questionnaireService.questions$;
  answers$ = this.questionnaireService.answers$;

  constructor(
    private questionnaireService: QuestionnaireService
  ) { }

  ngOnInit(): void {
  }

}
