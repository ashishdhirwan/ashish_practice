const HelmTask = require('./dev-sub-helm');
const GitTask = require('./dev-sub-git');
const BuildTask = require('./dev-sub-build');
const LintTask  = require('./dev-sub-lint');

const dev_mod_function = () => {
LintTask.usecaselint();

return {
    HelmTask,
    LintTask,
    GitTask,
    BuildTask
};
};
const dev_mod = dev_mod_function();
module.exports = new dev_mod();
//module.exports = new HelmTask();