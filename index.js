const HelmTask = require('./dev-sub-helm');
const GitTask = require('./dev-sub-git');
const BuildTask = require('./dev-sub-build');
const LintTask  = require('./dev-sub-lint');


/* console.log("HelmTask::::::::::::::", new HelmTask().usecasehelm());
console.log("GitTask::::::::::::::", new GitTask().usecasegit());
console.log("BuildTask::::::::::::::", new BuildTask().usecasebuild());
console.log("LintTask::::::::::::::", new LintTask().usecaselint()); 
 */
/* 
class dev_mod{      // a class can be called with object only hence we created an object 1st 
                     //see console.log here also

   asd(){
       console.log("asd");
   }

}
const a = new dev_mod(); */

/* const dev_mod_function = () => {
//LintTask.usecaselint();

return {
    HelmTask,
    LintTask,
    GitTask,
    BuildTask
};
};
const dev_mod = dev_mod_function();
module.exports = new dev_mod();
//module.exports = dev_mod; */
 
//exports.devops_module = () => {
module.exports = {
HelmTask, GitTask, BuildTask, LintTask
};
//};

/* class dev{
    asd(){
    module.exports = {
        HelmTask, GitTask,BuildTask,LintTask
        } }
}
/* const dev_mod = dev();

module.exports = dev_mod;
/*  
return {
        HelmTask,
        LintTask,
        GitTask,
        BuildTask
    };
}
 */


   // "abc":"git+git:url"
