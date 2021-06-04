import React from "react";
import axios from "axios";
//import "./App.css";

// var data = JSON.stringify({
//   type: "Susuki Gsxr 1000",
//   image:
//     "https://images.caradisiac.com/images/7/5/3/3/177533/S0-essai-suzuki-gsx-r-1000-r-sportive-de-route-597551.jpg",
//   description:
//     "it is a road motorcycle is intended for long roads it is very powerful it can reach up to 299 kilometers per hour, its power is 1000 cc"
// });

export default class NameOfTheService extends React.Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }

  // console.log("service mounted");
  // console.log("hello", this.state.data);
  // var data = JSON.stringify({
  //   type: "Susuki Gsxr 1000",
  //   image:
  //     "https://images.caradisiac.com/images/7/5/3/3/177533/S0-essai-suzuki-gsx-r-1000-r-sportive-de-route-597551.jpg",
  //   description:
  //     "it is a road motorcycle is intended for long roads it is very powerful it can reach up to 299 kilometers per hour, its power is 1000 cc"
  // });

  // var config = {
  //   method: "get",
  //   url: "https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products",
  //   headers: {
  //     Authorization: "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"
  //     // "Content-Type": "application/json"
  //   },
  //   data: data
  // };
  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //     this.setState({
  //       data: response.data
  //     });
  //   })

  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }
  componentDidMount() {
    axios
      .get("https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products", {
        headers: {
          Authorization: "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"
        }
      })
      .then((response) => {
        console.log(response);
        this.setState({
          data: response.data
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.data.map((dat) => {
          return (
            // <div>
            //   <h2>{dat.slogan}</h2>
            //   <h2>{dat.name}</h2>

            //   <h1>{dat.category}</h1>
            //   <p>${dat.default_price}</p>
            //   <p>{dat.description}</p>
            // </div>

            <div class="wrapper">
              <div class="product-img">
                <img src="http://bit.ly/2tMBBTd" height="420" width="327" />
              </div>
              <div class="product-info">
                <div class="product-text">
                  <h1>{dat.category}</h1>
                  <h2>{dat.slogan}</h2>
                  <h2>{dat.name}</h2>
                  <p>{dat.description}</p>
                </div>
                <div class="product-price-btn">
                  <p>
                    <span>{dat.default_price}</span>$
                  </p>
                  <button type="button">buy now</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
