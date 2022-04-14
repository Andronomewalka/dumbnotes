import { GitHubIcon, LinkedInIcon, TelegramIcon } from './icons';
import { MdxAboutLinkItemType } from './types';

export const socialsData: MdxAboutLinkItemType[] = [
  {
    id: 0,
    name: 'LinkedIn',
    icon: LinkedInIcon(),
    link: 'https://www.linkedin.com/in/andrew-zakharov-882116170/',
  },
  {
    id: 1,
    name: 'Telegram',
    icon: TelegramIcon(),
    link: 'https://t.me/Andronomewalka',
  },
];

export const sourcesData: MdxAboutLinkItemType[] = [
  {
    id: 2,
    name: 'main',
    icon: GitHubIcon(),
    link: 'https://github.com/Andronomewalka/dumbnotes',
  },
  {
    id: 3,
    name: 'admin',
    icon: GitHubIcon(),
    link: 'https://github.com/Andronomewalka/dumbnotes-admin',
  },
  {
    id: 4,
    name: 'api',
    icon: GitHubIcon(),
    link: 'https://github.com/Andronomewalka/dumbnotes-api',
  },
];
