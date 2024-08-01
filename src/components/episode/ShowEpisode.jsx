import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useParams } from 'react-router-dom';
import { fetchAllServer, fetchEpisodeByMovieIdAndSlugServer } from '../../apis/episodeApi';
import Episode from './Episode';

const fetchAllDataEpisode = async (id, value) => {
  try {
    const serversResponse = await fetchAllServer(id);
    const servers = serversResponse.data;

    if (servers.length > 0 && value === "") {
      value = servers[0].slugServer;
    }

    let episodesData = [];
    
    if (value) {
      const episodesResponse = await fetchEpisodeByMovieIdAndSlugServer(id, value);
      episodesData = episodesResponse.data;
    }

    return { servers, episodesData, value };
  } catch (error) {
    console.error('Error fetching data', error);
  }
};


const ShowEpisode = () => {

    const [server,setServer] = useState([])

    const [value, setValue] = useState("");

    const [dataEpisode, setDataEpisode] = useState("");

    const {id} = useParams();

    useEffect(() => {
      fetchAllDataEpisode(id, value)
        .then(({ servers, episodesData, value }) => {
          setServer(servers);
          setValue(value);
          setDataEpisode(
            episodesData
              .map((ep) => `${ep.episode}|${ep.linkEpisode}`)
              .join("\n")
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }, [id]);


    const handleChange = async (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      if (value) {
        fetchEpisodeByMovieIdAndSlugServer(id, value)
          .then(response => {
            const episodesData = response.data?.map(ep => `${ep.episode}|${ep.linkEpisode}`).join("\n") || "";
            setDataEpisode(episodesData);
          })
          .catch(err => {
            console.error(err);
            setDataEpisode("");
          });
      }
    }, [value]);

    return (
      <div className="w-[90%] m-auto">
        <Box sx={{ width: "100%", typography: "body1", margin: "10px 0" }}>
          {server.length > 0 ? (
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {server.map((sv) => {
                    return (
                      <Tab
                        key={sv.slugServer}
                        label={sv.server}
                        value={sv.slugServer}
                      />
                    );
                  })}
                </TabList>
              </Box>

              {server.map((data, index) => {
                return (
                  <TabPanel key={index} value={data.slugServer}>
                    <Episode sv={data} dataEpisode={dataEpisode} />
                  </TabPanel>
                );
              })}
            </TabContext>
          ) : (
            <Episode sv={{ server: "", slugServer: "" }} dataEpisode={[]} />
          )}
        </Box>
      </div>
    );
}

export default ShowEpisode
