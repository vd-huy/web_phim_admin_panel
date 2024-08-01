import axios from "axios"

export const fetchAllServer = async (id)=>{
    return await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/api/episode/${id}/server`,
      })
}

export const fetchEpisodeByMovieIdAndSlugServer = async (movieId,slugServer)=>{
    const episode = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/api/episode/${movieId}/${slugServer}`,
      });

      return episode;
}
