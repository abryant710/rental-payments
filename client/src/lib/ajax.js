import axios from 'axios';

// Local node server URL
const LOCAL_NODE_BASE_URL = 'http://localhost:5000';

export default {

  // Return for 1 result
  getSingleRentData(leaseId, apiType) {
    const url = apiType === 'standard' ? `${LOCAL_NODE_BASE_URL}/leases/${leaseId}` :
    `${LOCAL_NODE_BASE_URL}/custom/leases/${leaseId}`;
    return axios.get(url);
  },

  // Return all results
  getAllRentLeases(apiType) {
    const url = apiType === 'standard' ? `${LOCAL_NODE_BASE_URL}/leases` :
    `${LOCAL_NODE_BASE_URL}/custom/leases`;
    return axios.get(url);
  }

}
