const { Job } = require('brigadier');
class LintTask{

  usecaselint(){
  const linttask = new Job("linttask","node:slim");
  linttask.storage.enabled = true;
  linttask.tasks = [
    "cd /src",
    "npm run eslint"
   ];
   return linttask;
}
}
module.export = LintTask;
//module.exports = new Linttask();