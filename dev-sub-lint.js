const { Job } = require('brigadier');
class LintTask {

  usecaselint(){
  const lintTask = new Job("linttask","node:slim");
  lintTask.storage.enabled = true;
  lintTask.tasks = [
    "cd /src",
    "npm run eslint"
   ];
  //  return linttask;
  console.log("In use case lint");
}
}
module.exports = new LintTask();
//module.exports = new Linttask();