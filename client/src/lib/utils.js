export default {

  // Parse the query out of the search term
  parseOutLeaseId(searchTerm) {
    const regex = /leaseId=([\w|-]+)/;
    const match = regex.exec(searchTerm);
    return match[1];
  },

  pushToLeasePage(history, leaseId) {
    history.push({
      pathname: '/leases.html',
      search: "?" + new URLSearchParams({leaseId})
    });
  }

}
