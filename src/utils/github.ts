
export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export const fetchStarredRepositories = async (username: string): Promise<GithubRepository[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/starred`);
    
    if (!response.ok) {
      throw new Error(`Error fetching starred repos: ${response.status}`);
    }
    
    const data: GithubRepository[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching starred repositories:', error);
    return [];
  }
};

export const fetchUserRepositories = async (username: string): Promise<GithubRepository[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
    
    if (!response.ok) {
      throw new Error(`Error fetching user repos: ${response.status}`);
    }
    
    const data: GithubRepository[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    return [];
  }
};

export const fetchRepositoryDetails = async (owner: string, repo: string): Promise<GithubRepository | null> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching repo details: ${response.status}`);
    }
    
    const data: GithubRepository = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repository details:', error);
    return null;
  }
};
