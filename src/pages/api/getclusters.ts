/* eslint-disable consistent-return */
import Axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { API_Password, API_UserName, BASE_URL } from '@/utils/constant';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = Buffer.from(
      `${API_UserName}:${API_Password}`,
      'utf8'
    ).toString('base64');
    const headers = {
      Authorization: `Basic ${token}`,
      accept: 'application/json',
    };

    const response = await Axios.post(
      `${BASE_URL}/get-cluster-offers`,
      undefined,
      {
        headers,
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end();
  }
};

export default handler;
