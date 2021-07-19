import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsInterface } from '../../../shared/interfaces/questions.interface';
import { AnswersInterface } from '../../../shared/interfaces/answers.interface';

@Component({
  selector: 'app-questions-constructor',
  templateUrl: './questions-constructor.component.html',
  styleUrls: ['./questions-constructor.component.scss']
})
export class QuestionsConstructorComponent implements OnInit {
  question: QuestionsInterface;
  // form: FormGroup;
  answer: AnswersInterface;

  constructor(
    // private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initialForm();
  }

  private initialForm(): void {

  }

}
