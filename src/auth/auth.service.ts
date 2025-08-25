import { LoginInterface, LoginResponseInterface } from '../utils/interfaces';

export abstract class AuthService {
  abstract login(loginPayload: LoginInterface): Promise<LoginResponseInterface>;
}
