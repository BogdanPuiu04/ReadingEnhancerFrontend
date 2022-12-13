import {userCredentialsModel} from "./userCredentialsModel";

export interface userRequestData {
  isSuccessful: string,
  statusCode: string,
  errors: string,
  data: userCredentialsModel
}
