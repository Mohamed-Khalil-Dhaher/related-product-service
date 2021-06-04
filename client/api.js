const axios = require("axios");

async function getStyles(id) {
  try {
    let response = await axios.get(`http://localhost:3001/data/${id}`);
    let relateds = response.data;
    console.log(relateds);
    // for (let i = 0; i < relateds.length; i++) {
    //   let related = relateds[i];
    //   axios.get(`http://localhost:3001/image/${related.id}`).then(res => console.log(res.data));
    // }
  } catch (error) {
    console.log(error)
  }
}
async function getImage(id) {
  try {
    let response = await axios.get(`http://localhost:3001/image/${id}`);
    console.log("data",response);
  } catch (error) {
    console.log(error)
  }
}
//console.log(getStyles(11001));
console.log(getImage(11002));