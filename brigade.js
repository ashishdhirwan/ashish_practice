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
    "echo Hello World!",
    "echo now initializing",
    "git version",
    "echo gitiiiiiiiiiiiiiiiiiiiiiing",
   // "git init",
    "dockerd-entrypoint.sh &",
    "gcloud auth configure-docker",
    "gcloud config set project my-project-70505",
    "gcloud auth activate-service-account --key-file=/mydir/vol/my-project-70505-c03a97524e24.json --project=my-project-70505",
    "echo done-auth",
    "cd /src",
    "wget -q -O gitversion https://github.com/screwdriver-cd/gitversion/releases/download/v1.1.1/gitversion_linux_amd64",
    "chmod u+x ./gitversion",
    "git fetch --tags -q",
    "`./gitversion  bump auto && ./gitversion show > pipeline_app_version.txt;,`",
    "git push --tags >/dev/null 2>&1",
    "latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)",
    "echo $latestTag",
    "echo doneeeeeeeeeeeeeeeeeeeeeeeeeee",
    "docker build -t dhirwanashish/ashish_practice_try_2:latest .",
    "echo done-build",
    "docker tag dhirwanashish/ashish_practice_try_2:latest gcr.io/my-project-70505/dhirwanashish/ashish_practice_try_2:$latestTag",
    "echo done-tagging",
    "docker push gcr.io/my-project-70505/dhirwanashish/ashish_practice_try_2:$latestTag",
    "ls -lart",
    "echo $(pwd)",
    "ls -lart",
    "helm init",
    "helm version",
    "helm ls",
    "echo helm running",
    "echo $(pwd)",
    "echo now auth",
    "ls -lart",
    "cd my-chart/",
    //"sed -i 's/version.*/version: '$latestTag'/' Chart.yaml",
    //'sed -i "s/version.* /version: "$latestTag"/" Chart.yaml',
    'sed -i "s/tag.*/tag: "$latestTag"/" values.yaml',
    //`sed -i 's/tag.*/tag: "$latestTag"/' values.yaml`,	
    "cat values.yaml",
    "cd ..",
    "helm ls",
    "helm upgrade hissing-lobster my-chart/",
    "echo done-work",
   // "docker build -t dhirwanashish/ashish_practice_try_1:latest .",
   // "echo done-build",
   // "docker tag dhirwanashish/ashish_practice_try_1:latest gcr.io/my-project-70505/dhirwanashish/ashish_practice_try_1:$latestTag",
   // "echo done-tagging",
   // "docker push gcr.io/my-project-70505/dhirwanashish/ashish_practice_try_1:$latestTag"
  ]
  
   j.run();
});

