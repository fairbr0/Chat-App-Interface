import { User } from './user';
import { Message } from './message';

export class Group {
  users : User[];
  messages : Message[];
  groupId : String;
  color: String;
  name: String;
}
