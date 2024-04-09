export interface AuthResponseData {
  access_token: string;
  refresh_token: string;
  user: {
    email: string;
    firstname: string;
    lastname: string;
  };
  expirationDate: Date;
}
