'use strict';

import path from 'path';
import { google } from 'googleapis';
import { DriveItemType, NameObjectType, Response } from './types';
import { NavNodeBaseType } from 'components/Nav';
import { driveItems } from './state';
import { getDriveIdByPath } from './utility';

const googleDriveScope = 'https://www.googleapis.com/auth/drive';
const drive = google.drive('v3');
let authClient: any = null;

export const auth = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.basename('.') + '/' + 'service-account.json',
    scopes: [googleDriveScope],
  });

  authClient = await auth.getClient();
};

const checkAuth = async () => {
  if (!authClient) {
    await auth();
  }
  return !!authClient;
};

export async function fetchAllDriveItems(): Promise<Response<boolean>> {
  if (!(await checkAuth())) {
    return {
      data: false,
      error: 'Auth failed',
    };
  }

  const res = await drive.files.list({
    auth: authClient,
  });

  res.data.files?.forEach((file) => {
    try {
      if (file.driveId) {
        driveItems.push({
          id: file.driveId,
          path: JSON.parse(file.name + '').path,
        });
      }
    } catch (e: any) {
      console.log('fetchAllDriveItems error', e);
    }
  });

  Object.freeze(driveItems);

  return {
    data: true,
    error: '',
  };
}

export async function getNavigation(): Promise<Response<NavNodeBaseType[]>> {
  if (!(await checkAuth())) {
    return {
      data: [],
      error: 'Auth failed',
    };
  }

  const navDriveId = getDriveIdByPath('--nav--');
  if (navDriveId) {
    const res = await getDriveItem(navDriveId);
    if (res.data.content) {
      try {
        console.log('navigation content', res.data.content);
        return JSON.parse(res.data.content);
      } catch (e: any) {
        return {
          data: [],
          error: "Can't parse navigation items",
        };
      }
    }
  }

  return {
    data: [],
    error: 'No navDriveId found',
  };
}

export async function getDriveItem(id: string): Promise<Response<DriveItemType>> {
  if (!(await checkAuth())) {
    return {
      data: {
        id: 'empty',
        name: 'error',
        path: 'error',
        content: '',
      },
      error: 'Auth failed',
    };
  }

  const res = await drive.files.get({
    fileId: id,
    auth: authClient,
  });

  const resContent = await drive.files.get({
    fileId: id,
    auth: authClient,
    alt: 'media',
  });

  const nameObject = JSON.parse(res.data.name + '') as NameObjectType;

  return {
    data: {
      id: res.data.id ?? '',
      name: nameObject.name ?? '',
      path: nameObject.path ?? '',
      content: resContent.data as string,
    },
    error: '',
  };
}
