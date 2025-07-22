import type { User } from "../types/User";

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {
  return (
    <div>
      <img src={user.avatar_url} alt={user.login} width={80} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <p>{user.location}</p>
      <p>Seguidores: {user.followers}</p>
      <p>Repositórios: {user.public_repos}</p>
    </div>
  );
}
