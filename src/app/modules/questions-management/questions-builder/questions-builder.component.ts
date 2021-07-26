import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsInterface } from '../../../shared/interfaces/questions.interface';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionnaireService } from '../../../services/questionnaire.service';
import * as uuid from 'uuid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions-builder',
  templateUrl: './questions-builder.component.html',
  styleUrls: ['./questions-builder.component.scss']
})
export class QuestionsBuilderComponent implements OnInit, OnDestroy {
  isEdit = false;

  questionTitle: QuestionsInterface;
  formQuestionsBuilder: FormGroup;
  lengthArrayAnswer = 2;
  maxAnswers = 5;
  date = new Date();
  changeForm: Subscription;

  selectedType = [
    {questionType: 'radio', value: 'Single choice - the ability to choose only one option from the proposed'},
    {questionType: 'checkbox', value: 'Multiple Choice - the ability to choose several of the proposed options'},
    {questionType: 'textarea', value: 'Open - the ability to write (type) your answer'},
  ];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private activateRoute: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
  ) {
  }

  ngOnInit(): void {
    const id: string = this.activateRoute.snapshot.params.id;
    const currentQuestion = this.questionnaireService.getQuestionById(id) || null;

    this.isEdit = Boolean(currentQuestion);

    this.initialForm(currentQuestion);

    this.changeForm = this.questionTypeControl.valueChanges
      .subscribe(type => {
        this.options.forEach((option: FormControl) => {
          option.get('title').reset();
        });

        if (type === 'textarea') {
          this.optionsFormArray.disable();
        } else {
          this.optionsFormArray.enable();
        }
      });
  }

  private initialAnswerGroup(): any {
    return this.fb.group({
      value: [uuid.v4()],
      title: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)])
      ],
    });
  }

  private initialForm(currentQuestion?: QuestionsInterface): void {
    const id = currentQuestion?.id || uuid.v4();
    const date = currentQuestion?.date || this.date;
    const questionType = currentQuestion?.questionType || 'radio';
    const questionTitle = currentQuestion?.questionTitle || null;
    const answers = currentQuestion?.answers?.map(answer => {
      return this.fb.group({
        value: [answer.value],
        title: [answer.title, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)])
        ],
      });
    }) || [this.initialAnswerGroup(), this.initialAnswerGroup()];

    this.formQuestionsBuilder = this.fb.group({
      id: [id],
      date: [date],
      questionType: [{value: questionType, disabled: this.isEdit}, Validators.required],
      questionTitle: [questionTitle, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)])
      ],
      answers: this.fb.array(questionType === 'textarea' ? [] : answers),
    });
  }

  get optionsFormArray(): FormArray {
    return this.formQuestionsBuilder.get('answers') as FormArray;
  }

  get options(): Array<AbstractControl> {
    return this.optionsFormArray.controls;
  }

  get questionTypeControl(): FormControl {
    return this.formQuestionsBuilder.get('questionType') as FormControl;
  }

  addNewAnswer(): void {
    if (this.lengthArrayAnswer < this.maxAnswers) {
      const optionsModel = this.fb.group({
        value: [uuid.v4()],
        title: [null, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)])
        ],
      });
      (this.formQuestionsBuilder.get('answers') as FormArray).push(optionsModel);
      this.lengthArrayAnswer++;
    }
    return;
  }

  removeAnswer(index): void {
    const answerArray = (this.formQuestionsBuilder.get('answers') as FormArray);
    answerArray.removeAt(index);
    this.lengthArrayAnswer--;
  }

  goBack(): void {
    this.location.back();
  }

  submitQuestion(): void {
    const dataForm = {
      ...this.formQuestionsBuilder.value,
      questionType: this.questionTypeControl.value
    };
    if (this.isEdit) {
      this.questionnaireService.updateQuestion(dataForm);
    } else {
      this.questionnaireService.createQuestion(dataForm);
    }

    this.goBack();
  }

  ngOnDestroy(): void {
    this.changeForm.unsubscribe();
  }
}
