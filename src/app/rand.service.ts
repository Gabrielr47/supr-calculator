import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RandService {
  apiUrl =
    'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new';

  constructor(private http: HttpClient) {}

  getRandomNumber() {
    return this.http.get<number>(this.apiUrl);
  }
}
