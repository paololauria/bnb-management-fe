export class User {
  constructor(
    public id: number,
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public firstname: string,
    public lastname: string,
    public role: string
  ) {}

  static fromJSON(json: string) {
    const obj = JSON.parse(json);
    return new User(
      obj.id,
      obj.email,
      obj._token,
      obj._tokenExpirationDate,
      obj.firstname,
      obj.lastname,
      obj.role
    );
  }

  get tokenExpirationDate() {
    return this._tokenExpirationDate;
  }

  get token(): string | null {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  set token(newToken: string) {
    this._token = newToken;
  }
}
