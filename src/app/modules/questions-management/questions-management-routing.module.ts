import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsManagementComponent } from './containers/question-management/questions-management.component';
import { QuestionsConstructorComponent } from './questions-constructor/questions-constructor.component';

const routes: Routes = [
  {
    path: 'list',
    component: QuestionsManagementComponent,
  },
  {
    path: 'create-question',
    component: QuestionsConstructorComponent,
  },
  {
    path: 'update-question',
    component: QuestionsConstructorComponent,
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
