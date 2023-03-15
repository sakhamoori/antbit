import Axios from "axios"
import { Button } from "flowbite-react"
import { useState, useEffect } from "react"


type Cluster = {
  id: string
  cluster_id: string
  status: string
  age_in_hours: number,
  max_age_in_hours: number
  credits_paid: number
}

const Clusters = () => {
  const [clusterObj, setClusterObj] = useState<Array<Cluster> | undefined>(undefined)

  useEffect(() => {
    fetchAllClusters()
  },[])

  const fetchAllClusters = () => {
    Axios.get(`/api/allclusters`).then((response: { data: { result: string } }) => {
      setClusterObj(JSON.parse(response.data.result))
    })    
  }

  const destroyCluster = (id: string) => {
    Axios.get(`/api/destroycluster/?cluster_id=${id}`).then(async () => {
      await fetchAllClusters()
    })    
  }

  return (
    <div>
      <h2><b>Limitless computing power on-demand</b></h2>
      <div className="flex flex-wrap gap-2">
        <div>
          <Button color="dark" pill={true}>DEPLOY A CLUSTER</Button>
        </div>
        <div>
          <Button color="gray" pill={true}>SEE DOCUMENTATION</Button>
        </div>
      </div>
      <div>
        <h1>My Clusters</h1>  
        <div>
          {
            clusterObj && clusterObj.map((cluster) => (
              <div className="card bg-neutral h-48 px-3 hover:bg-primary">
                <div>Idle Hours: {cluster.age_in_hours}</div>
                <div>Compute Hours: {cluster.max_age_in_hours}</div>
                <div>Total Hours: {cluster.max_age_in_hours}</div>
                <div>Credit Paid: {cluster.credits_paid}</div>
                <div>Status: {cluster.status}</div>
                <div className={cluster.status !== 'online' ? 'w-3/12': '' }>
                  <Button onClick={() => destroyCluster(cluster.cluster_id)} disabled={cluster.status === 'online' ? false : true } color="dark">Destroy</Button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Clusters