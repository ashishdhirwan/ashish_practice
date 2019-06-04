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
