// Function to create an employee record
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create employee records from an array of arrays
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  // Function to create a time-in event for an employee
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date: date });
    return this;
  }
  
  // Function to create a time-out event for an employee
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date: date });
    return this;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date).hour;
    const timeOut = this.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
  }
  
  // Function to calculate total wages earned for all dates worked by an employee
  function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(event => event.date);
    const payable = eligibleDates.reduce((totalWages, date) => totalWages + wagesEarnedOnDate.call(this, date), 0);
    return payable;
  }
  
  // Function to find an employee by first name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  // Function to calculate total payroll for all employees
  function calculatePayroll(employeesArray) {
    return employeesArray.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
  }
  
  // Exporting the functions
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
  };
  