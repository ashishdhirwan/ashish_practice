class DevTask{

    lint_task(){
        return[
        "npm eslint:fix",
        "`if $? == eq 0; then npm eslint; else echo linting is unsuccessfull; fi`"
        ];
    }

    git_auth(){
        return[
            "echo https://ashishdhirwan:dhirwan10@github.com > .git-credentials",
            "git config credential.helper 'store --file .git-credentials'",
            "git remote add origin https://github.com/ashishdhirwan/ashish_practice.git"
        ];
    }

    git_versioning(){
        return[
            "wget -q -O gitversion https://github.com/screwdriver-cd/gitversion/releases/download/v1.1.1/gitversion_linux_amd64",
            "chmod u+x ./gitversion",
            "git fetch --tags -q",
            "./gitversion  bump auto && ./gitversion show > pipeline_app_version.txt",
            "git push --tags origin"
        ];
    }

    git_tag_store(dest){
        return[
            "latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)",
            "echo $latestTag",
            'echo $latestTag >' + dest,
            "cat " + dest,
        ];
    }
}
module.exports = DevTask;
