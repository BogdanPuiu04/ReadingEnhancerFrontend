import {UserService} from "../services/user.service";
import {HandlerService} from "../services/handler.service";
import {AuthService} from "../services/login-handlers/auth.service";
import {userCredentialsModel} from "../models/userCredentialsModel";
import {userRequestData} from "../models/userRequestData.model";

export function appInitializer(userService: UserService, handlerService: HandlerService, authService: AuthService): () => Promise<unknown> {
  return () => new Promise((resolve) => {
    if (authService.isAuthenticated()) {
      userService.refreshToken().subscribe({
        next: ( res: userRequestData) => {
          if(res.isSuccessful){
            const user: userCredentialsModel = handlerService.getUserFromStorage();
            user.token=res.data.token;
            localStorage.setItem('userInfo',JSON.stringify(user));
            userService.stopRefreshToken();
            userService.startRefreshToken();
          }
          else {
            userService.logout();
            userService.stopRefreshToken();
          }
      },
      error: () =>{
          userService.logout();
          userService.stopRefreshToken();
      }
      }).add(resolve(null));
    }
    else {
      userService.logout();
      userService.stopRefreshToken();
      resolve(null);
    }
  })
}
