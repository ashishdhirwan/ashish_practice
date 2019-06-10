const { events, Job, Group } = require('brigadier')

events.on("push", async () => {

  let j = new Job("hello-world","dhirwanashish/asd-devops:v1");
  j.privileged = true;
  
  j.env = {
    DOCKER_DRIVER: "overlay"
  }
  j.tasks = [
    "sleep 10",
    "echo entered",
    "gcloud info",
    "echo Hello World!",
    "echo now initializing",
    //"git",
    "git version",
    "echo gitiiiiiiiiiiiiiiiiiiiiiing",   
    //"GIT_COMMIT=git rev-parse HEAD",
   // "git ",  
    "git rev-parse HEAD",
    "echo hello world 2",
    "NEEDS_TAG= git describe --contains $GIT_COMMIT",
    "echo $NEEDS_TAG",
    "ls -lart",
    "dockerd-entrypoint.sh &",
    "gcloud auth configure-docker",
    "echo $(pwd)",
    "ls -lart",
    //"helm init",
    "helm version",
    "helm ls",
    "echo helm running",
    "echo $(pwd)",
    "echo now auth",
    "ls -lart",
    //"gcloud config set project my-project-70505",
    //"gcloud auth activate-service-account --key-file=/mydir/vol/my-project-70505-c03a97524e24.json --project=my-project-70505",
    "cd /src",
    //"helm install my-chart/",
    "echo done-auth",

  ]
   j.run();
});

