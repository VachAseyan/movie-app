export interface Movie {
  id: number;
  title: string;
  poster_path?: string | null;
  vote_average?: number;
  release_date?: string;
}

export interface FavoriteMovie {
  id: number;
  title: string;
}


