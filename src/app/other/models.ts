export class Rating {
  candidates: Candidates;
  sum: number;
  isAdmin?: string;

  constructor({poroshenko, zelenskyi, tymoshenko, sadovyi, lyashko, sum, isAdmin}) {
    this.candidates = {poroshenko, zelenskyi, tymoshenko, sadovyi, lyashko};
    this.sum = sum;
    this.isAdmin = isAdmin;
  }
}

export enum ECandidate {
  Poroshenko = 'Порошенко',
  Zelenskyi = 'Зеленський',
  Tymoshenko = 'Тимошенко',
  Sadovyi = 'Садовий',
  Lyashko = 'Ляшко'
}

export class Candidates {
  poroshenko = 0;
  zelenskyi = 0;
  tymoshenko = 0;
  sadovyi = 0;
  lyashko = 0;

  constructor(candidates = {}) {
    Object.assign(this, candidates);
  }
}

export class Candidate {
  id: ECandidate;
  image: string;
  count: number;

  constructor(id: ECandidate, image = '', count = 0) {
    this.id = id;
    this.image = image;
    this.count = count;
  }
}
