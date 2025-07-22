import axios from "axios";
import type { User } from "../types/User";

export async function getUserFromGithub(username: string): Promise<User> {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
}
