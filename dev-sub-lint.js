class LintTask{

  UseCaseLint(){
  let linttask = new Job("linttask","node:slim");
  linttask.storage.enabled = true;
  linttask.tasks = [
    "cd /src",
    "npm run eslint"
   ];
}
}
module.export = LintTask;
//module.exports = new Linttask();