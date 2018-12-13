import axios from 'axios';

// Local node server URL
const LOCAL_NODE_BASE_URL = 'http://localhost:5000';

export default {

  // Return for 1 result
  getSingleRentData(leaseId) {
    const url = `${LOCAL_NODE_BASE_URL}/leases/${leaseId}`;
    // console.log("url: ", url);
    return axios.get(url);
  },

  // Return all results
  getAllRentLeases() {
    const url = `${LOCAL_NODE_BASE_URL}/leases`;
    // console.log("url: ", url);
    return axios.get(url);
  }

}
