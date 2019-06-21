const dev_mod = () => {
const { HelmTask } = require('./HelmTask');
const { LintTask } = require('./LintTask');
const { GitTask } = require('./GitTask');
const { BuildTask } = require('./BuildTask');

/*
module.exports = {
    HelmTask: require('./HelmTask'),
    LintTask: require('./LintTask'),
    GitTask: require('./GitTask'),
    BuildTask: require('./BuildTask'),
*/

}
module.exports = dev_mod;
//module.exports = new HelmTask();