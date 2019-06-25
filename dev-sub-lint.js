const { Job } = require('@brigadecore/brigadier');
//const { Job } = require('brigadier');
console.log("use case lint");
class LintTask{

  usecaselint(){
  const linttask = new Job("linttask","node:slim");
  linttask.storage.enabled = true;
  linttask.tasks = [
    "cd /src",
    "npm run eslint"
   ];
  //  return linttask;
  console.log("In use case lint");
}
}
/* 
const v = new LintTask();
v.usecaselint().run(); */

module.exports = LintTask;
 

 //module.exports = new Linttask();