export class AppResponse{
  succeed: boolean;
  statusCode: number;
  errors: string[];
  data: any;

  constructor( response: AppResponse) {
    this.succeed = response.succeed;
    this.statusCode = response.statusCode;
    this.errors = response.errors;
    this.data = response.data;
  }
}
