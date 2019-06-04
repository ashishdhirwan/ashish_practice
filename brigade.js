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

  let j = new Job("hello-world","dhirwanashish/gogvoldoc:v1");
  j.privileged = true;
  
  j.env = {
    DOCKER_DRIVER: "overlay"
  }
  j.tasks = [
    "sleep 10",
    "echo entered",
   // "cd /src",
    "gcloud info",
    "echo now initializing",
    //"gcloud init --console-only -y",
    "echo $(pwd)",
    "ls -lart",
    //"cd mydir/app/",
    "gcloud config set project ashishdhirwan",
    "gcloud auth activate-service-account --key-file=/mydir/vol/ashishdhirwan-5654e4933c46.json --project=ashishdhirwan",
   // "gcloud auth application-default login",
    "cd /src",
    "gcloud auth configure-docker",
    "echo done-auth",
    "echo Hello World!",
    "dockerd-entrypoint.sh &",
    "sleep 30",
    "docker version",
    //"cd /src",
    "docker login -u dhirwanashish -p dhirwan10",
    "docker build -t dhirwanashish/practice:latest .",
    "docker tag dhirwanashish/practice:latest gcr.io/ashishdhirwan/dhirwanashish/practice:v1",
    "docker push gcr.io/ashishdhirwan/dhirwanashish/practice:v1"
  ]
   j.run();
});

