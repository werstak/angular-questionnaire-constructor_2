import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsInterface } from '../../../shared/interfaces/questions.interface';

@Component({
  selector: 'app-questions-builder',
  templateUrl: './questions-builder.component.html',
  styleUrls: ['./questions-builder.component.scss']
})
export class QuestionsBuilderComponent implements OnInit {
  questionTitle: QuestionsInterface;
  formQuestionsBuilder: FormGroup;

  selectedType: {}[] = [
    {questionType: 'radio', value: 'Single choice - the ability to choose only one option from the proposed'},
    {questionType: 'checkbox', value: 'Multiple Choice - the ability to choose several of the proposed options'},
    {questionType: 'textarea', value: 'Open - the ability to write (type) your answer'},
  ];

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initialForm();
  }

  private initialForm(): void {
    this.formQuestionsBuilder = this.fb.group({
      questionTitle: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)])
      ],
      questionType: [null, Validators.required],

      options: this.fb.array([this.fb.group({
        value: [null, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)])
        ],
        title: [null, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)])
        ],
      })]),

      // options: this.fb.group({
      //   value: [null, Validators.compose([
      //     Validators.required,
      //     Validators.minLength(3),
      //     Validators.maxLength(10)])
      //   ],
      //   title: [null, Validators.compose([
      //     Validators.required,
      //     Validators.minLength(3),
      //     Validators.maxLength(200)])
      //   ],
      // }),

    });

  }

  get options(): Array<AbstractControl> {
    return (this.formQuestionsBuilder.get('options') as FormArray).controls;
  }

  addNewAnswer(): void {
    const answersModel = this.fb.group({
      value: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)])
      ],
      title: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)])
      ],
    });
    (this.formQuestionsBuilder.get('options') as FormArray).push(answersModel);

  }

  submitQuestion(): void {
    console.log('formQuestionsBuilder', this.formQuestionsBuilder.value);
    this.formQuestionsBuilder.reset();
  }

}
