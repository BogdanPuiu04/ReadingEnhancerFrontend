import {UserService} from "../services/user.service";
import {HandlerService} from "../services/handler.service";
import {AuthService} from "../services/login-handlers/auth.service";
import {userCredentialsModel} from "../models/userCredentialsModel";

export function appInitializer(userService: UserService, handlerService: HandlerService, authService: AuthService): () => Promise<unknown> {
  return () => new Promise((resolve) => {
    if (authService.isAuthenticated()) {
      const user: userCredentialsModel = handlerService.getUserFromStorage();
      localStorage.setItem('userInfo', JSON.stringify(user));
    } else {
      userService.logout();
      resolve(null);
    }
  })
}
