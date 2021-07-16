import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionManagementRoutingModule } from './question-management-routing.module';
import { QuestionManagementComponent } from './containers/question-management/question-management.component';
import { CreateUpdateQuestionComponent } from './create-update-question/create-update-question.component';


@NgModule({
  declarations: [QuestionManagementComponent, CreateUpdateQuestionComponent],
  imports: [
    CommonModule,
    QuestionManagementRoutingModule
  ]
})
export class QuestionManagementModule { }
