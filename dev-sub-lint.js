const { Job } = require('@brigadecore/brigadier');
//const { Job } = require('brigadier');
console.log("use case lint",Job);

class LintTask{

  async usecaselint(){
  const linttask = await new Job("linttask","node:slim");
  linttask.storage.enabled = true;
  linttask.tasks = [
    "cd /src",
    "npm run eslint"
   ];
  //  return linttask;
  console.log("In use case lint");
return linttask;
  }
};


module.exports = LintTask;

//const linting = new LintTask();
//v.usecaselint().run(); 

//module.exports = linting;
 

 //module.exports = new Linttask();