export default {

  parseOutLeaseId(searchTerm) {
    const regex = /leaseId=([\d]+)/;
    const match = regex.exec(searchTerm);
    return match[1];
  }

}
