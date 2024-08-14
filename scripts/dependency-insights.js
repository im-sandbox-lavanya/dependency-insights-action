
// scripts/dependency-insights.js
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const orgName = process.env.ORG_NAME;

async function getDependencyInsights() {
  try {
    let repos = [];
    let page = 1;
    let perPage = 100;

    while (true) {
      const response = await octokit.repos.listForOrg({
        org: orgName,
        type: "all",
        per_page: perPage,
        page: page,
      });

      repos = repos.concat(response.data);

      if (response.data.length < perPage) {
        break;
      }

      page++;
    }

    for (const repo of repos) {
      const insights = await octokit.rest.dependencyGraph.getRepoGraph({
        owner: orgName,
        repo: repo.name,
      });

      console.log(`Repository: ${repo.name}`);
      console.log(insights.data);
    }
  } catch (error) {
    console.error(`Error fetching dependency insights: ${error.message}`);
  }
}

getDependencyInsights();
