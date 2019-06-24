const { Job } = require('brigadier');
class LintTask {

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
module.exports = LintTask;
//module.exports = new Linttask();