import React from "react";
import numeral from "numeral";
import { Popup, GeoJSON } from "react-leaflet";
import { countries } from "./countries";

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

function geoJsonFeature(color) {
  return {
    fillColor: color,
    fillOpacity: 0.6,
    stroke: true,
    color: "green",
    weight: 1,
  };
}

function keyid() {
  return Date.now();
}

function getColor(count) {
  const factor = 10;
  const region = count/factor;

  return   region > 500 ? '#b10026' :
           region > 300 ? '#e31a1c' :
           region > 200 ? '#fc4e2a' :
           region > 100 ? '#fd8d3c' :
           region > 50 ? '#feb24c' :
           region > 20 ? '#fed976' :
           region > 10 ? '#ffeda0' :
                         '#ffffcc';
}

export const showDataOnMap = (data, casesType = "cases") => {
  const geo =  data.map((country) => {
    const match = countries.features.filter(
      (feature) => feature.id === country.countryInfo.iso3
    );

    let color = getColor(country.activePerOneMillion);

    return (
      <>
      <GeoJSON
        key={keyid}
        data={match}
        style={geoJsonFeature.bind(this, color)}
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            ></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </GeoJSON>
      </>
    );
  });

  return(
  <div className="holder">
    <div>
      {geo}
    </div>
  <div className="scaleinfo legend">
        <i style={{ background: "#ffffcc" }}></i>0 - 10 <br></br>
        <i style={{ background: "#ffeda0" }}></i>10 - 20 <br></br>
        <i style={{ background: "#fed976" }}></i>20 - 50 <br></br>
        <i style={{ background: "#feb24c" }}></i>50 - 100 <br></br>
        <i style={{ background: "#fd8d3c" }}></i>100 - 200 <br></br>
        <i style={{ background: "#fc4e2a" }}></i>200 - 300 <br></br>
        <i style={{ background: "#e31a1c" }}></i>300 - 500 <br></br>
        <i style={{ background: "#b10026" }}></i>500+ <br></br>
    </div>
  </div>
  );

};
