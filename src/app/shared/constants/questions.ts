import { QuestionsInterface } from '../interfaces/questions.interface';

export const QUESTIONS: QuestionsInterface[] = [
  {
    id: 1,
    questionType: 'radio',
    questionTitle: 'How did you hear about our "product" for the first time?',
    answers: [
      {value: 'one_answer', title: 'On TV'},
      {value: 'two_answer', title: 'On the Internet / Website'},
      {value: 'three_answer', title: 'From friends'},
    ]
  },
  {
    id: 2,
    questionType: 'checkbox',
    questionTitle: 'Where did you buy the "product"?',
    answers: [
      {value: 'one_answer', title: 'At the pharmacy'},
      {value: 'two_answer', title: 'In the Internet'},
      {value: 'three_answer', title: 'In the mall'},
    ]
  },
  {
    id: 3,
    questionType: 'textarea',
    questionTitle: 'What do you like most about our "product"?',
    answer: '',
  },
  {
    id: 4,
    questionType: 'radio',
    questionTitle: 'Please rate the overall quality of our "product":',
    answers: [
      {value: 'one_answer', title: 'Low'},
      {value: 'two_answer', title: 'Average'},
      {value: 'three_answer', title: 'High'},
    ]
  },
  {
    id: 5,
    questionType: 'checkbox',
    questionTitle: 'How often do you use the "product"?',
    answers: [
      {value: 'one_answer', title: 'Daily'},
      {value: 'two_answer', title: 'Once a week'},
      {value: 'three_answer', title: 'Once a month'},
      {value: 'four_answer', title: 'Once a year'},
    ]
  },
  {
    id: 6,
    questionType: 'textarea',
    questionTitle: 'If you have any suggestions for improving our "product"?',
    answer: '',
  },
];
