import { createAction, props } from '@ngrx/store';
import { AnswersInterface } from '../../../shared/interfaces/answers.interface';

export const fetchAnswersAction = createAction(
  '[Answers] Get Answers',
  props<{ payload: AnswersInterface }>()
);

export const fetchAnswersSuccessAction = createAction(
  '[Answers] Get Answers Success',
  props<{ payload: AnswersInterface }>()
);

export const fetchAnswersFailedAction = createAction(
  '[Answers] Get Answers Failed',
  props<{ error: Error }>());
