import axios from "axios";
import "./index.css";
import StarRatingComponent from "react-star-rating-component";

const getImage = (id) => axios.get(`/image/${id}`);
const getRatings = (id) => axios.get(`http://localhost:3001/rating/${id}`);
const NameOfTheService = () => {
  const { useState, useEffect } = React;
  //const [rating, setRating] = useState(0);
  const [products, setProducts] = useState([]);
  const [shownProducts, setShownProducts] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  //const [id, setId] = useState(11100);
  //const [url, setUrl] = useState("");

  const id = 11100;
  const fetc = async () => {
    try {
      console.log("image");
      let response = await axios.get(`http://localhost:3001/data/${id}`);
      console.log("khalil", response.data);
      let relatedProducts = response.data;
      setProducts(relatedProducts);
      setShownProducts(relatedProducts.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetc();
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4">
      {shownProducts.map((product) => (
        <div key={product.id}>
          <div class="wrapper">
            <div class="product-img">
              <img src={product.image} />
            </div>
            <div class="product-info">
              <div class="product-text">
                <h1>{product.category}</h1>
                <h2>{product.slogan}</h2>
                <p>{product.description}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <p>
                  <span>{product.default_price}</span>$
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                {/* <button type="button">buy now</button> */}
                {/* <p class="rate">{rating}</p> */}
              </div>
              <div>
                <h2>{product.ratings}</h2>
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={product.ratings}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <svg
        onClick={() => {
          setFirstIndex(firstIndex + 1);
          setShownProducts(products.slice(firstIndex + 1, firstIndex + 4));
        }}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  );
};

export default NameOfTheService;
