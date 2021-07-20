import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsManagementRoutingModule } from './questions-management-routing.module';
import { QuestionsManagementComponent } from './containers/question-management/questions-management.component';
import { QuestionsBuilderComponent } from './questions-builder/questions-builder.component';
import { MaterialModule } from '../../shared/material/material.module';
import { TextareaComponent } from './form-elements/textarea/textarea.component';
import { CheckboxComponent } from './form-elements/checkbox/checkbox.component';
import { RadioComponent } from './form-elements/radio/radio.component';
import { InputComponent } from './form-elements/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuestionsManagementComponent,
    QuestionsBuilderComponent,
    TextareaComponent,
    CheckboxComponent,
    RadioComponent,
    InputComponent
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
