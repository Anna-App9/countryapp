import React, { useState, useEffect, createContext } from "react";
import Head from "../header";
import Section from "../section";
import {
  Layout,
  Menu,
  Card,
  Col,
  Row,
  Modal,
  Button,
  Pagination,
  message,
} from "antd";
import axios from "axios";
import _ from "lodash";

const { Sider, Content } = Layout;

export const FavContextcount = createContext(0);
export const CountryList = createContext();

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [activeContinent, setActiveContinent] = useState();
  const [activeCountries, setActiveCountries] = useState([0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pageSize = 4; //countries per page
  const pageCount = activeCountries
    ? Math.ceil(activeCountries.length / pageSize)
    : 0;
  const [currentPage, setCurrentPage] = useState(1); //stores page 1 default
  const [showCountryData, setShowCountryData] = useState([]);
  const [maxIndex, setMaxindex] = useState();
  const [minIndex, setMinindex] = useState();
  const [paginatedCountries, setpaginatedCountries] = useState([]);
  const pages = _.range(1, pageCount + 1);

  //--------------- COUNTRY DETAILS ---------------

  useEffect(() => {
    axios({
      method: "get",
      url:
        "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson",
    }).then((response) => {
      setCountries(response.data.countries);
    });
  }, []);

  useEffect(() => {
    if (activeContinent != "All Continents") {
      filterCountry(activeContinent);
    }
  }, [activeContinent]);
  useEffect(() => {
    if (activeContinent == "All Continents") {
      setActiveCountries(countries);
    }
  });

  //--------------- FILTER COUNTRIES ---------------

  const filterCountry = (activeContinent) => {
    if (activeContinent !== "All Continents") {
      let activeCountriesData = countries.filter(
        (c) => c.continent === activeContinent
      );
      setActiveCountries(activeCountriesData);
      setCurrentPage(1);
      setpaginatedCountries(
        _(activeCountriesData)
          .slice(0)
          .take(pageSize)
          .value()
      );
    } else {
      setActiveCountries(countries);
      setpaginatedCountries(
        _(countries)
          .slice(0)
          .take(pageSize)
          .value()
      );
    }
  };

  //--------------- COUNTRY DETAILS MODAL ---------------

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const showModal = (country) => {
    setShowCountryData(country);
    setIsModalVisible(true);
  };

  //--------------- PAGINATION ---------------

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    let min = (pageNo - 1) * pageSize;
    setMinindex(min);
    let max = pageNo * pageSize;
    setMaxindex(max);
    const startI = (pageNo - 1) * pageSize;
    const paginated = _(activeCountries)
      .slice(startI)
      .take(pageSize)
      .value();
    setpaginatedCountries(paginated);
  };

  //--------------- ADD FAV COUNTRIES ---------------

  const addFav = (country) => {
    message.success("Your Fav Country is added");
    let newFavItem = {
      name: country.altName,
      currency: country.currencyName,
      continent: country.continent,
    };
    // let oldFav = localStorage.getItem("FavItem");
    // if (!oldFav) {
    //   localStorage.setItem("FavItem", JSON.stringify([newFavItem]));
    // } else {
    //   let favArray = JSON.parse(oldFav);
    //   favArray.push(newFavItem);
    //   localStorage.setItem("FavItem", JSON.stringify(favArray));
    // }
  };

  return (
    <div>
      <CountryList.Provider value={countries}>
        <Layout>
          <Head />
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Section
                  updateContinent={setActiveContinent}
                  countries={countries}
                />
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <h1 style={{ color: "#0b52bb", textDecoration: "underline" }}>
                COUNTRIES
              </h1>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <div className="row">
                  <div style={{ background: "#ECECEC", padding: "30px" }}>
                    <Row gutter={16}>
                      {paginatedCountries?.map((country, index) => {
                        return (
                          <div key={index}>
                            <Col span={12}>
                              <Card
                                title={country.altName}
                                style={{ width: 440 }}
                              >
                                <p>Currency: {country.currencyName}</p>
                                <p>Continent: {country.continent}</p>
                                <Button
                                  type="primary"
                                  onClick={() => showModal(country)}
                                >
                                  Read More
                                </Button>
                                <Button
                                  type="danger"
                                  onClick={() => addFav(country)}
                                >
                                  Add Fav+
                                </Button>
                              </Card>
                            </Col>
                          </div>
                        );
                      })}
                    </Row>

                    <Modal
                      title={showCountryData.altName}
                      visible={isModalVisible}
                      onOk={handleOk}
                      okText="Done"
                      closable={false}
                      cancelButtonProps={{ style: { display: "none" } }}
                    >
                      <p>Continent: {showCountryData.continent}</p>
                      <p>
                        Currency: {showCountryData.currencyName} (
                        {showCountryData.currencySymbol})
                      </p>
                      <p>Currency Format: {showCountryData.currencyFormat}</p>
                      <p>Distance Unit: {showCountryData.distanceUnits}</p>
                    </Modal>
                  </div>
                </div>

                {activeContinent ? (
                  <Pagination
                    current={currentPage}
                    defaultCurrent={1}
                    defaultPageSize={pageSize} //default size of page
                    total={activeCountries.length} //total countries
                    onChange={pagination}
                  >
                    {pages.map(
                      (page, index) =>
                        index >= minIndex &&
                        index < maxIndex && (
                          <>
                            <p>{page}</p>
                          </>
                        )
                    )}
                  </Pagination>
                ) : (
                  <p>
                    Please select your continents and enjoy reading about your
                    countries with us!
                  </p>
                )}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </CountryList.Provider>
    </div>
  );
};

export default Home;
