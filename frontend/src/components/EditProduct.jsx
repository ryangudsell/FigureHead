import { useState, useEffect } from "react";
import axios from "axios";
import { useProductsContext } from "../hooks/useProductsContext";

const EditProduct = (props) => {

  const {dispatch} = useProductsContext()

  const product = props.product
  // Form input state variables
  const [editTitle, setEditTitle] = useState(product.title);
  const [editDesc, setEditDesc] = useState(product.desc);
  const [editPrice, setEditPrice] = useState(product.price);
  const [editImages, setEditImages] = useState(product.images);

  const [editSelectedCategories, setEditSelectedCategories] = useState([]);

  const [error, setError] = useState(null);

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;

    if (e.target.checked) {
      setEditSelectedCategories((prevCategories) => [...prevCategories, categoryName]);
    } else {
      setEditSelectedCategories((prevCategories) => prevCategories.filter((category) => category !== categoryName)
      );
    }
  }

  const handleCancel = () => {
    setEditTitle(product.title)
    setEditDesc(product.desc)
    setEditPrice(product.price)
    setEditImages(product.images)
    setEditSelectedCategories(product.categories)

    props.onFormSubmit();
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Error catch for Images and categories
    // if (editImages.length === 0) {
    //   setError("Must have images")
    //   return
    // }
    if (editSelectedCategories.length === 0) {
      setError("Must have at least 1 category selected")
      return
    }
    // If passed all checks, remove any current errors on screen
    setError(null)

    const updatedProduct = {
      title: editTitle,
      desc: editDesc,
      price: editPrice,
      images: editImages,
      categories: editSelectedCategories
    }

    try {
      const response = await axios.patch(`http://localhost:4000/api/products/${product._id}`, updatedProduct)

      const updatedData = response.data
      
      if (response.status === 200) {
        dispatch({type:"UPDATE_PRODUCT", payload: updatedData})
      }
    } catch (error) {
      console.error(error)
      setError(error.message)
    }

    props.onFormSubmit();
  }

  return (
    <div id="add-product-modal" className="add-edit-modals">
      <form>
        <h2>Edit "{product.title}"</h2>
        <div className="input-div">
          <label>Name *</label>
          <input type="text" placeholder="Edit Name Here"
          onChange={(e) => setEditTitle(e.target.value)}
          value={editTitle} required />
        </div>
        <div className="input-div">
          <label>Description</label>
          <p><textarea rows="10" placeholder="Edit Description Here"
          onChange={(e) => setEditDesc(e.target.value)}
          value={editDesc} >
          </textarea></p>
        </div>
        <div className="input-div">
          <label>Price *</label>
          <input type="text" placeholder="$0.00" 
          onChange={(e) => setEditPrice(e.target.value)}
          value={editPrice} required />
        </div>
        {/* <div>
          <label>Images (Up to three) *</label>
          <input 
          type="file" 
          accept="image/*"
          multiple
          onChange={(e) => setEditImages([...e.target.files])}/>
        </div> */}
        <div>
          <label>Categories *</label>
          <div className="category-flex">

            <div>
              <input type="checkbox" name="category" value="anime"
              onChange={handleCategoryChange}
              checked={editSelectedCategories.includes("anime")} /><label>Anime</label>
            </div>

            <div>
              <input type="checkbox" name="category" value="cartoon"
              onChange={handleCategoryChange}
              checked={editSelectedCategories.includes("cartoon")} /><label>Cartoon</label>
            </div>

            <div>
              <input type="checkbox" name="category" value="comic"
              onChange={handleCategoryChange}
              checked={editSelectedCategories.includes("comic")} /><label>Comic</label>
            </div>
            
            <div>
              <input type="checkbox" name="category" value="game"
              onChange={handleCategoryChange}
              checked={editSelectedCategories.includes("game")} /><label>Game</label>
            </div>

            <div>
              <input type="checkbox" name="category" value="movie"
              onChange={handleCategoryChange}
              checked={editSelectedCategories.includes("movie")} /><label>Movie</label>
            </div>

            <div>
              <input type="checkbox" name="category" value="tv"
              onChange={handleCategoryChange}
              checked={editSelectedCategories.includes("tv")} /><label>TV</label>
            </div>

          </div>
        </div>
        <div>
          <button className="form-button cancel" 
          type="button" onClick={handleCancel}>CANCEL</button>
          <button className="form-button submit" 
          type="button" onClick={handleSubmit}>SUBMIT</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default EditProduct
