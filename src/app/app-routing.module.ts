import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './core/containers/navigation/navigation.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        redirectTo: 'questionnaire/list',
        pathMatch: 'full'
      },
      {
        path: 'question-management',
        loadChildren: () => import('./modules/question-management/question-management.module').then(m => m.QuestionManagementModule)
      },
      {
        path: 'questionnaire',
        loadChildren: () => import('./modules/questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)
      },
      {path: '**', component: PageNotFoundComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
