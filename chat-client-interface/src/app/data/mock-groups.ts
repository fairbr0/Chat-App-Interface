import { Group } from '../models/group';

export const GROUPS: Group[] = [
  {
    users: [
      {name: 'Jake', id: 'abcd'},
      {name: 'Chris', id: 'qwer'}
    ],
    groupId: '1234',
    messages: [
      {
        from: 'abcd',
        content: 'Hi'
      },
      {
        from: 'qwer',
        content: 'Hello'
      }
    ],
    color : 'red',
    name : ''
  },
  {
    users: [
      {name: 'Jake', id: 'abcd'},
      {name: 'Phil', id: 'zxcv'}
    ],
    groupId: '5678',
    messages: [
      {
        from: 'abcd',
        content: 'hey'
      },
      {
        from: 'zxcv',
        content: 'sup'
      }
    ],
    color : 'blue',
    name : ''
  }
];
