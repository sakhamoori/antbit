/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable consistent-return */
import Axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { API_Password, API_UserName, BASE_URL } from '@/utils/constant';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = req.body;

    console.log('Data:', JSON.stringify(data));

    const token = Buffer.from(
      `${API_UserName}:${API_Password}`,
      'utf8'
    ).toString('base64');
    const headers = {
      Authorization: `Basic ${token}`,
      accept: 'application/json',
    };

    console.log(`Header - ${JSON.stringify(headers)}`);
    console.log(`${BASE_URL}/claim-worker-rewards`);
    console.log(`${JSON.stringify(data)}`);

    await Axios.post(
      `${BASE_URL}/claim-worker-rewards`,
      { ...data },
      {
        headers,
      }
    );
    return res.status(200).end();
  } catch (error) {
    console.log(`Error - ${JSON.stringify(error)}`);
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(200).end();
  }
};

export default handler;
