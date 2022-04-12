import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ORIGIN_API,
  headers: {
    'Content-Type': 'application/json',
  },
});
