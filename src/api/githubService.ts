import axios from "axios";
import type { User } from "../types/User";

interface SearchUserItem {
  login: string;
}
interface SearchUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: SearchUserItem[];
}

export async function getUserFromGithub(username: string): Promise<User> {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
}

export async function getTopFollowedUsers(): Promise<User[]> {
  const response = await axios.get<SearchUsersResponse>(
    `https://api.github.com/search/users?q=followers:%3E1000&sort=followers&order=desc&per_page=4`
  );

  const users = await Promise.all(
    response.data.items.map((item) =>
      axios
        .get<User>(`https://api.github.com/users/${item.login}`)
        .then((res) => res.data)
    )
  );

  return users;
}
