//const { events, Job, Group } = require('brigadier')
/*

events.on("push", () => {
  var hello = new Job("hello", "alpine:3.4")
  hello.tasks = [
    "echo Hello",
    "echo World"
  ]
  hello.run()
})
*/


const { events, Job, Group } = require('brigadier')

events.on("push", async () => {

  let j = new Job("hello-world","dhirwanashish/gogdoc:v1");
  j.privileged = true;
  
  j.env = {
    DOCKER_DRIVER: "overlay"
  }
  j.tasks = [
    "sleep 10",
    "echo entered",
    "gcloud info",
    "echo now initializing",
    "docker run -d  dhirwanashish/gogdoc:v1 -v /home/ashish/Desktop/finall-docker/ :/dir1",// /bin/bash",
    //"docker cp [OPTIONS] CONTAINER:dhirwanashish/asd-prac /dir1|-",
    //"gcloud init --console-only -y",
    "echo $(pwd)",
    "ls -lart",
    //"cd mydir/app/",
    "gcloud config set project my-project-70505",
    "gcloud auth activate-service-account --key-file=/dir1/my-project-70505-c03a97524e24.json --project=my-project-70505",
    //"gcloud auth activate-service-account --key-file=/mydir/vol/my-project-70505-c03a97524e24.json --project=my-project-70505",
    "cd /src",
    "gcloud auth configure-docker",
    "echo done-auth",
    "echo Hello World!",
    "dockerd-entrypoint.sh &",
    "sleep 30",
    "docker version",
    //"docker login -u user -p pass",
    "docker build -t dhirwanashish/ashish_practice_try111:latest .",
    "docker tag dhirwanashish/ashish_practice_try111:latest gcr.io/my-project-70505/dhirwanashish/ashish_practice_try111:v1",
    "docker push gcr.io/my-project-70505/dhirwanashish/ashish_practice_try111:v1"
  ]
   j.run();
});

