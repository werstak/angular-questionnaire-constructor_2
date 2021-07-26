import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsManagementRoutingModule } from './questions-management-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuestionsManagementComponent } from './containers/question-management/questions-management.component';
import { QuestionsBuilderComponent } from './questions-builder/questions-builder.component';


@NgModule({
  declarations: [
    QuestionsManagementComponent,
    QuestionsBuilderComponent,
  ],
  imports: [
    CommonModule,
    QuestionsManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class QuestionsManagementModule {
}
