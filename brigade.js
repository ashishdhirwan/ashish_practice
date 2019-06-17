const { events, Job, Group } = require("brigadier")

events.on("push", () => {
  var dest = "/mnt/brigade/share/hello.txt";
  var hello = new Job("hello", "alpine:3.4", ["echo hello" > + dest]);
  var goodbye = new Job("goodbye", "alpine:3.4", ["cat " + dest])
  hello.storage.enabled = true;
  goodbye.storage.enabled = true

  //hello.resourceRequests.memory = "1Gi";
  //hello.resourceRequests.cpu = "500m";
  //hello.resourceLimits.memory = "1Gi";

  //hello.run();
  Group.runEach([hello, goodbye])
})