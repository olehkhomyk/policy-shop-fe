import { Candidate, ECandidate } from './models';

export const UNAUTHORIZED_STATUS = 401;

export const API_URL = 'http://localhost:3000';

export const SEARCH_DROPDOWN_DELAY = 300;

export const PRICE = 250;

export const PRICE_VS_DISCOUNT = 200;

export const COUNT_TO_DISCOUNT = 10;

export const candidatesList = [
  new Candidate(ECandidate.Poroshenko),
  new Candidate(ECandidate.Lyashko),
  new Candidate(ECandidate.Sadovyi),
  new Candidate(ECandidate.Tymoshenko),
  new Candidate(ECandidate.Zelenskyi)
];
