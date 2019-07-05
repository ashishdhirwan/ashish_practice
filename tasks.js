const HelmCommandFactory = require('./Helmupgrade.js');
class DevTask {

    lint_task(keyval) {
        console.log("sdf",keyval);
        return [
            "echo linting",
            `echo ${keyval.project_id}`,
            //`echo ${keyval.project_id}`
            //"npm i",
            //"npm run eslint",
            //"npm eslint:fix",
            //"`if $? == eq 0; then npm eslint; else echo linting is unsuccessfull; fi`"
        ];
    }

    git_auth() {
        return [
            "echo git auth started",
            "echo https://ashishdhirwan:dhirwan10@github.com > .git-credentials",
            "git config credential.helper 'store --file .git-credentials'",
            "git remote add origin https://github.com/ashishdhirwan/ashish_practice.git",
            "echo git auth done"
        ];
    }

    git_versioning() {
        return [
            "echo versioning started",
            "wget -q -O gitversion https://github.com/screwdriver-cd/gitversion/releases/download/v1.1.1/gitversion_linux_amd64",
            "chmod u+x ./gitversion",
            "git fetch --tags -q",
            "./gitversion  bump auto && ./gitversion show > pipeline_app_version.txt",
            "git push --tags origin",
            "echo versioning done"
        ];
    }

    git_tag_store(dest) {
        return [
            "echo tag store started",
            "latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)",
            "echo $latestTag",
            'echo $latestTag >' + dest,
            "cat " + dest
        ];
    }

    docker_start() {
        return [
            "echo docker starting",
            "dockerd-entrypoint.sh &"
        ];
    }
    docker_gcloud_auth() {
        return [
            "echo authenticating",
            "gcloud auth configure-docker",
            "ls",
            "echo authing",
            //`echo ${keyval.project_id}`,
            //`gcloud config set project ${keyval.project_id}`,
            "ls",
            "echo configing",
            "echo $key > key.json",
            `gcloud auth activate-service-account --key-file=key.json`,
            "echo done-auth"
        ]; 
    }
    docker_build(keyval) {
        return [
            //"cd /mnt/brigade/share",
            "var=$(cat /mnt/brigade/share/keys.txt)",
            "echo $var",
            "docker build -t dhirwanashish/dev:latest .",
            "echo done-build",
            //"docker tag dhirwanashish/dev:latest gcr.io/my-project-70505/dhirwanashish/dev:$var",
            `docker tag dhirwanashish/dev:latest gcr.io/${keyval.project_id}/dhirwanashish/dev:$var`,
            "echo done-tagging",
            `docker push gcr.io/${keyval.project_id}/dhirwanashish/dev:$var`
        ];
    }

      helm_update() {
        return [
            //"cd /mnt/brigade/share",
            "var=$(cat /mnt/brigade/share/keys.txt)",
            "echo $var",
            "ls -lart",
            //"cd my-chart/",
            "helm ls",
            new HelmCommandFactory().createUpgradeInstallCommand('default','ashish-practice','my-chart/',values),
            //const helmCommand = new HelmCommandFactory().createUpgradeInstallCommand('default','ashish-practice','my-chart/',values);
            //console.log(helmCommand);
            //"helm upgrade ashish-practice my-chart/",
            //"helm upgrade --set=image.tag=$var ashish-practice my-chart/",    //another way of tagging and upgrading directly
            //'sed -i "s/version.*/version: "$var"/" Chart.yaml',
            //`sed -i 's/tag.*/tag: "$latestTag"/' values.yaml`,	
           // "cat values.yaml",
            //"cd ..",
            "helm ls",
            //"helm install my-chart/",
            "echo done-work"
        ];
    }  
}

module.exports = DevTask;