const { events, Job, Group } = require('brigadier');
const { HelmTask, LintTask, GitTask, BuildTask } = require('dev-mod');


events.on("push", (e, project) => {
    console.log("Received a push event");
    let jsonPayload = JSON.parse(e.payload);    
    // let HelmTask = new HelmTask();

    if (e.type === 'push') {
        if (jsonPayload.ref === "refs/heads/master") {
            Group.runEach([
                LintTask.UseCaseLint();
                GitTask.UseCaseGit();
                BuildTask.UseCaseBuild();
                HelmTask.UseCaseHelm();
            ]);
            };
        };
    });


/*
    // Run relevant stages   
    if (e.type === 'push') {
        if (jsonPayload.ref === "refs/heads/master") {
            Group.runEach([
                jobFactory.createBuildJob(e, project),                 
                jobFactory.createPackageJob(e, project),
                jobFactory.createApprovalJob(e, project)])
        } else if (jsonPayload.ref === "refs/heads/master") {
            console.log("Ignoring Master Push")
        } else {
            Group.runEach([jobFactory.createBuildJob(e, project), jobFactory.createUnitTestJob(e, project)])
        }
    } else if (e.type === 'pull_request') {
        console.log("PULL REQUEST - ignoring")
    }
});

exports.JobFactory = JobFactory

*/