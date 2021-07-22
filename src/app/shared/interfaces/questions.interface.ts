export class QuestionsInterface {
  id: number;
  date?: string;
  questionType: string;
  questionTitle: string;
  answers?: Array<{value: string, title: string}>;
}
