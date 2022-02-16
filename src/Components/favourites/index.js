import React, { useEffect, useState, createContext } from "react";
import { Layout, message, Card, Col, Row, Button } from "antd";
import Head from "../header";

  //--------------- USECONTEXT FAVITEMS ---------------

export const FavContextcount = createContext(0);

const Favourites = () => {
  const [favouriteCountry, setFavouritecountry] = useState([]);
  const [favCount, setFavCount] = useState(0);


  //--------------- GET FAVOURITES COUNT ---------------

  useEffect(() => {
    let favCountry = localStorage.getItem("FavItem");
    if(favCountry){                                         //if Favitems is available
    let favcountries = JSON.parse(favCountry);
    if (favcountries) {
      setFavouritecountry(favcountries);
    } else {
      setFavouritecountry("");
    }
    let favCountryLength = favcountries.length;
    setFavCount(favCountryLength);
    console.log(favCountryLength);
  }else{                                                 //if Favitems is empty, set favcount as 0
    setFavCount(0);
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
      <FavContextcount.Provider value={favCount}>
      <Layout>
        <Head />
        <h1 style={{ color: "#0b52bb", textDecoration: "underline" }}>
          Favourite Countries
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
      </FavContextcount.Provider>

    </>
  );
};

export default Favourites;
