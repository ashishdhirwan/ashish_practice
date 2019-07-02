const { Job, events } = require('brigadier');
const DevTask = require('./tasks.js');
console.log("events", events);

const devtask = new DevTask();
console.log("devtask", devtask.lint_task());


/*   var keyval = {
  project : project.secret.project,
  repository : project.secret.repository,
  cloneUrl : project.secret.cloneUrl,
  type : project.secret.type,
  project_id : project.secret.project_id,
  private_key_id : project.secret.private_key_id,
  private_key : project.secret.private_key,
  client_email : project.secret.client_email,
  client_id : project.secret.client_id,
  auth_uri : project.secret.auth_uri,
  token_uri : project.secret.token_uri,
  auth_provider_x509_cert_url : project.secret.auth_provider_x509_cert_url,
  client_x509_cert_url : project.secret.client_x509_cert_url

};
  */

events.on("push", async (e, project) => {
  let jsonPayload = JSON.parse(e.payload);
  console.log("Received a push event");
  var dest = "/mnt/brigade/share/keys.txt";

  var keyval = {
    project : project.secrets.project,
    repository : project.secrets.repository,
    cloneUrl : project.secrets.cloneUrl,
    type : project.secrets.type,
    project_id : project.secrets.project_id,
    private_key_id : project.secrets.private_key_id,
    private_key : project.secrets.private_key,
    client_email : project.secrets.client_email,
    client_id : project.secrets.client_id,
    auth_uri : project.secrets.auth_uri,
    token_uri : project.secrets.token_uri,
    auth_provider_x509_cert_url : project.secrets.auth_provider_x509_cert_url,
    client_x509_cert_url : project.secrets.client_x509_cert_url
  
  };
   

  let linttask = new Job("lintask","node:slim");
  linttask.storage.enabled = true;
  linttask.tasks = [
    "ls -lart",
    "cd src/",
    `echo ${keyval}`
    //...devtask.lint_task(keyval)
    //  devtask.git_auth(),
    //  "echo authdone",
    //  devtask.git_versioning(),
    //  "echo versionindone",
    //  devtask.git_tag_store(dest),
    //  "echo storagedone"
  ];


  let gittask = new Job("gittask", "nxvishal/platform_new");
  gittask.storage.enabled = true;
  gittask.tasks = [
    "ls -lart",
    "cd src/",
    ...devtask.git_auth(),
    ...devtask.git_versioning(),
    ...devtask.git_tag_store(dest)
    //...devtask.git_versioniong(),
    //...devtask.git_tag_store(dest)
  ];

/*   let dockerbuild = new Job("docker","nxvishal/platform_new");
  dockerbuild.privileged = true;
  dockerbuild.storage.enabled = true;
  dockerbuild.env = {
    DOCKER_DRIVER: "overlay"
  }
  dockerbuild.tasks = [
    "cd src/",
    "ls -lart",
    ...devtask.docker_start(),
    ...devtask.docker_gcloud_auth(keyval)
  ];
 */

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

  if (e.type === 'push') {
    if (jsonPayload.ref === "refs/heads/master") {
      //   Group.runEach([
      //      console.log("===============typeof jobinstance=================",typeof jobinstance);
      await linttask.run();
      await gittask.run();
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