const { events, Job, Group } = require('brigadier')


class Devclass{

    events.on("push", async (e, project) => {

        var jsonPayload = JSON.parse(e.payload);
        var dest = "/mnt/brigade/share/keys.txt";
        
        let gittask = new Job("gittask","dhirwanashish/asd-devops:v1");
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
      
        let linttask = new Job("linttask","node:slim");
        linttask.storage.enabled = true;
        linttask.tasks = [
          "cd /src",
          "npm run eslint"
         ];
      
        let dockerbuild = new Job("docker","dhirwanashish/asd-devops:v1");
        dockerbuild.privileged = true;
        dockerbuild.storage.enabled = true;
        dockerbuild.env = {
          DOCKER_DRIVER: "overlay"
        }
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
      
        let helmtask = new Job("helmtask","dhirwanashish/asd-devops:v1");
        helmtask.storage.enabled = true;
        helmtask.tasks = [
          "cd /mnt/brigade/share",
          "var=$(cat keys.txt)",
          "echo $var",
          "ls -lart",
          "cd /src",
          "cd my-chart/",
          //"helm upgrade --set=image.tag=$var giggly-rabbit giggly-rabbit/my-chart",    //another way of tagging and upgrading directly
          'sed -i "s/tag.*/tag: "$var"/" values.yaml',
          'sed -i "s/version.*/version: "$var"/" Chart.yaml',
          //`sed -i 's/tag.*/tag: "$latestTag"/' values.yaml`,	
          "cat values.yaml",
          "cd ..",
          "helm ls",
          //"helm install my-chart/",
          "helm upgrade nordic-emu my-chart/",
          "echo done-work",
         ];
      
        events.on("push", (e, project) => {
            console.log("Received a push event");
            let jsonPayload = JSON.parse(e.payload);    
            let jobFactory = new JobFactory();
            
        if(e.type == 'push'){
        if(jsonPayload.ref == "refs/heads/master") {
          await linttask.run();
          await gittask.run();
          await dockerbuild.run();
          await helmtask.run();
        }
      }
      })
      

}

module.exports = new Devclass();
//module.exports.x = x;
// module.exports.addX = addX;