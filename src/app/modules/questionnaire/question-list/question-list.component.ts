import { Component, Input, OnInit } from '@angular/core';
import { QuestionsInterface } from '../../../shared/interfaces/questions.interface';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  questions: QuestionsInterface[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
