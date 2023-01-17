export class AppResponse{
  isSuccessful: boolean;
  statusCode: number;
  errors: string[];
  data: any;

  constructor( response: AppResponse) {
    this.isSuccessful = response.isSuccessful;
    this.statusCode = response.statusCode;
    this.errors = response.errors;
    this.data = response.data;
  }
}
