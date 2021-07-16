import { Injectable } from '@angular/core';
import { QUESTIONS } from '../../shared/constants/questions';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { QuestionsInterface } from '../../shared/interfaces/questions.interface';
import { AnswersInterface } from '../../shared/interfaces/answers.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  allQuestions: QuestionsInterface;
  answers$: Observable<QuestionsInterface[]>;
  questions$: Observable<QuestionsInterface[]>;
  allAnswers$ = new BehaviorSubject<AnswersInterface>(
    this.getAllAnswers()
  );

  initQuestionsAnswers$(allQuestions: any): void {
    this.questions$ = combineLatest([
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

  getAllQuestions(): any {
    this.allQuestions = JSON.parse(localStorage.getItem('all_questions') || '{}');
    this.initQuestionsAnswers$(this.allQuestions);
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

  getAllAnswersById(id: number): AnswersInterface {
    const answers = this.getAllAnswers();
    return answers[id];
  }
}
