export class QuestionsInterface {
  id: any;
  date?: string;
  questionType: string;
  questionTitle: string;
  answers?: Array<{value: string, title: string}>;
}
