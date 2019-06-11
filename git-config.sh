git config --global user.email "dhirwanashish@gmail.com"
git config --global user.name "ashishdhirwan" access error

echo "# practice" >> README.md
git init
git add README.md
git commit -m "first commit"
git pull origin master
git remote add origin https://github.com/ashishdhirwan/practice.git
git push -u origin master

git config credential.helper store
git push https://github.com/ashishdhirwan/practice.git


'echo https://ashishdhirwan:dhirwan10@github.com > .git-credentials',
    "git config credential.helper 'store --file .git-credentials'",
    "git remote add origin https://github.com/ashishdhirwan/practice.git",
    "wget -q -O gitversion https://github.com/screwdriver-cd/gitversion/releases/download/v1.1.1/gitversion_linux_amd64",
    "chmod u+x ./gitversion",
    "git fetch --tags -q",
    "./gitversion  bump auto && ./gitversion show > pipeline_app_version.txt",
    "git push origin --tags",
