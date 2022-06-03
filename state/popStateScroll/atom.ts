import { atom } from 'recoil';
import { popStateScrollEffect } from './effects';
import { PopStateScrollType } from './types';

export const popStateScrollInitialValue = {
  popStateOccured: false,
  contentScrollTop: 0,
  isReady: false,
};

export const popStateScrollState = atom<PopStateScrollType>({
  key: 'popStateScrollState',
  default: popStateScrollInitialValue,
  effects: [popStateScrollEffect],
});
