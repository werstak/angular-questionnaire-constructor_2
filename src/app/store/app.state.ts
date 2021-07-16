import { RouterReducerState } from '@ngrx/router-store';
import { initialQuestionsState, QuestionsStateInterface } from './questions/state/questions.state';

export interface AppStateInterface {
  router?: RouterReducerState;
  questions: QuestionsStateInterface;
}

export const initialAppState: AppStateInterface = {
  questions: initialQuestionsState,
};

export function getInitialState(): AppStateInterface {
  return initialAppState;
}
