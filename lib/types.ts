
export interface IUserData {
    avatar_url: string;
    id: number;
    login: string;
    html_url: string;
    repos_url: string;
}

export interface IRepoData {
    stargazers_count?: number | undefined;
    description: string | null;
    name: string;
    html_url: string;
    pushed_at?: string | null | undefined;
    forks?: number | undefined;
    topics?: string[];
}