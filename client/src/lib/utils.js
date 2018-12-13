export default {

  // Method to calculate the first partial week
  getMiddleWeek(startDate, paymentDay, frequency, rent) {
    let dayBeforePaymentDay;
    const paymentDayNum = this.dayOfWeekLookup(paymentDay);
    if(paymentDayNum === 0) {
      dayBeforePaymentDay = 6;
    } else {
      dayBeforePaymentDay = paymentDayNum - 1;
    }
    const dateBeforePaymentDay = this.getNextDayOfWeek(startDate, dayBeforePaymentDay);
    console.log(dateBeforePaymentDay);
    const numberOfDays = this.daysBetween(startDate, dateBeforePaymentDay, true);

    // Return an object containing data about the first week
    return {
      from: this.getFormattedDate(startDate),
      to: this.getFormattedDate(dateBeforePaymentDay),
      days: numberOfDays,
      amount: this.getCost(numberOfDays, frequency, rent)
    };
  },

  // Method to calculate the first partial week
  getFirstWeek(startDate, paymentDay, frequency, rent) {
    let dayBeforePaymentDay;
    const paymentDayNum = this.dayOfWeekLookup(paymentDay);
    if(paymentDayNum === 0) {
      dayBeforePaymentDay = 6;
    } else {
      dayBeforePaymentDay = paymentDayNum - 1;
    }
    const dateBeforePaymentDay = this.getNextDayOfWeek(startDate, dayBeforePaymentDay);
    console.log(dateBeforePaymentDay);
    const numberOfDays = this.daysBetween(startDate, dateBeforePaymentDay, true);

    // Return an object containing data about the first week
    return {
      from: this.getFormattedDate(startDate),
      to: this.getFormattedDate(dateBeforePaymentDay),
      days: numberOfDays,
      amount: this.getCost(numberOfDays, frequency, rent)
    };
  },

  // Return the cost given a certain number of days between 2 dates
  getCost(numberOfDays, frequency, rent) {
    const freqAmount = this.frequencyLookup(frequency);
    const rentAmount =  (numberOfDays / freqAmount) * rent;
    //console.log(numberOfDays, freqAmount, rent, rentAmount);
    return parseFloat(Math.round(rentAmount * 100) / 100).toFixed(2);
  },

  // Find the next date given a day of the week
  // e.g. from Sat May 12 2018 find the next Tuesday, i.e. Tue May 15 2018
  getNextDayOfWeek(date, dayOfWeek) {
    let resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
  },

  // Calculate days between 2 dates
  daysBetween(startDate, endDate, includeLastDay) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    // Add one to include the end date in the result (if necessary)
    let result = (endDate - startDate) / millisecondsPerDay;
    result = includeLastDay ? result + 1 : result;
    return result;
  },

  // Format date as per specification (e.g. August, 3rd 2018)
  getFormattedDate(date) {
    return `${this.monthLookup(date.getMonth())}, ${this.datePlusSuffix(date.getDate())} ${date.getYear() + 1900}`;
  },

  // Get Suffixed date (based on variance in English language for numbers)
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

  // Lookup the scaler for payment amounts based on frequency
  frequencyLookup(freq) {
    switch(freq) {
      case "weekly":
       return 7;
      case "fortnightly":
        return 14;
      case "monthly":
        return 365/12;
      default:
        return NaN;
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
