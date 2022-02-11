import React, { useEffect, useState } from "react";
import { Layout, message, Card, Col, Row, Button } from "antd";
import Head from "../header";

const Favourites = () => {
  const [favouriteCountry, setFavouritecountry] = useState([]);

  //--------------- GET FAVOURITES COUNT ---------------

  useEffect(() => {
    let favCountry = localStorage.getItem("FavItem");
    let favcountries = JSON.parse(favCountry);
    if (favcountries) {
      setFavouritecountry(favcountries);
    } else {
      setFavouritecountry("");
    }
  }, []);
  console.log(favouriteCountry);
  const _ = require("lodash");

  //--------------- REMOVE FROM FAVOURITES ---------------

  const removeFromFav = (fc) => {
    console.log(fc.name);
    let favItems = JSON.parse(localStorage.getItem("FavItem"));
    let index;
    index = _.findIndex(favItems, fc);
    favItems.splice(index, 1);
    localStorage.setItem("FavItem", JSON.stringify(favItems));
    let removedFav = localStorage.getItem("FavItem");
    setFavouritecountry(JSON.parse(removedFav));
    message.success("You Fav Country is removed!!");
  };
  return (
    <>
      <Layout>
        <Head />
        <h1 style={{ color: "#0b52bb", textDecoration: "underline" }}>
          Favourites
        </h1>
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          {favouriteCountry.length > 0 ? (
            <Row gutter={20}>
              {favouriteCountry?.map((fc, index) => {
                return (
                  <Col span={6} key={index}>
                    <Card title={fc.name} style={{ width: 440 }}>
                      <p>Currency: {fc.currency}</p>
                      <p>Continent: {fc.continent}</p>
                      <Button
                        type="danger"
                        onClick={() => {
                          removeFromFav(fc);
                        }}
                      >
                        Remove
                      </Button>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <p style={{ color: "#0b52bb", textAlign: "center" }}>
              Your Favourite list is empty, please add countries here!{" "}
            </p>//text to display if favourite items is empty
          ) 
          }
        </div>
      </Layout>
    </>
  );
};

export default Favourites;
