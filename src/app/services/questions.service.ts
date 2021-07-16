import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { QuestionsInterface } from '../shared/interfaces/questions.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  allQuestions: QuestionsInterface;
  constructor() {
  }

  /** Getting Questions */
/*  fetchQuestions(): Observable<any> {
    const allQuestions = this.allQuestions = JSON.parse(localStorage.getItem('all_questions') || '{}');
    console.log('QuestionsService ===', allQuestions);
    return allQuestions;
  }*/


  fetchQuestions(): Observable<any> {
    this.allQuestions = JSON.parse(localStorage.getItem('all_questions') || '{}');
    console.log('QuestionsService ===', this.allQuestions);
    return of(this.allQuestions);
  }


}
