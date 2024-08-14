async function getAllDependenciesForOrg(org) {
    try {
      const repos = await octokit.request('GET /orgs/{org}/repos', { org });
  
      for (const repo of repos.data) {
        const { data } = await octokit.request('GET /repos/{owner}/{repo}/dependency-graph/depends-on', {
          owner: org,
          repo: repo.name
        });
        console.log(`Dependencies for ${repo.name}:`, data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  // Example usage
  getAllDependenciesForOrg('im-sandbox-lavanya');
  