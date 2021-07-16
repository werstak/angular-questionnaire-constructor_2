import { createAction, props } from '@ngrx/store';
import { QuestionsInterface } from '../../../shared/interfaces/questions.interface';

export const fetchQuestionsAction = createAction(
  '[Questions] Get Questions',
  // props<{ payload: QuestionsInterface }>()
);

export const fetchQuestionsSuccessAction = createAction(
  '[Questions] Get Questions Success',
  props<{ payload: QuestionsInterface }>()
);

export const fetchQuestionsFailedAction = createAction(
  '[Questions] Get Questions Failed',
  props<{ error: Error }>()
);
