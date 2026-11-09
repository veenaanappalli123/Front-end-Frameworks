import { Film, Star, Tags, Database } from "lucide-react";
import type { Movie } from "../types";

type StatsBannerProps = {
  movies: Movie[];
  activeGenre: string;
  isLive: boolean;
};

function StatsBanner({
  movies,
  activeGenre,
  isLive,
}: StatsBannerProps) {
  const averageRating =
    movies.length > 0
      ? movies.reduce((total, movie) => total + movie.vote_average, 0) /
        movies.length
      : 0;

  const stats = [
    {
      icon: <Film size={20} />,
      value: movies.length,
      label: "Movies Found",
    },
    {
      icon: <Star size={20} />,
      value: averageRating.toFixed(1),
      label: "Average Rating",
    },
    {
      icon: <Tags size={20} />,
      value: activeGenre,
      label: "Selected Genre",
    },
    {
      icon: <Database size={20} />,
      value: isLive ? "TMDB API" : "Local Data",
      label: "Data Source",
    },
  ];

  return (
    <section className="stats-banner">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <div className="stat-icon">{stat.icon}</div>

          <div className="stat-info">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StatsBanner;
