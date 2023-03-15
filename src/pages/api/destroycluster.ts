import { API_UserName, API_Password, BASE_URL } from "@/utils/constant";
import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  try {

    const {
      query: { cluster_id },
      } = req;

    console.log('cluster_id', cluster_id)

    const token = Buffer.from(`${API_UserName}:${API_Password}`, 'utf8').toString('base64')
    const data = {
      cluster_id: "d9e3c924-0e00-476c-b508-2c9989ee665f",
      field_name: "status",
      new_value: "offline"
    }
    
    const headers = {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
      'accept': 'application/json' 
    }

    const response = await Axios.post(`${BASE_URL}/update-field-value-of-cluster`, 
      data,
      { headers });

    return res.status(response.status).json(response.data)

  } catch(error) {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end()
  }
}

export default handler;