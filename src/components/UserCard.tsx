import type { User } from "../types/User";
import { FaMapMarkerAlt, FaUsers, FaBoxOpen } from "react-icons/fa";

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {
  return (
    <div className="bg-beige shadow-lg rounded-lg p-6 w-full flex flex-col md:flex-row items-center md:items-start gap-6 border border-brown transition-all duration-300">
      <div className="flex justify-center md:justify-start">
        <img
          src={user.avatar_url}
          alt={user.login}
          width={80}
          className="rounded-full w-24 h-24 md:w-28 md:h-28 object-cover border-2 border-brown"
        />
      </div>

      <div className="flex-1 text-center md:text-left space-y-2">
        <h2 className="text-2xl font-serif text-brown-dark">
          {user.name || user.login}
        </h2>

        {user.bio && <p className="text-brown italic">{user.bio}</p>}

        {user.location && (
          <div className="flex justify-center md:justify-start items-center gap-2 text-brown-dark">
            <FaMapMarkerAlt />
            <span>{user.location}</span>
          </div>
        )}

        <div className="flex justify-center md:justify-start gap-4 text-brown-dark font-medium flex-wrap">
          <span className="flex items-center gap-1">
            <FaUsers />
            {user.followers} seguidores
          </span>
          <span className="flex items-center gap-1">
            <FaBoxOpen />
            {user.public_repos} repositórios
          </span>
        </div>

        <div className="pt-2">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brown text-white px-4 py-2 rounded hover:bg-brown-dark transition-colors duration-200 text-sm"
          >
            Ver no GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
