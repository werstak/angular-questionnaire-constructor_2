import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsInterface } from '../../../shared/interfaces/questions.interface';
import { Location } from '@angular/common';

import * as uuid from 'uuid';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions-builder',
  templateUrl: './questions-builder.component.html',
  styleUrls: ['./questions-builder.component.scss']
})
export class QuestionsBuilderComponent implements OnInit, OnDestroy {
  id: any;
  isEdit = false;

  questionTitle: QuestionsInterface;
  formQuestionsBuilder: FormGroup;
  lengthArrayAnswer = 2;
  maxAnswers = 5;
  date = new Date();
  changeForm: Subscription;

  currentQuestion: QuestionsInterface;

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
    this.id = this.activateRoute.snapshot.params.id;
    // console.log('snapshot.params.id ', this.id);

    this.isEdit = !!this.id;
    console.log(this.isEdit);

    this.initialForm();

    this.changeForm = this.questionTypeControl.valueChanges
      .subscribe(type => {
        this.options.forEach((option: FormControl) => {
          option.get('title').reset();
        });

        if (type === 'textarea') {
          this.answersFormArray.disable();
        } else {
          this.answersFormArray.enable();
        }
      });

    if (this.isEdit) {
      // console.log('isEdit == ');

      this.currentQuestion = this.questionnaireService.getQuestionById(this.id) || null;
      console.log('currentQuestion', this.currentQuestion);
    }

  }

  private initialForm(): void {
    this.formQuestionsBuilder = this.fb.group({
      id: [uuid.v4()],
      date: [this.date],
      questionType: ['radio', Validators.required],
      questionTitle: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)])
      ],
      answers: this.fb.array([
        this.fb.group({
          value: [uuid.v4()],
          title: [null, Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250)])
          ],
        }),
        this.fb.group({
          value: [uuid.v4()],
          title: [null, Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250)])
          ],
        })
      ]),
    });
  }

  get answersFormArray(): FormArray {
    return this.formQuestionsBuilder.get('answers') as FormArray;
  }

  get options(): Array<AbstractControl> {
    return this.answersFormArray.controls;
  }

  get questionTypeControl(): FormControl {
    return this.formQuestionsBuilder.get('questionType') as FormControl;
  }

  addNewAnswer(): void {
    if (this.lengthArrayAnswer < this.maxAnswers) {
      const answersModel = this.fb.group({
        value: [uuid.v4()],
        title: [null, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)])
        ],
      });
      (this.formQuestionsBuilder.get('answers') as FormArray).push(answersModel);
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
    const dataForm = this.formQuestionsBuilder.value;
    this.questionnaireService.createQuestion(dataForm);
    this.goBack();
  }

  ngOnDestroy(): void {
    this.changeForm.unsubscribe();
  }
}
