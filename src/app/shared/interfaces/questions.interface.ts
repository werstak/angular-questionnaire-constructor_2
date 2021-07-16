export class QuestionsInterface {
  id: number;
  questionType: string;
  questionTitle: string;
  answers?: Array<{value: string, title: string}>;
  answer?: string;
}
