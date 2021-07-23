import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsManagementComponent } from './containers/question-management/questions-management.component';
import { QuestionsBuilderComponent } from './questions-builder/questions-builder.component';

const routes: Routes = [
  {
    path: 'list',
    component: QuestionsManagementComponent,
  },
  {
    path: 'create-question',
    component: QuestionsBuilderComponent,
  },
  {
    path: 'update-question/:id',
    component: QuestionsBuilderComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsManagementRoutingModule { }
