export class Post {
  userId: string = 'test';
  title: string = 'test';
  comment: string = 'test';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}