import { NavNodeBaseType } from './types';

export const navMock: NavNodeBaseType[] = [
  {
    id: '0',
    name: '0',
  },
  {
    id: '1',
    name: '1',
    subItems: [
      {
        id: '11',
        name: '11',
        subItems: [
          {
            id: '111',
            name: '111',
            path: 'link 111',
          },
          {
            id: '112',
            name: 'one one twotw',
            subItems: [
              {
                id: '1121',
                name: '1121',
                path: 'link 1121',
              },
            ],
          },
        ],
      },
      {
        id: '12',
        name: '12',
        path: 'link 12',
      },
    ],
  },
  {
    id: '2',
    name: '2',
    path: 'link 2',
  },
];
