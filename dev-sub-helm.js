class HelmTask{

UseCaseHelm(){
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
}
}
module.exports = HelmTask;
//module.exports = new HelmTask();