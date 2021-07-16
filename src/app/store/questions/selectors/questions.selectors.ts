import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../app.state';

export const selectAuth = (state: AppStateInterface) => state;

export const getQuestions = createSelector(selectAuth, (state) => state.questions);
// export const getQuestions = createSelector(selectAuth, (state) => state.payload);

