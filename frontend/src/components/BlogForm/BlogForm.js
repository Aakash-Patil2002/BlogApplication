import React, { useState } from "react";
import style from "./BlogForm.module.css";
import axios from 'axios';
const BlogForm = ({newblog,setNewblog}) => {
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [category,setCategory]=useState('');
  const [tags,setTags]=useState('');
  const [image,setImage]=useState(null);
   
  const [preview, setPreview] = useState(null);

  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate a preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token=localStorage.getItem('token');
    
    let data=new FormData();
    data.append('token',token);
    data.append('title',title);
    data.append('content',content);
    data.append('category',category);
    data.append('tags',tags);
    data.append('image',image);
    axios.post("http://localhost:5001/addblog",data,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    }).then((result) => {
      if(result){
        setNewblog(!newblog);
        window.alert("Blog added successfully");
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div>
    
      <h2 className={style.title}>Create a Blog Post</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="title" className={style.label}>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className={style.input}
          required
        />

        <label htmlFor="content" className={style.label}>Content</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          className={style.textarea}
          required
        />

        <label htmlFor="category" className={style.label}>Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className={style.input}
        />

        <label htmlFor="tags" className={style.label}>Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={tags}
          onChange={(e)=>setTags(e.target.value)}
          className={style.input}
        />

        <label htmlFor="image" className={style.label}>Image</label>
        {preview && (
          <div className={style.previewContainer}>
            <img src={preview} alt="Preview" className={style.preview} />
          </div>
        )}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className={style.input}
        />
        

        <button type="submit" className={style.button}>Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
