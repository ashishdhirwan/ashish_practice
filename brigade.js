const { Job , events } = require('brigadier');
const DevTask = require('./tasks.js');
const devtask = new DevTask();
console.log("devtask",devtask.lint_task());


events.on("push", async (e, project) => {
  let jsonPayload = JSON.parse(e.payload); 
  console.log("Received a push event");
  var dest = "/mnt/brigade/share/keys.txt";

  let linttask = new Job("linttask","node:slim");
  linttask.storage.enabled = true;
  linttask.tasks = [
  devtask.lint_task()
  //  devtask.git_auth(),
  //  "echo authdone",
  //  devtask.git_versioning(),
  //  "echo versionindone",
  //  devtask.git_tag_store(dest),
  //  "echo storagedone"
  ];

/* 
  const linting = new LintTask(Job);
  const giting = new GitTask(Job);
  const building = new BuildTask(Job);
  const helming = new HelmTask(Job);
  console.log('checkpoint1');
  const jobinstance1 = linting.usecaselint();
  const jobinstance2 = giting.usecasegit();
  const jobinstance3 = building.usecasebuild();
  const jobinstance4 = helming.usecasehelm(); */
  console.log('checkpoint2');   

  if(e.type === 'push') {
    if(jsonPayload.ref === "refs/heads/master") {
//   Group.runEach([
//      console.log("===============typeof jobinstance=================",typeof jobinstance);
      await linttask.run();
      //await jobinstance2.run();
      //await jobinstance3.run();
      //await jobinstance4.run();
      // await GitTask.usecasegit().run();
      // await BuildTask.usecasebuild().run();
      // await HelmTask.usecasehelm().run();
//      ]);
    }
  }
});