import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { questionsReducer } from './questions/reducers/questions.reducer';


export const rootReducer: ActionReducerMap<any, any> = {
  router: routerReducer,
  questions: questionsReducer,
};
