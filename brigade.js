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
    'echo https://ashishdhirwan:dhirwan10@github.com > .git-credentials',
    "git config credential.helper 'store --file .git-credentials'",
    "git remote add origin https://github.com/ashishdhirwan/practice.git", //using this tag is not showing in github
    "wget -q -O gitversion https://github.com/screwdriver-cd/gitversion/releases/download/v1.1.1/gitversion_linux_amd64",
    "chmod u+x ./gitversion",
    "git fetch --tags -q",
    "./gitversion  bump auto && ./gitversion show > pipeline_app_version.txt",
    //PULL MASTER GIVES MERGING CONCEPT
    //'git config --global user.email "dhirwanashish@gmail.com"',
    //'git config --global user.name "ashishdhirwan"',
    //"git pull origin master --allow-unrelated-histories",
    //"echo pulllllllllllllllllllllllllll",
    "git branch",
    //"git remote add origin https://github.com/ashishdhirwan/practice.git", //using this tag can work but newly have to start everything
    "git push --tags origin",
    "latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)",
    "echo $latestTag",
    "echo doneeeeeeeeeeeeeeeeeeeeeeeeeee",
    "docker build -t dhirwanashish/versioning:latest .",
    "echo done-build",
    "docker tag dhirwanashish/versioning:latest gcr.io/my-project-70505/dhirwanashish/versioning:$latestTag",
    "echo done-tagging",
    "docker push gcr.io/my-project-70505/dhirwanashish/versioning:$latestTag",
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
    'sed -i "s/tag.*/tag: "$latestTag"/" values.yaml',
    'sed -i "s/version.*/version: "$latestTag"/" Chart.yaml',
    //`sed -i 's/tag.*/tag: "$latestTag"/' values.yaml`,	
    "cat values.yaml",
    "cd ..",
    "helm ls",
    //"helm install my-chart/",
    "helm upgrade giggly-rabbit my-chart/",
    "echo done-work",

]
  
   j.run();
});

