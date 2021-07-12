import React, { useEffect, useState } from 'react';
import './Assets/css/App.css';
import axiosInstance from './axios';
import Posts from './Components/posts';


function App() {

  const [appState, setAppState] = useState({
    posts: null,
  })
  useEffect(() => {
    axiosInstance.get('posts/posts/').then((res) => {
			const allPosts = res.data;
      console.log(allPosts);
			setAppState({ posts: allPosts });
    });
  }, [setAppState])
  return (
    <div className="App">
      <h1>Welcome to this free Blog</h1> 
      <Posts posts={appState.posts}/>
    </div>
  );
}

export default App;
