import axios from 'axios';

// Local node server URL
const LOCAL_NODE_BASE_URL = 'http://localhost:5000';

export default {

  getRentalData(leaseId) {
    const url = `${LOCAL_NODE_BASE_URL}/leases/${leaseId}`;
    // console.log("url: ", url);
    return axios.get(url);
  }

}
