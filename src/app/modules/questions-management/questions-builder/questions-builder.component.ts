import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsInterface } from '../../../shared/interfaces/questions.interface';
import { Location } from '@angular/common';

import * as uuid from 'uuid';

@Component({
  selector: 'app-questions-builder',
  templateUrl: './questions-builder.component.html',
  styleUrls: ['./questions-builder.component.scss']
})
export class QuestionsBuilderComponent implements OnInit {
  questionTitle: QuestionsInterface;
  formQuestionsBuilder: FormGroup;
  lengthArrayAnswer = 1;
  maxAnswers = 5;

  selectedType: {}[] = [
    {questionType: 'radio', value: 'Single choice - the ability to choose only one option from the proposed'},
    {questionType: 'checkbox', value: 'Multiple Choice - the ability to choose several of the proposed options'},
    {questionType: 'textarea', value: 'Open - the ability to write (type) your answer'},
  ];

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.initialForm();
  }

  private initialForm(): void {
    this.formQuestionsBuilder = this.fb.group({
      id: [uuid.v4()],
      questionType: [null, Validators.required],
      questionTitle: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)])
      ],
      answers: this.fb.array([this.fb.group({
        value: [uuid.v4()],
        title: [null, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)])
        ],
      })]),
      answer: [null]
    });
  }

  get options(): Array<AbstractControl> {
    return (this.formQuestionsBuilder.get('answers') as FormArray).controls;
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
    console.log('dataForm', dataForm);

    this.formQuestionsBuilder.reset();
    const answerArray = (this.formQuestionsBuilder.get('answers') as FormArray);
    answerArray.clear();
    this.goBack();
  }


}
