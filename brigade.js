const { events, Job, Group } = require("brigadier")

events.on("push", () => {
  var hello = new Job("hello", "alpine:3.4", ["echo hello"])
  var goodbye = new Job("goodbye", "alpine:3.4", ["echo goodbye"])

  Group.runEach([hello, goodbye])
})