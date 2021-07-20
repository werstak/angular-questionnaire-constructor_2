import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsInterface } from '../../../shared/interfaces/questions.interface';
import { AnswersInterface } from '../../../shared/interfaces/answers.interface';

@Component({
  selector: 'app-questions-builder',
  templateUrl: './questions-builder.component.html',
  styleUrls: ['./questions-builder.component.scss']
})
export class QuestionsBuilderComponent implements OnInit {
  questionTitle: QuestionsInterface;
  formQuestionsBuilder: FormGroup;
  answer: AnswersInterface;


  selectedType: {}[] = [
    {questionType: 'radio', value: 'Single choice - the ability to choose only one option from the proposed'},
    {questionType: 'checkbox', value: 'Multiple Choice - the ability to choose several of the proposed options'},
    {questionType: 'textarea', value: 'Open - the ability to write (type) your answer'},
  ];

  constructor(
    private fb: FormBuilder,
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
      questionType: ['', Validators.required],
      answers: this.fb.group({
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
      }),
    });
  }

  submit(): void {
    console.log('formQuestionsBuilder', this.formQuestionsBuilder.value);
    this.formQuestionsBuilder.reset();
  }

}
