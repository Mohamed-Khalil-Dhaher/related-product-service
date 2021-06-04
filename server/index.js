const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const axios = require("axios");
const port = process.env.PORT || 3001;

const instance = axios.create({
  baseURL: "https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc",
  headers: {
    Authorization: "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"
  }
});

const ratingAverage = (ratingObject) => {
  let som = 0;
  let somval = 0;
  let ave = 0;
  // console.log(e.ratings)
  for (var keys in ratingObject) {
    som = som + Number(keys) * Number(ratingObject[keys]);
    somval = somval + Number(ratingObject[keys]);
  }

  ave = som / somval;
  // console.log(e.id,ave);
  return ave;
};
async function getRelatedProducts(id) {
  try {
    let response = await instance.get(`/products/${id}/related`);
    let relatedProductIds = response.data;
    console.log(relatedProductIds);
    let responses = await Promise.all(
      relatedProductIds.map((id) => instance.get(`/products/${id}`))
    );
    //console.log(responses);
    let relatedProduct = responses.map((response) => response.data);
    // console.log(relatedProduct);
    let images = await Promise.all(
      relatedProductIds.map((id) => instance.get(`/products/${id}/styles`))
    );
    // console.log(images);
    let ratings = await Promise.all(
      relatedProductIds.map((id) =>
        instance.get(`/reviews/meta?product_id=${id}`)
      )
    );
    // console.log(imagesResponses);
    let relatedProductsImages = images.map((element, index) => ({
      ...relatedProduct[index],
      image: element.data.results[0].photos[0].thumbnail_url
    }));
    // console.log(relatedProductsImages);

    let relatedProductsRatings = ratings.map((element, index) => ({
      ...relatedProductsImages[index],
      ratings: ratingAverage(element.data.ratings)
    }));
    // console.log(relatedProductsRatings);
    return relatedProductsRatings;
  } catch (error) {
    console.log(error);
  }
}

app.get("/data/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await getRelatedProducts(req.params.id);
  console.log(data);
  // res.send("");
  res.send(data);
});

// app.get("/rating/:id", async (req, res) => {
//   try {
//     axios
//       .get(
//         `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta?product_id=${req.params.id}`,
//         {
//           headers: {
//             Authorization: "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"
//           }
//         }
//       )
//       .then((response) => {
//         res.send(response.data);
//       })
//       .catch((error) => console.log(error));
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/image/:id", async (req, res) => {
//   try {
//     axios
//       .get(
//         `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.id}/styles`,
//         {
//           headers: {
//             Authorization: "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"
//           }
//         }
//       )
//       .then((response) =>
//         res.send(response.data.results[0].photos[0].thumbnail_url)
//       )
//       .catch((error) => console.log(error));
//   } catch (error) {
//     console.log(error);
//   }
// });
//
//app.use;
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
