import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RandService } from './rand.service';

describe('RandService', () => {
  let service: RandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RandService],
    });
    service = TestBed.inject(RandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRandomNumber', () => {
    it('should return a random number', () => {
      const expectedNumber = 42;

      service.getRandomNumber().subscribe((number) => {
        expect(number).toBe(expectedNumber);
      });

      const req = httpMock.expectOne(service.apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(expectedNumber);
    });
  });
});
