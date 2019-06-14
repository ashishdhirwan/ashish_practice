const { events, Job } = require("brigadier")

events.on("push", (e) => {
  var job = new Job("storage", "alpine:3.4")
  job.storage.enabled = true

  job.tasks = [
    "echo " + e.buildID + " >> /mnt/brigade/share/jobs.txt",
    "cat /mnt/brigade/share/jobs.txt"
  ]

  job.run()
})