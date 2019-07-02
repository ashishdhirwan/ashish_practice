class DevTask {

    lint_task(keyval) {
        return [
            "echo linting",
            `echo ${keyval}.project_id`
            //"npm i",
            //    "npm run eslint",
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
            "cat " + dest,
        ];
    }

/*     docker_start(){
        return[
            "echo docker starting",
            "dockerd-entrypoint.sh &",
        ];
    }
    docker_gcloud_auth(keyval){
        return[

            "echo authenticating",
            "gcloud auth configure-docker",
            `gcloud config set project ${keyval}.project_id`,
            `gcloud auth activate-service-account --key-file=${keyval} --project=${keyval.project_id}',
            "echo done-auth",
        ]; */
    }


module.exports = DevTask;