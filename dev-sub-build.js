//const { events, Job, Group } = require('brigadier');
//const { Job } = require('@brigadecore/brigadier');
class BuildTask{

  constructor(job) {
    this.Job = job;
  }

usecasebuild(){
const dockerbuild = new this.Job("docker","dhirwanashish/asd-devops:v1");
dockerbuild.privileged = true;
dockerbuild.storage.enabled = true;
dockerbuild.env = {
  DOCKER_DRIVER: "overlay"
};
dockerbuild.tasks = [
  "cd /mnt/brigade/share",
  "var=$(cat keys.txt)",
  "echo $var",
  "sleep 10",
  "cd /src",
  "dockerd-entrypoint.sh &",
  "gcloud auth configure-docker",
  "gcloud config set project my-project-70505",
  "gcloud auth activate-service-account --key-file=/mydir/vol/my-project-70505-c03a97524e24.json --project=my-project-70505",
  "echo done-auth",
  "docker login -u dhirwanashish -p dhirwan10",
  "docker build -t dhirwanashish/dev:latest .",
  "echo done-build",
  "docker tag dhirwanashish/dev:latest gcr.io/my-project-70505/dhirwanashish/dev:$var",
  "echo done-tagging",
  "docker push gcr.io/my-project-70505/dhirwanashish/dev:$var",
 ];
 console.log("IN Use case build");
 return dockerbuild;

 //console.log("IN Use case build");
}
}
module.exports = BuildTask;
//module.exports = new BuildTask();