import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Blog = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        
        axios.get('http://localhost/vinfast/vinfast-backend/api/post/readPost.php')
                .then(res => {
                    const persons = res.data;
                    console.log(persons)
                    setPosts( persons.data);
                })
                .catch(error => console.log(error));              
    }, [])

    return (
        <div className="blog">
            <div className="container">
                <div className='row'>
                    {
                        posts ? posts.map((item, index) => (
                            <Link className='l-4 post' to={`/blog/${item.id}`} key={index}>
                                <div className='test'>
                                    <img className="post__image" src={item.image} alt="" />
                                    <h5 className="post__title">{item.title}</h5>
                                    <div className="post__excerpt">{item.excerpt}</div>
                                </div>
                            </Link>
                        )) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Blog
