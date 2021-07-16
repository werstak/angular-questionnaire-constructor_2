import { Injectable } from '@angular/core';

import { of } from 'rxjs';

import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchQuestionsAction,
  fetchQuestionsFailedAction,
  fetchQuestionsSuccessAction
} from '../actions/questions.actions';

import { QuestionsService } from '../../../services/questions.service';


@Injectable()
export class QuestionsEffects {
  constructor(
    private actions$: Actions,
    private questionsService: QuestionsService,
  ) {
  }

  /** Getting Questions */
  fetchQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchQuestionsAction),
      switchMap(action =>
        this.questionsService.fetchQuestions().pipe(
          map(data => fetchQuestionsSuccessAction({payload: data}) ),
          catchError(error => of(fetchQuestionsFailedAction(error)))
        )
      )
    )
  );

}
