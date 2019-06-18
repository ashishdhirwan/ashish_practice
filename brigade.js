const { events, Job, Group } = require('brigadier')

events.on("push", async () => {
  var dest = "/mnt/brigade/share/keys.txt";
  let gittask = new Job("gittask","dhirwanashish/asd-devops:v1");
  gittask.storage.enabled = true;
  gittask.tasks = [
    "cd /src",
    'echo https://ashishdhirwan:dhirwan10@github.com > .git-credentials',
    "git config credential.helper 'store --file .git-credentials'",
    //"git remote add origin https://github.com/ashishdhirwan/practice.git", //using this tag is not showing in github
    "wget -q -O gitversion https://github.com/screwdriver-cd/gitversion/releases/download/v1.1.1/gitversion_linux_amd64",
    "chmod u+x ./gitversion",
    "git fetch --tags -q",
    "./gitversion  bump auto && ./gitversion show > pipeline_app_version.txt",
    "git branch",
    "git remote add origin https://github.com/ashishdhirwan/practice.git", //using this tag can work but newly have to start everything
    "git push --tags origin",
    "latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)",
    "echo $latestTag",
    "echo $latestTag >" + dest
  ]

/*
  let gcloudauth = new Job("docker","dhirwanashish/asd-devops:v1");
  gcloudauth.tasks = [
    "sleep 10",
    "gcloud auth configure-docker",
    "gcloud config set project my-project-70505",
    "gcloud auth activate-service-account --key-file=/mydir/vol/my-project-70505-c03a97524e24.json --project=my-project-70505",
    "echo done-auth",
    "cd /src",
   ]  
*/

  let dockerbuild = new Job("docker","dhirwanashish/asd-devops:v1");
  dockerbuild.privileged = true;
  dockerbuild.storage.enabled = true;
  dockerbuild.env = {
    DOCKER_DRIVER: "overlay"
  }
  dockerbuild.tasks = [
    "sleep 10",
    "gcloud auth configure-docker",
    "gcloud config set project my-project-70505",
    "gcloud auth activate-service-account --key-file=/mydir/vol/my-project-70505-c03a97524e24.json --project=my-project-70505",
    "echo done-auth",
    "cd /src",
    "dockerd-entrypoint.sh &",
    "docker build -t dhirwanashish/versioning:latest .",
    "echo done-build",
    "docker tag dhirwanashish/versioning:latest gcr.io/my-project-70505/dhirwanashish/versioning:$latestTag",
    "echo done-tagging",
    "docker push gcr.io/my-project-70505/dhirwanashish/versioning:$(`cat $latestTag`)",
   ]

  let helmtask = new Job("helmtask","dhirwanashish/asd-devops:v1");
  helmtask.storage.enabled = true;
  helmtask.tasks = [
    "ls -lart",
    "cd /src",
    "cd my-chart/",
    //"helm upgrade giggly-rabbit --set=image.tag=$latestTag my-chart/",    //another way of tagging and upgrading directly
    'sed -i "s/tag.*/tag: "$(`cat $latestTag`)"/" values.yaml',
    'sed -i "s/version.*/version: "$(`cat $latestTag`)"/" Chart.yaml',
    //`sed -i 's/tag.*/tag: "$latestTag"/' values.yaml`,	
    "cat values.yaml",
    "cd ..",
    "helm ls",
    //"helm install my-chart/",
    "helm upgrade giggly-rabbit my-chart/",
    "echo done-work",
]

  Group.runEach([gittask, dockerbuild, helmtask])

})











