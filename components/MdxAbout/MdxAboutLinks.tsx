import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/Mdx';
import { MdxAboutLinkDivider, MdxAboutLinksWrapper } from './styles';
import { MdxAboutLinkItem } from './MdxAboutLinkItem';
import { MdxAboutLinkItemType } from './types';
import { EmailIcon, GitHubIcon, LinkedInIcon, TelegramIcon } from './icons';

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const socialsData: MdxAboutLinkItemType[] = [
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

const sourcesData: MdxAboutLinkItemType[] = [
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

export const MdxAboutLinks: FC<MdxStyleType> = ({ style }) => {
  return (
    <MdxAboutLinksWrapper as={motion.div} variants={fadeInUp} style={style}>
      {socialsData.map((cur) => (
        <MdxAboutLinkItem key={cur.id} {...cur} />
      ))}
      <MdxAboutLinkDivider />
      {sourcesData.map((cur) => (
        <MdxAboutLinkItem key={cur.id} {...cur} />
      ))}
    </MdxAboutLinksWrapper>
  );
};
