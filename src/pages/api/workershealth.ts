import Axios from 'axios'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { API_Password, API_UserName, BASE_URL } from '../../utils/constant'

const workershealth: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case 'GET':
        return getWorkersHealth(req, res)
      case 'POST': 
        return postWorkerHealth(req, res)
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    throw error;
  }
}

const getWorkersHealth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = Buffer.from(`${API_UserName}:${API_Password}`, 'utf8').toString('base64')
    const data = {
        worker_ip: '176.29.248.231'
      }

    const headers = {
      Authorization: `Basic ${token}`
    }

    const response = await Axios.post(`${BASE_URL}/get-workers-health`, 
      data,
      { headers });

    return res.json(response.data)
    
  } catch (error) {
    console.log(`Error - ${JSON.stringify(error)}`)
    throw error;
    //return Promise.reject();
  }
}

const postWorkerHealth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = Buffer.from(`${API_UserName}:${API_Password}`, 'utf8').toString('base64')
    const data = {
        worker_ip: '176.29.248.231',
        last_day: true,
        status: "active"
      }

    const headers = {
      Authorization: `Basic ${token}`
    }

    const response = await Axios.post(`${BASE_URL}/post-workers-health`, 
      data,
      { headers });

    return res.json(response.data)
  } catch(error) {
    throw error;
  }
}

export default workershealth