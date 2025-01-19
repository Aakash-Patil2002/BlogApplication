import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero/Hero';
import Blog from '../../components/Blog/Blog';
import Header from '../../components/Header/Header';
import Slider from '../../components/Slider/Slider';
import Footer from '../../components/Footer/Footer';

function Home() {
  const [allBlogs,setAllBlogs]=useState('');
  useEffect(()=>{
   axios.get('https://blogapplication-backend-ys6w.onrender.com').then((allBlogs)=>{
    setAllBlogs(allBlogs.data.blogs);
  
   }).catch((error)=>{
    console.log(error);
   })
    
  },[]);
  return (
    <div>
    <Header/>
      <main>
        <Hero/>
        <Slider allBlogs={allBlogs}/>
        <Blog allBlogs={allBlogs}/>
      </main>
    <Footer/>
    </div>
  )
}

export default Home
