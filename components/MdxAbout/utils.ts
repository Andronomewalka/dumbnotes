import { ColorScheme } from 'styled';
import { CvIcon, GitHubIcon, LinkedInIcon, TelegramIcon } from './icons';

export const getSocialsData = (colorScheme: ColorScheme) => {
  return [
    {
      id: 0,
      name: 'cv',
      icon: CvIcon(colorScheme),
      link: '/Zakharov-frontend-react.pdf',
      download: true,
    },
    {
      id: 1,
      name: 'LinkedIn',
      icon: LinkedInIcon(colorScheme),
      link: 'https://www.linkedin.com/in/andrew-zakharov-882116170/',
    },
    {
      id: 2,
      name: 'Telegram',
      icon: TelegramIcon(colorScheme),
      link: 'https://t.me/Andronomewalka',
    },
  ];
};

export const getSourcesData = (colorScheme: ColorScheme) => {
  return [
    {
      id: 3,
      name: 'main',
      icon: GitHubIcon(colorScheme),
      link: 'https://github.com/Andronomewalka/dumbnotes',
    },
    {
      id: 4,
      name: 'admin',
      icon: GitHubIcon(colorScheme),
      link: 'https://github.com/Andronomewalka/dumbnotes-admin',
    },
    {
      id: 5,
      name: 'api',
      icon: GitHubIcon(colorScheme),
      link: 'https://github.com/Andronomewalka/dumbnotes-api',
    },
  ];
};
