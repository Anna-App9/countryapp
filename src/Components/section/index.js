import React, { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import { CountryList }from '../home'


const Section = ({ updateContinent }) => {
const [continents, setContinents] = useState([]);
const countries = useContext(CountryList);
console.log(countries);

  //--------------- GET CONTINENTS LIST ---------------

  useEffect(()=>{
    const continentsData = countries.map((a) => a.continent); //continents array
    let continentsList = Array.from(new Set(continentsData));  //remove duplicate continents
    continentsList.sort();                                      //arrange in order
    continentsList.unshift("All Continents");                   //add "All continents" to array
    setContinents(continentsList);   
    // updateContinent("All Continents");
  },[countries])


  const onChangeContinent = (continent) => {
    updateContinent(continent);
  };

  return (
    <>
      <Menu
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
      >
        {continents.map((continent, index) => {
          return (
            <Menu.Item
              style={{ color: "black" }}
              key={index}
              onClick={() => {
                onChangeContinent(continent);
              }}
            >
              <span> {continent}</span>
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
};

export default Section;
