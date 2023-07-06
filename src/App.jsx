import { useState, useEffect } from "react";
import "./App.css";
import { Formik, Form } from "formik";
import Input from "./components/Input";
import Card from "./components/Card";
import styled from "styled-components";

import { useSelector } from "react-redux";

import Button from "./components/Button";

const Container = styled.div`
  display: flex;
  justify-content: center;
  heigth: 100%;
  align-items: center;
  flex-ddirection: column;
`;
const Section = styled.section`
  background-color: #eeee;
  border-top: solid 2px palevioletred padding 20px 25px;
  width: 800px;
  box-shadow: 0px 2px 3px rgb(0, 0, 0, 0.3);
`;

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [favShows, setFavShows] = useState(false);

  const favList = useSelector((state) => state.favoriteShows.value);

  const filteredItems = data.filter((item) => {
    return item.name.toLowerCase().includes(query.toLocaleLowerCase());
  });

  const exportData = () => {
    let allFavs = favList.map((show) =>
      data.find((source) => source.id === show.id)
    );
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(allFavs)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  useEffect(() => {
    fetch("http://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Container>
        <Section>
          <h1>My TV Shows</h1>
          <Formik initialValues={{ search: "" }}>
            <Form>
              <Input
                name="search"
                label="Search Movie:"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form>
          </Formik>
          <Button onClick={() => setFavShows(!favShows)}>
            {favShows ? "Show All" : "Show Favorites"}
          </Button>

          {favShows ? (
            <div>
              <h3>Favorite Shows:</h3>
              <div>
                {favList
                  ? favList.map((item) => (
                      <Card
                        key={item.id}
                        details={data.find((tvShow) => tvShow.id === item.id)}
                      ></Card>
                    ))
                  : "Add favorites to see them on this list"}
              </div>
            </div>
          ) : (
            <div>
              <h3>All Shows:</h3>
              <div>
                {filteredItems
                  ? filteredItems.map((item) => (
                      <Card key={item.id} details={item}></Card>
                    ))
                  : "Loading..."}
              </div>
            </div>
          )}

          {favList ? (
            <Button onClick={exportData}>Export Favorite Shows</Button>
          ) : null}
        </Section>
      </Container>
    </>
  );
}

export default App;
