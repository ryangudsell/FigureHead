// imports;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import context

// import components

// import images
import LogoText from "/img/LogoText.png";
import backgroundDesktop from "/img/gundamWeb.jpg";
import whatsNewImage from "/img/NiaWeb.png";
import weeklyDeal from "/img/plushiWeb.png";

const Home = () => {
  // Define state variables
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});

  // like button click
  const handleLikeClick = (productId) => {
    // Toggle the liked state of the product
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [productId]: !prevLikedProducts[productId],
    }));
  };

  // Fetch product data from api call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        const product = response.data;

        const initialLikedProducts = {};
        product.forEach((p) => {
          initialLikedProducts[p._id] = false; // Initialize all products as unliked
        });

        // update the products state with the products data
        setProducts(product);
        setLikedProducts(initialLikedProducts);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProducts();
  }, []);

  // // Handle category selection for buttons on desktop only
  const handleCategoryClick = (category) => {
    // If the clicked category is the same as the selected one, reset it
    if (category === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  // Filter products based on the selected category
  useEffect(() => {
    if (!selectedCategory) {
      // If no category is selected, set filteredProducts to all products
      setFilteredProducts(products);
    } else {
      // make an empty array to sort the desired cards into
      let filteredItems = [];
      // For each product from our api call, do the following
      products.length > 0 &&
        products.map((product) => {
          // for each product from our api call, do the following
          product.categories.map((category) => {
            // for each category that is inside of this product, see if it match the desired category
            if (category === selectedCategory) {
              // if it matches, push to the empty array
              filteredItems.push(product);
            }
          });
        });
      // set the filtered products to match the desired outcome
      setFilteredProducts(filteredItems);
    }
  }, [selectedCategory, products]);

  return (
    <>
      {/* background image - whats new advert - weekly deal advert */}
      {/* background will be position absolute top 0 an left 0 so the logo-hero can be easily positioned*/}

      {/* DESKTOP / WIDER SCREEN ONLY HERO IMAGE  */}
      <div className="background-desktop">
        <img src={backgroundDesktop} alt="Gundam-background" />
      </div>

      <h1 className="header-desktop">COLLECT & CONNECT</h1>

      {/* DESKTOP / WIDER SCREEN ADVERT IMAGES (WHATS NEW) & (WEEKLY DEAL) */}
      {/* can use display flex on advert container if needed and justify spacing "space between" can use margin on wrappers to control spacing better */}
      <div className="advert-container">
        <div className="advert-wrapper">
          <img
            className="whatsNew-image"
            src={whatsNewImage}
            alt="Nia image advert"
          />
          {/* center h3 title text at bottom of Nia advert you may have to use a negative margin to push it slightly below  */}
          {/* using padding and color the background to achieve the same effect as figma. */}
          <h3 className="whats-new-title">WHATS NEW !</h3>
        </div>
        {/* because the plushie image has opacity on right side margin "MAY" need to be used to control spacing */}
        <div className="advert-wrapper">
          <img
            className="weeklyDeal-image"
            src={weeklyDeal}
            alt="plushie deal"
          />
          {/* center h3 title text at bottom of Plushie advert you may have to use a negative margin to push it slightly below  */}
          {/* using padding and color the background to achieve the same effect as figma. */}
          <h3 className="weekly-deal-title">WEEKLY DEAL !</h3>
        </div>
      </div>

      <div className="mobile-advert-wrapper">
        <div className="logo-hero-mobile">
          <img src={LogoText} alt="hero-logo-withText" />
        </div>

        {/* give whats-new-title width of 70% keep left aligned and use padding to create background color.  */}
        <h3 className="whats-new-title-mobile">WHATS NEW !</h3>
        {/* right align text in whats-new-mobile div below. give width of div around 70% */}
        <div className="whats-new-mobile">
          <h2 className="whats-new-info-one">NIA</h2>
          <h2 className="whats-new-info-one">"Xenoblade Chronicles 2"</h2>
          <h3 className="whats-new-info-two">GOOD SMILE COMPANY</h3>
        </div>
        {/* give weekly-deal-title width of around 70% keep left aligned and use padding to create background color.  */}
        <h3 className="weekly-deal-title-mobile">WEEKLY DEAL !</h3>
        {/* right align text in weekly-deal-mobile div below. give width of div around 70% */}
        <div className="weekly-deal-mobile">
          <h2 className="weekly-deal-info-one">$10</h2>
          <h2 className="weekly-deal-info-one">GIFT VOUCHER</h2>
          {/* font for info-two needs to be italic or light italic whichever looks best font size should be low (14 on figma) up to you */}
          <p className="weekly-deal-info-two">
            With your first plushie listing this week!
          </p>
        </div>        
      </div>

      {/* Handle category selection */}
      {/* categories drop down select */}
      {/* mobile only needs to be hidden at tablet length. */}
      <div className="mobile-categories-wrapper">
        <div className="categories-container-mobile">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Categories</option>
            <option value="game">Game</option>
            <option value="movie">Movie</option>
            <option value="tv">Tv</option>
            <option value="anime">Anime</option>
            <option value="cartoon">Cartoon</option>
            <option value="comic">Comic</option>
            <option value="plushie">Plushie</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* START OF BUTTON CATEGORIES FOR DESKTOP!!! */}
      {/* DISPLAY CATEGORY BUTTONS WHEN THE SCREEN IS AT THE DESIRED WIDTH*/}
      {/* category button on tablet to desktop width only */}
      <>
        {/* this should be display none */}
        <h2 className="btn-categories-title">CATEGORIES</h2>
        {/* this should be display none */}
        <div className="category-buttons-grid">
          <div className="button-item">
            <button
              className={selectedCategory === "" ? "selected" : ""}
              onClick={() => handleCategoryClick("")}
            >
              All
            </button>
          </div>

          <div className="button-item">
            <button
              className={selectedCategory === "game" ? "selected" : ""}
              onClick={() => handleCategoryClick("game")}
            >
              Game
            </button>
          </div>

          <div className="button-item">
            <button
              className={selectedCategory === "movie" ? "selected" : ""}
              onClick={() => handleCategoryClick("movie")}
            >
              Movie
            </button>
          </div>

          <div className="button-item">
            <button
              className={selectedCategory === "tv" ? "selected" : ""}
              onClick={() => handleCategoryClick("tv show")}
            >
              Tv Show
            </button>
          </div>

          <div className="button-item">
            <button
              className={selectedCategory === "anime" ? "selected" : ""}
              onClick={() => handleCategoryClick("anime")}
            >
              Anime
            </button>
          </div>

          <div className="button-item">
            <button
              className={selectedCategory === "cartoon" ? "selected" : ""}
              onClick={() => handleCategoryClick("cartoon")}
            >
              Cartoon
            </button>
          </div>

          <div className="button-item">
            <button
              className={selectedCategory === "comic" ? "selected" : ""}
              onClick={() => handleCategoryClick("comic")}
            >
              Comic
            </button>
          </div>

          <div className="button-item">
            <button
              className={selectedCategory === "plushie" ? "selected" : ""}
              onClick={() => handleCategoryClick("plushie")}
            >
              Plushie
            </button>
          </div>

          <div className="button-item">
            <button
              className={selectedCategory === "other" ? "selected" : ""}
              onClick={() => handleCategoryClick("other")}
            >
              Other
            </button>
          </div>
        </div>
      </>

      <p className="showing-item-list">
        SHOWING: {filteredProducts.length} of {filteredProducts.length}
      </p>

      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div className="product-item" key={index}>
            <Link key={product._id} to={`/products/${product._id}`}>
              <img
                src={`http://localhost:4000/public${product.images[0]}`}
                alt="image of product"
              />
              <h3>{product.title}</h3>
              <div className="product-label-grid">
                <div>
                  <p>{product?.categories.join(", ")} </p>
                  <p>${product.price}</p>
                </div>
                <div>
                  <i
                    className={
                      likedProducts[product._id]
                        ? "fa-solid fa-heart"
                        : "fa-regular fa-heart"
                    }
                    onClick={() => handleLikeClick(product._id)}
                  ></i>                
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
