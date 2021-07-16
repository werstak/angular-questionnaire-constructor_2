import { Action, createReducer, on } from '@ngrx/store';
import * as questionsActions from '../actions/questions.actions';
import { initialQuestionsState, QuestionsStateInterface } from '../state/questions.state';


const reducer = createReducer(
  initialQuestionsState,
  on(questionsActions.fetchQuestionsAction, (state) => (
    {
      ...state,
    }
  )),
  on(questionsActions.fetchQuestionsSuccessAction, (state, {payload}) => (
    {
      ...state,
      payload
    }
  )),
  on(questionsActions.fetchQuestionsFailedAction, (state, {error}) => (
    {
      ...state,
      error
    }
  )),
);

export function questionsReducer(
  state: QuestionsStateInterface | undefined, action: Action
): QuestionsStateInterface {
  return reducer(state, action);
}
