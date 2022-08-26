const fs = require('fs');
const fN = './data2.json';
const data = fs.readFileSync(fN);
const myObject = JSON.parse(data);


//Update JSON file 
function writeJson(newData){
  // myObject.push(newData);
  var newData2 = JSON.stringify(newData);
  fs.writeFile("data2.json", newData2, (err) => {
    if (err) throw err;
    console.log("New data added");
    });
}


//checking if employee exists
const employeeExist = employeeName => {
  for(i=0;i<myObject.length;i++){
    if(myObject[i]['EmployeeName'] == employeeName){
      return true;
    }
    else {
      return false;
    }
  }
} 
  
//option to add new employee
const newEmployee = (employeeName) => {
  console.log("=====>NEW EMPLOYEE<========");
  if(employeeExist(employeeName) == 'true'){
    return "Employee Already exists";
  }
  else {
    let newData = {
      "EmployeeName": employeeName,
      "Schedule": []
    }
    myObject.push(newData);
    writeJson(myObject);
    listAllEmployees();
  }
};

//option to list all employees
const listAllEmployees = () => {
  console.log("=====>LIST ALL EMPLOYEES<========");
  let Obj=JSON.stringify(myObject);
  console.log(Obj);
};

//list My schedule
const listMySchedule = (employeeName) => {
  for(i=0;i<myObject.length;i++){
    if(myObject[i]['EmployeeName'] === employeeName){
      console.log(myObject[0]['Schedule']);
    }
  }
}

//option to checkIN
const checkIn = (employeeName) => {
  console.log("Checkin in " +employeeName)
  console.log("=====>CHECKIN<========");
  for(i=0;i<myObject.length;i++){
    if(myObject[i]['EmployeeName'] === employeeName){
      console.log(myObject[i]['EmployeeName']);
      console.log(myObject[i].Schedule)
      SchNr = myObject[i].Schedule.length
      console.log(SchNr);
      if(SchNr>0){
        if( myObject[i].Schedule[SchNr-1].status === 'IN'){
          return('Already checked IN');
        }
      }
      else {
        let Schedule= {
          checkIn: "2022-08-24T12:32:33.945Z",
          checkOut: "",
          status: "IN"
        }
        myObject[i]['Schedule'].push(Schedule);

        writeJson(myObject);
        return listAllEmployees();
        }
    }
  }
  console.log("Employee doesn't Exist");
};   


//option to checkout
const checkOut = (employeeName) => {
  console.log("=====>CHECKOUT<========");
  for(i=0;i<myObject.length;i++){
    if(myObject[i]['EmployeeName'] == employeeName)
    {
      let SchNr = myObject[i].Schedule.length - 1
      console.log(myObject[i]['EmployeeName'])
      console.log(myObject[i].Schedule[SchNr].status)
      if( myObject[i].Schedule[SchNr].status == 'OUT'){
        return('Employee never checked IN');
      }
      else {
        myObject[i].Schedule[SchNr].checkOut ="2022-08-24T16:32:33.945Z" ;
        myObject[i].Schedule[SchNr].status = "OUT";
        writeJson(myObject);
        console.log(listAllEmployees());
      }
    }
  }
}

//options
const option = 'MyHistory';
const employeeName = 'Asif';
  switch (option) {
    case 'newEmployee':
      console.log(newEmployee(employeeName));
      break;
    case 'checkIn':
      console.log(checkIn(employeeName));
      break;
    case 'checkOut':
      console.log(checkOut(employeeName));
      break;
    case 'listEmployee':
      listAllEmployees(employeeName);
      break;
    case 'MyHistory':
      listMySchedule(employeeName);
      break;
    default:
      console.log("Not a valid option");
  };