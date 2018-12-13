export default {

  // Format date as per specification
  getFormattedDate(date) {
    return `${this.monthLookup(date.getMonth())}, ${this.datePlusSuffix(date.getDate())} ${date.getYear() + 1900}`;
  },

  // Get Suffixed date
  datePlusSuffix(dateNum) {
    const stSuf = [1, 21, 31];
    const ndSuf = [2, 22];
    const rdSuf = [3, 23];
    if(stSuf.includes(dateNum)) {
      return `${dateNum}st`;
    } else if (ndSuf.includes(dateNum)) {
      return `${dateNum}nd`;
    } else if (rdSuf.includes(dateNum)) {
      return `${dateNum}rd`;
    } else {
      return `${dateNum}th`;
    }
  },

  // Lookup the month string from number
  monthLookup(monthNum) {
    switch(monthNum) {
      case 0:
       return "January";
      case 1:
       return "February";
      case 2:
       return "March";
      case 3:
       return "April";
      case 4:
       return "May";
      case 5:
       return "June";
      case 6:
       return "July";
      case 7:
       return "August";
      case 8:
       return "September";
      case 9:
       return "October";
      case 10:
       return "November";
      case 11:
       return "December";
      default:
        return "Out of Scope";
    }
  },

  // Lookup the day of the week from the number
  dayOfWeekLookup(dayNum) {
    switch(dayNum) {
      case "sunday":
       return 0;
      case "monday":
        return 1;
      case "tuesday":
        return 2;
      case "wednesday":
        return 3;
      case "thursday":
        return 4;
      case "friday":
        return 5;
      case "saturday":
        return 6;
      default:
        return NaN;
    }
  },

  // Parse the query out of the search term
  parseOutLeaseId(searchTerm) {
    const regex = /leaseId=([\d]+)/;
    const match = regex.exec(searchTerm);
    return match[1];
  }

}
