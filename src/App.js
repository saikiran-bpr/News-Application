import React, { useState, useEffect } from 'react'
import './App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=7dffb3778fb8472a58069c0a2a1ffe03&max=10&lang=en`)
    .then(response => response.json()).then(data =>{
      setNewsData(data.articles);
      setLoading(false);
    });
  }, [category]);
  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={(e) => {
        setCategory(e.target.value);
      }}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading ? <p className='loader'>Loading...</p> : <ol>
        {newsData.map((it, index) => {
          return (
            <li key={index}>
              <img className='news-img' src={it.image} alt="image"/>
              <section className='new-title-content-author'>
                <h3 className='news-title'>{it.title}</h3>
                <section className='new-content-author'>
                  <p className='news-description'>{it.description}</p>
                  <p className='news-source'><strong>Source:</strong> {it.source.name}</p>
                </section>
              </section>
            </li>
          )
        })}
      </ol>}
    </div>
  )
}


export default App;
