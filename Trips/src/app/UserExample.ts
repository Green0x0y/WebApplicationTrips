export class User {
    public constructor(
      public key: string,
      public email: string,
      public type: number,
      public history: Array<{id: number, name: string, rated: boolean, rating: number}>,
      public banned: boolean
    ) {
    }
  }