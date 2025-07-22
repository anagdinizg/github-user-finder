import type { User } from "../types/User";
import { FaMapMarkerAlt, FaUsers, FaBoxOpen } from "react-icons/fa";

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {
  return (
    <div className="bg-beige shadow-lg rounded-lg p-6 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-6 border border-brown">
      <img
        src={user.avatar_url}
        alt={user.login}
        width={80}
        className="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover border-2 border-brown"
      />
      <div className="flex-1 text-left">
        <h2 className="text-2xl font-serif mb-2 text-brown-dark">
          {user.name || user.login}
        </h2>
        {user.bio && (
          <p className="text-brown mb-2 italic max-w-md">{user.bio}</p>
        )}

        {user.location && (
          <p className="text-brown-dark mb-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-brown-dark" />
            {user.location}
          </p>
        )}

        <div className="flex gap-6 text-brown-dark font-medium items-center">
          <span className="flex items-center gap-1">
            <FaUsers className="text-brown-dark" />
            {user.followers} seguidores
          </span>
          <span className="flex items-center gap-1">
            <FaBoxOpen className="text-brown-dark" />
            {user.public_repos} repositórios
          </span>
        </div>
      </div>
    </div>
  );
}
