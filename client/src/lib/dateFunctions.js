export default {

  // Add to the date depending on the frequency so that it
  // can be checked if period has gone past last date
  incrementCurrentDate(currentDate, frequency) {
    let result = new Date(currentDate);
    if(frequency === "monthly") {
      // The spec actually defines monthly as every 4 weeks, therefore this
      // will always be 28 day intervals
      result.setDate(result.getDate() + this.frequencyLookup("monthly"));
    } else if(frequency === "fortnightly") {
      result.setDate(result.getDate() + this.frequencyLookup("fortnightly"));
    } else if(frequency === "weekly") {
      result.setDate(result.getDate() + this.frequencyLookup("weekly"));
    } else {
      // Otherwise expect a raw number, which doesn't require a lookup
      result.setDate(result.getDate() + frequency);
    }
    return result;
  },

  // Method to calculate any period of day returning object to display as row
  getPaymentPeriod(startDate, endDate, numberOfDays, cost) {
    return {
      from: this.getFormattedDate(startDate),
      to: this.getFormattedDate(endDate),
      days: numberOfDays,
      amount: cost
    };
  },

  // Return the cost given a certain number of days between 2 dates
  getCost(numberOfDays, frequency, rent) {
    const freqAmount = this.frequencyLookup(frequency);
    const rentAmount =  (numberOfDays / freqAmount) * rent;
    // Return ammount to 3 decimal places in all cases
    return parseFloat(Math.round(rentAmount * 100) / 100).toFixed(2);
  },

  // Find the next date given a day of the week
  // e.g. from Sat May 12 2018 find the next Tuesday, i.e. Tue May 15 2018
  getPayDate(startDate, dayOfWeek) {
    let resultDate = new Date(startDate.getTime());
    resultDate.setDate(startDate.getDate() + (7 + dayOfWeek - startDate.getDay()) % 7);
    return resultDate;
  },

  //Get the date before the inputted date
  getDateBeforeThis(date) {
    let thisDateAsTime = new Date(date.getTime());
    // Subtract 1 from this date to get the day before
    return new Date(thisDateAsTime.setDate(date.getDate() - 1));
  },

  // Calculate days between 2 dates
  daysBetween(startDate, endDate, includeLastDay) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    // Add one to include the end date in the result (if necessary)
    let result = (endDate - startDate) / millisecondsPerDay;
    result = includeLastDay ? result + 1 : result;
    // Need to return as a whole number in case of rounding inaccuracy
    return Math.round(result);
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
      // The spec actually defines monthly as every 4 weeks, therefore this
      // will always be 28 day intervals
        return 28;
      default:
        return NaN;
    }
  },

  // Lookup the day of the week from the number
  dayOfWeekLookup(dayString) {
    switch(dayString) {
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
  }

}
