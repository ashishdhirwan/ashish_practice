// const { Job } = require('@brigadecore/brigadier');
// const { Job } = require('brigadier');
// console.log("use case lint",Job);
// new LintTask(job)

class LintTask{
  
  constructor(job) {
    this.Job = job;
  }

  usecaselint(){
    console.log(this.Job);
    const linttask = new this.Job("linttask","node:slim");
    linttask.storage.enabled = true;
    linttask.tasks = [
      "cd /src",
      "npm i",
      "echo %%%%%%%%%%%%%%%%",
      "npm eslint",
      "echo #############################",
      'if $? != eq 0; then npm eslint:fix; else echo linting is done successfully; fi',
      "echo $$$$$$$$$$$$$$$$$$$$",
      //"if [ $? -eq 0 ]; then 'npm run eslint'; else echo waiiting; fi",
      //"npm run eslint"
    ];
    //  return linttask;
    console.log("Inside useCaseLint");
    return linttask;
    }
}


module.exports = LintTask;

//const linting = new LintTask();
//v.usecaselint().run(); 

//module.exports = linting;
 

 //module.exports = new Linttask();