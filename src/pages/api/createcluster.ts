/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable consistent-return */
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { API_Password, API_UserName, BASE_URL } from '@/utils/constant';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = req.body;

    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const token = Buffer.from(
      `${API_UserName}:${API_Password}`,
      'utf8'
    ).toString('base64');
    const headers = {
      Authorization: `Basic ${token}`,
      accept: 'application/json',
    };

    const input = {
      owner_email: session?.user.email,
      ...data,
    };

    await Axios.post(`${BASE_URL}/create-new-cluster`, input, {
      headers,
    });

    return res.status(200).end();
  } catch (error) {
    return res.status(200).end();
  }
};

export default handler;
