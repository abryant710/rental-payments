//Regular expressions to capture parts of the url search terms
export const leaseIdRegex = /leaseId=([\w|-]+)/;
export const apiTypeRegex = /api=(.*)/;

export default {

  // Parse the query/api type out of the search term
  // Using regexs defined above
  parseOutFirstTerm(term, regex) {
    const match = regex.exec(term, regex);
    return match[1];
  },

  // Push to the lease page using leaseId
  pushToLeasePage(history, leaseId) {
    history.push({
      pathname: '/leases.html',
      search: "?" + new URLSearchParams({
        leaseId: leaseId,
        api: this.parseOutFirstTerm(history.location.search, apiTypeRegex)
      }),
    });
  }

}
