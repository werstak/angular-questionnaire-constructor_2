import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { QuestionnaireService } from '../../questionnaire.service';

import { QuestionsInterface } from '../../../../shared/interfaces/questions.interface';
import { AnswersInterface } from '../../../../shared/interfaces/answers.interface';

@Component({
  selector: 'app-question-single-choice',
  templateUrl: './question-single-choice.component.html',
  styleUrls: ['./question-single-choice.component.scss']
})
export class QuestionSingleChoiceComponent implements OnInit {
  @Input()
  question: QuestionsInterface;
  form: FormGroup;
  answer: AnswersInterface;

  constructor(
    private questionnaireService: QuestionnaireService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.answer = this.questionnaireService.getAllAnswersById(this.question.id) || null;
    this.buildForm();
  }

  get isEdit(): boolean {
    return Boolean(this.answer);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      answer: this.fb.control({value: this.answer?.value, disabled: this.isEdit}, Validators.required)
    });
  }

  submit(): void {
    if (this.isEdit) {
      this.questionnaireService.deleteAnswer(this.question.id);
    } else {
      this.questionnaireService.setAnswer(
        this.question.id,
        this.form.value.answer,
      );
    }
  }
}
