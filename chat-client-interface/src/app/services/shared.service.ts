import { User } from '../models/user';
import { USERS } from '../data/mock-users';

export class SharedService {
  self : User = USERS[0];
}
