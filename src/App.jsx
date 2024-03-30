import axios from 'axios';
import React, { useRef, useState, useEffect, useCallback, CSSProperties } from 'react';
import { Form, Button } from 'react-bootstrap';
import './index.css';
import ClipLoader from "react-spinners/ClipLoader";

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;

const override  = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const fetchImages = useCallback(async () => {
    try {
      if (!searchInput.current.value) {
        return; 
      }
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setImages(data.results);
      setTotalPages(data.total_pages);
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  }, [page]);


  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    fetchImages();
    console.log('page', page);
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    handleSearch(searchInput.current.value); 
  };

  return (
    <div className='container'>
      <h1 className='title'>Hey! Friend search for images here </h1>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='Type something to search...'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>
      
      <div className='images'>
{images.map((image) => (
  <img
    key={image.id}
    src={image.urls.small}
    alt={image.alt_description}
    className='image'
  />
))}
      </div>
      <div className='buttons'>
 
    <Button onClick={() => setPage(page - 1)}>Previous</Button>

    <Button onClick={() => setPage(page + 1)}>Next</Button>
</div>
    </div>
  );

};

export default App;

// features to be added 
// add a loading circle when item is loading 
// expand image size when clicked 


