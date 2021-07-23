import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { QuestionsInterface } from '../shared/interfaces/questions.interface';
import { AnswersInterface } from '../shared/interfaces/answers.interface';
import { QUESTIONS } from '../shared/constants/questions';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  allQuestions: QuestionsInterface[];
  questionnaireQuestions$: Observable<QuestionsInterface[]>;
  allQuestionsList$ = new BehaviorSubject<QuestionsInterface[]>(this.getAllQuestionsList());

  answers$: Observable<QuestionsInterface[]>;
  allAnswers$ = new BehaviorSubject<AnswersInterface>(this.getAllAnswers());


  updateQuestions$(allQuestions: any): void {
    this.questionnaireQuestions$ = combineLatest([
      of(allQuestions),
      this.allAnswers$
    ]).pipe(
      map(([questions, allAnswers]) => {
        return questions.filter(question => {
          return !Object.keys(allAnswers).includes(String(question.id));
        });
      }),
    );

    this.answers$ = combineLatest([
      of(allQuestions),
      this.allAnswers$
    ]).pipe(
      map(([questions, allAnswers]) => {
        return questions.filter(question => {
          return Object.keys(allAnswers).includes(String(question.id));
        }).sort((current, next) => {
          return allAnswers[next.id].createdAt - allAnswers[current.id].createdAt;
        });
      }),
    );
  }


  setAllQuestions(): void {
    localStorage.setItem('all_questions', JSON.stringify(QUESTIONS));
    this.getAllQuestions();
  }

  getAllQuestions(): void {
    this.allQuestions = JSON.parse(localStorage.getItem('all_questions') || '[]');
    this.updateQuestions$(this.allQuestions);
  }

  setAnswer(questionId: number, answer: string | string[]): void {
    const answers = this.getAllAnswers();
    answers[questionId] = {createdAt: Date.now(), value: answer};
    localStorage.setItem('answers', JSON.stringify(answers));

    this.allAnswers$.next(answers);
  }

  deleteAnswer(questionId: number): void {
    const answers = this.getAllAnswers();
    delete answers[questionId];
    localStorage.setItem('answers', JSON.stringify(answers));

    this.allAnswers$.next(answers);
  }

  getAllAnswers(): AnswersInterface {
    return JSON.parse(localStorage.getItem('answers') || '{}');
  }

  getAllAnswersById(id: any): AnswersInterface {
    const answers = this.getAllAnswers();
    return answers[id];
  }

  /** Management questions */

  getAllQuestionsList(): QuestionsInterface[] {
    const questions = JSON.parse(localStorage.getItem('all_questions') || '[]');
    if (this.allQuestionsList$) {
      this.updateQuestionsList();
    }
    return questions;
  }

  updateQuestionsList(): void {
    const questions = JSON.parse(localStorage.getItem('all_questions') || '[]');
    this.allQuestionsList$.next(questions);
  }

  createQuestion(question: QuestionsInterface): void {
    this.allQuestions = [...this.allQuestions, question];
    localStorage.setItem('all_questions', JSON.stringify([...this.allQuestions]));
    this.updateQuestions$(this.allQuestions);
  }

  deleteQuestion(questionId): void {
    const questionsList = this.allQuestions = JSON.parse(localStorage.getItem('all_questions') || '[]').filter(n => n.id !== questionId);
    localStorage.setItem('all_questions', JSON.stringify(questionsList));
    this.updateQuestionsList();
    this.updateQuestions$(questionsList);
  }

  getQuestionById(id): QuestionsInterface {
    const questions = this.getAllQuestionsList();
    return questions.find(x => x.id === id);
  }


}
