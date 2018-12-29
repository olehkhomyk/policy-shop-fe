import { Candidate, ECandidate } from './models';

export const UNAUTHORIZED_STATUS = 401;

export const API_URL = 'http://95.216.173.182/api';

// export const API_URL = '/api';

export const MOBILE_WIDTH = 680;


export const SEARCH_DROPDOWN_DELAY = 300;

export const PRICE = 250;

export const COUNT_TO_REQUIERD_PAY = 5;

export enum BusinessColor {
  Primary = 'primary',
  Accent = 'accent',
  Warn = 'warn',
  Default = ''
}

export const BUSINESS_COLOR = BusinessColor.Primary;

export function generateCandidates() {
  return [
    new Candidate(ECandidate.Poroshenko, 'order-petro.png'),
    new Candidate(ECandidate.Lyashko, 'order-radykal.png'),
    new Candidate(ECandidate.Sadovyi, 'order-nastup.png'),
    new Candidate(ECandidate.Tymoshenko, 'order-julya.png'),
    new Candidate(ECandidate.Zelenskyi, 'order-sluga.png')
  ];
}
