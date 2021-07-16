import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuestionnaireService } from '../../questionnaire.service';

import { QuestionsInterface } from '../../../../shared/interfaces/questions.interface';
import { AnswersInterface } from '../../../../shared/interfaces/answers.interface';

@Component({
  selector: 'app-question-multiple-choice',
  templateUrl: './question-multiple-choice.component.html',
  styleUrls: ['./question-multiple-choice.component.scss']
})
export class QuestionMultipleChoiceComponent implements OnInit {
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
    const controls = this.question.answers.reduce((acc, answer) => {
      const value = Boolean(this.answer?.value[answer.value]);
      acc[answer.value] = [{ value, disabled: this.isEdit }];
      return acc;
    }, {});
    this.form = this.fb.group(controls, {
      validators: (formGroup: FormGroup) => {
        const isFilled = Object.keys(formGroup.controls).some(key => {
          const control = formGroup.controls[key];
          return control.value;
        });
        return isFilled ? null : {requireCheckboxesToBeChecked: true};
      }
    });
  }

  submit(): void {
    if (this.isEdit) {
      this.questionnaireService.deleteAnswer(this.question.id);
    } else {
      this.questionnaireService.setAnswer(
        this.question.id,
        this.form.value
      );
    }
  }
}
