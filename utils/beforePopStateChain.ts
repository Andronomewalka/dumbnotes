import { Router } from 'next/router';

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
}

interface NextHistoryState {
  url: string;
  as: string;
  options: TransitionOptions;
}

type BeforePopStateCallback = (state: NextHistoryState) => boolean;

const callbacks: Array<BeforePopStateCallback> = [];

function callbacksAgregator(state: NextHistoryState) {
  return callbacks.every((callback) => callback(state));
}

Router.prototype.beforePopState(callbacksAgregator);

export const onBeforePopState = (callback: BeforePopStateCallback) => {
  callbacks.push(callback);
};

export const offBeforePopState = (callback: BeforePopStateCallback) => {
  callbacks.splice(
    callbacks.findIndex((cur) => cur === callback),
    1
  );
};
