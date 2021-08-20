const inquirer = require('inquirer');
const sqlite3 = require('sqlite3');



inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));

console.log("*********************************************************");
console.log("****************** VACCIN TRACKING APP ******************");
console.log("*********************************************************");
console.log("                                                         ");

let db = new sqlite3.Database('db/main.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  // console.log('Connected to the main SQlite database.');


  inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: "confirm",
        message : "Are you vaccinated? ",
        name : "vaccinated",
        default: true,

    },
    
    {
        type: "list",
        message : "Which vaccin did you take? ",
        name : "vaccin",
        choices : ['AstraZeneca', 'Sinopharm', 'Janssen', 'Pfizer'],
        when : answers => answers.vaccinated
    },

    {
        type: "list",
        message : "How many shots did you take? ",
        name : "shot",
        choices : ['One', 'Two'],
        when : answers => (answers.vaccin)
    },

    {
        type: "datepicker",
        message : "Please input the date of your 1st shot: ",
        name : "date_first_shot",
        format: ['DD', '/', 'MM', '/', 'Y'],
        when : answers => (answers.shot == "One")
    },

    {
        type: "datepicker",
        message : "Please input the date of your 2nd shot: ",
        name : "date_second_shot",
        format: ['DD', '/', 'MM', '/', 'Y'],
        when : answers => (answers.shot == "Two")
    },

  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers);
    //console.log("insert into Covid(vaccinated,vaccin,shot,date_first_shot,date_second_shot) values (" + answers.vaccinated + "," + answers.vaccin + "," + answers.shot + "," + answers.date_first_shot + "," + answers.date_second_shot + ")");
    
    db.run("insert into Covid (vaccinated,vaccin,shot,date_first_shot,date_second_shot)  values ('" + answers.vaccinated +  "','" + answers.vaccin + "','" + answers.shot + "','" + answers.date_first_shot + "','" + answers.date_second_shot + "')", function(err,row){
      if (err) {
        console.log(err.message);
      }
    
    
    }); 
       


    if (!answers.vaccinated) 
    {
      
      console.log("Please take your vaccin as soon as possible");
    }
   
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
  












});

  /*

db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log('Close the database connection.');
  });



  */
