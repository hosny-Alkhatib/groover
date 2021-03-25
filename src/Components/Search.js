/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import Style from "../style/search.module.css";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Jdenticon from "react-jdenticon";

const Search = () => {
  const [switcher, setSwitcher] = useState(true);
  const [query, setQuery] = useState("JuiceWRLD");
  const [flag, setFlag] = useState(false);
  const [artistData, setArtistData] = useState({});
  const [trackData, setTrackData] = useState({});
  useEffect(() => {
    switcher ? getDataArtist() : getDataTrack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
  const handleSwitchChange = () => {
    setSwitcher(!switcher);
  };

  const token =
    "BQA-gsqCGsfeg63jYm-SkwXOV9dpTzpiLMzEs4qQqG9M9HVjHfYnRJuLUIE8Wc9LjffOV-_R7soXAh7M4rE40jLvhoDENfqqf2kSwLiyC8rY9hSu2dfRkVjnl_t5uXl3F2Yl0z4FKcCQIQTaW7sc2hC6sMSHQJnkTz_Aws1VkKnTiNZXrA";

  const getDataArtist = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=10&access_token=${token}`
    );
    const data = await res.json();
    // console.log('searching..');
    setArtistData(data);
  };

  const getDataTrack = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10&access_token=${token}`
    );
    const data = await res.json();
    // console.log('searching..');
    setTrackData(data);
  };

  function searchA({ initialArtist = "Juice WRLD" }) {
    const [Artist, setArtist] = useState(() => {
      let localArtist = window.localStorage.getItem("ArtistsHistory");
      if (localArtist) {
        return JSON.parse(localArtist);
      }
      return initialArtist;
    });
  }
  // const changeAhistory = () => {
  //   artistlist.push(query);
  //   console.log(artistlist);
  //   return localStorage.setItem("ArtistsHistory", JSON.stringify(artistlist));
  // };
  // const changeThistory = () => {
  //   tracklist.push(query);
  //   return localStorage.setItem("TraksHistory", JSON.stringify(tracklist));
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    // switcher ? changeAhistory() : changeThistory();
    setFlag(!flag);
    // console.log(`searched: ${query}`);
  };

  const handleValueChange = (e) => {
    setQuery(e.target.value);
    // console.log(query);
  };
  return (
    <Container>
      <div className={Style.search__div}>
        <h1 className={Style.search__title}>Search</h1>
        <form onSubmit={handleSubmit} className={Style.search__form}>
          <Row>
            <Col md={3} sm={12}>
              <div className={Style.search__swtiches}>
                <p className={Style.search__state}>
                  Type:{" "}
                  <span className={Style.search__current}>
                    {switcher ? "Artist" : "Track"}
                  </span>
                </p>
                <Switch
                  onChange={handleSwitchChange}
                  checked={switcher}
                  className="react-switch"
                  uncheckedIcon={``}
                  onColor="#7f5af0"
                  checkedIcon={``}
                  width={60}
                />
              </div>
            </Col>
            <Col md={9} sm={12}>
              <input
                placeholder="Search..."
                className={Style.search__btn}
                value={query}
                onChange={handleValueChange}
              ></input>
            </Col>
          </Row>
        </form>
        <div className={Style.results}>
          {switcher ? (
            artistData.artists &&
            artistData.artists.items.map((res) => (
              <div className={Style.search__results__item}>
                <div className={Style.search__results__item__wrapper}>
                  {res.images[2] ? (
                    <li className={Style.search__results__img}>
                      <img
                        className={Style.search__results__img__self}
                        src={res.images[2].url}
                        alt=""
                      />
                    </li>
                  ) : (
                    <li className={Style.search__results__img}>
                      <Jdenticon size="140" value={res.name} />
                    </li>
                  )}
                  <li className={Style.search__results__name}>{res.name}</li>

                  <li>
                    {res.genres.map((elem) => (
                      <span>
                        {elem}{" "}
                        {res.genres.length === res.genres.indexOf(elem) + 1
                          ? null
                          : ", "}
                      </span>
                    ))}
                  </li>
                  <li>
                    <span className={Style.search__results__spotify}>
                      Spotify:
                    </span>{" "}
                    <a href={res.external_urls.spotify} target="_blank">
                      {res.name}
                    </a>
                  </li>
                  {/* <span>{console.log(res)}</span> */}
                </div>
              </div>
            ))
          ) : (
            <>
              {trackData.tracks &&
                trackData.tracks.items.map((res) => (
                  <div className={Style.search__results__item__track}>
                    <div className={Style.search__results__item__wrapper}>
                      {res.album.images[1] ? (
                        <li className={Style.search__results__img}>
                          <img
                            className={Style.search__results__img__self}
                            src={res.album.images[1].url}
                            alt=""
                            width={150}
                          />
                        </li>
                      ) : (
                        <li className={Style.search__results__img}>
                          <Jdenticon size="140" value={res.name} />
                        </li>
                      )}

                      <li className={Style.search__results__name}>
                        {res.name}
                      </li>
                      <li className={Style.search__results__artists}>
                        {res.artists.map((elem) => (
                          <span>
                            {elem.name}{" "}
                            {res.artists.length ===
                            res.artists.indexOf(elem) + 1
                              ? null
                              : ", "}
                          </span>
                        ))}
                      </li>
                      <li className={Style.search__results__spotify__player}>
                        {console.log(res.uri.split(":"))}
                        <iframe
                          src={`https://open.spotify.com/embed/${
                            res.uri.split(":")[1]
                          }/${res.uri.split(":")[2]}`}
                          width="240"
                          title="Spotify"
                          height="80"
                          style={{ borderRadius: "5px" }}
                          frameborder="0"
                          allowtransparency="true"
                          allow="encrypted-media"
                        ></iframe>
                      </li>
                    </div>
                  </div>
                ))}
              {/* {console.log(trackData)} */}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Search;
