/* eslint-disable consistent-return */
import Axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { API_Password, API_UserName, BASE_URL } from '@/utils/constant';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { clusterId },
    } = req;

    const token = Buffer.from(
      `${API_UserName}:${API_Password}`,
      'utf8'
    ).toString('base64');
    const data = {
      cluster_id: clusterId,
      field_name: 'status',
      new_value: 'offline',
    };

    const headers = {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
      accept: 'application/json',
    };

    const response = await Axios.post(
      `${BASE_URL}/update-field-value-of-cluster`,
      data,
      { headers }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end();
  }
};

export default handler;
