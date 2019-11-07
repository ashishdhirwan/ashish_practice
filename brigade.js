const { Job, events } = require('brigadier');
const DevTask = require('./tasks.js');
const HelmCommandFactory = require('./Helmupgrade.js');
console.log("events", events);
const devtask = new DevTask();

events.on("push", async (e, project) => {
  console.log("project logs",project);
  let jsonPayload = JSON.parse(e.payload);
  console.log("Received a push event");
  var dest = "/mnt/brigade/share/keys.txt";
  

  var keyval = {
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
  var keyvalobj = JSON.stringify(keyval);
  
  const values = {
   // repository: "gcr.io/my-project-70505/dhirwanashish/dev",
    //name: "ashish.dhirwan",
    projectName: "environment"
  };
  
/*   function helming() {
    return{
      HelmCommandFactory().createUpgradeInstallCommand('default','ashish-practice','my-chart/',values);
      //const helmCommand = new HelmCommandFactory().createUpgradeInstallCommand('default','ashish-practice','my-chart/',values);
      //console.log(helmCommand);
    }
  } */

  
  let linttask = new Job("lintask","node:slim");
  linttask.storage.enabled = true;
  linttask.tasks = [
    "ls -lart",
    "cd src/",
    ...devtask.lint_task(keyval)

  ];

  let gittask = new Job("gittask", "nxvishal/platform_new");
  gittask.storage.enabled = true;
  gittask.tasks = [
    "ls -lart",
    "cd src/",
    ...devtask.git_auth(),
    ...devtask.git_versioning(),
    ...devtask.git_tag_store(dest)
  ];
 
  console.log('checkpoint1');

  let dockerbuild = new Job("docker","nxvishal/platform_new");
  dockerbuild.privileged = true;
  dockerbuild.storage.enabled = true;
  dockerbuild.env = {
    DOCKER_DRIVER: "overlay",
    key: keyvalobj
  };
  
  dockerbuild.tasks = [
    "cd src/",
    "ls -lart",
    ...devtask.docker_start(),
    ...devtask.docker_gcloud_auth()
    //...devtask.docker_build(keyval)
  ];
 
  console.log('checkpoint2');

  let helmtask = new Job("helmtask","nxvishal/platform_new");
  helmtask.storage.enabled = true;
  helmtask.tasks = [
    "ls -lart",
    "cd src/",
    ...devtask.helm_update(values)
  ];


  if (e.type === 'push') {
    if (jsonPayload.ref === "refs/heads/master") {
      //   Group.runEach([
      //      console.log("===============typeof jobinstance=================",typeof jobinstance);
      await linttask.run();
      await gittask.run();
      await dockerbuild.run();
      await helmtask.run();

    }
  }
});


/* const {

  secrets:{project,repository,cloneUrl,type,project_id,private_key,private_key_id,client_email,client_id,auth_uri,token_uri,auth_provider_x509_cert_url,client_x509_cert_url}
    } = projectVal;
    const keyval = {
      project,
      repository ,
      cloneUrl ,
      type ,
      project_id ,
      private_key_id ,
      private_key ,
      client_email ,
      client_id ,
      auth_uri ,
      token_uri ,
      auth_provider_x509_cert_url ,
      client_x509_cert_url   
    };   */