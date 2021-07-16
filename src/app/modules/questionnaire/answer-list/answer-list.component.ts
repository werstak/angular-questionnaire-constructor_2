import { Component, Input, OnInit } from '@angular/core';
import { QuestionsInterface } from '../../../shared/interfaces/questions.interface';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {
  @Input()
  answers: QuestionsInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}

