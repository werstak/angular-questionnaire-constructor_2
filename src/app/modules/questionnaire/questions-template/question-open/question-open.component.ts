import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { QuestionnaireService } from '../../questionnaire.service';

import { AnswersInterface } from '../../../../shared/interfaces/answers.interface';
import { QuestionsInterface } from '../../../../shared/interfaces/questions.interface';

@Component({
  selector: 'app-question-open',
  templateUrl: './question-open.component.html',
  styleUrls: ['./question-open.component.scss']
})
export class QuestionOpenComponent implements OnInit {

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
      answer: this.fb.control({value: this.answer?.value, disabled: this.isEdit}, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(225)])
      ),
    });
  }

  submit(): void {
    if (this.isEdit) {
      this.questionnaireService.deleteAnswer(this.question.id);
    } else {
      this.questionnaireService.setAnswer(
        this.question.id,
        this.form.value.answer
      );
    }
  }
}
