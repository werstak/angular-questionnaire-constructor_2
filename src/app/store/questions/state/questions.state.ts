import { QuestionsInterface } from '../../../shared/interfaces/questions.interface';

export interface QuestionsStateInterface {
  questions: QuestionsInterface[];
}

export const initialQuestionsState: QuestionsStateInterface = {
  questions: [],
};
