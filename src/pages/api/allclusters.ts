import { API_UserName, API_Password, BASE_URL } from "@/utils/constant";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async(req: NextApiRequest, res: NextApiResponse): Promise<Void> => {
  try {
     // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session
    const {
      data: { session }
    } = await supabase.auth.getSession();

    const token = Buffer.from(`${API_UserName}:${API_Password}`, 'utf8').toString('base64')
    const data = {
      'owner_email': session?.user.email
    }
    
    const headers = {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
      'accept': 'application/json' 
    }

    const response = await Axios.post(`${BASE_URL}/get-all-clusters`, 
      data,
      { headers });

    return res.status(response.status).json(response.data)

  } catch(error) {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end()
  }
}

export default handler;