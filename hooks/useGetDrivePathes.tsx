import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavNodeType } from 'components/Nav';
import { DriveItemPathIdType } from 'blog-app-shared';

export const useGetDrivePathes = (navItemsBase: NavNodeType[]): DriveItemPathIdType[] => {
  const [drivePathes, setDrivePathes] = useState<DriveItemPathIdType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/getDrivePathes');
      setDrivePathes(response.data);
    })();
  }, [navItemsBase]);

  return drivePathes;
};
