//const { Job } = require('@brigadecore/brigadier');
//const { Job } = require('brigadier');
class GitTask{

  constructor(job) {
    this.Job = job;
  }

  usecasegit(){

  //  var jsonPayload = JSON.parse(e.payload);
    var dest = "/mnt/brigade/share/keys.txt";
        
    const gittask = new this.Job("gittask", "dhirwanashish/asd-devops:v1");
    gittask.storage.enabled = true;
    gittask.tasks = [
        "cd /src",
        'echo https://ashishdhirwan:dhirwan10@github.com > .git-credentials',
        "git config credential.helper 'store --file .git-credentials'",
        "git remote add origin https://github.com/ashishdhirwan/ashish_practice.git",
        "wget -q -O gitversion https://github.com/screwdriver-cd/gitversion/releases/download/v1.1.1/gitversion_linux_amd64",
        "chmod u+x ./gitversion",
        "git fetch --tags -q",
        "./gitversion  bump auto && ./gitversion show > pipeline_app_version.txt",
        "git branch",
        "git push --tags origin",
        "latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)",
        "echo $latestTag",
        'echo $latestTag >' + dest,
        "cat " + dest,
        ];
        console.log("In Use case git");
        return gittask;
    //console.log("In Use case git");
}
}
module.exports = GitTask;
//module.exports = new GitTask();