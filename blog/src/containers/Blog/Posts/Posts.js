import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
// import {Link} from 'react-router-dom';
class Posts extends Component{
    state={
        posts:[]
        
    
    }
    componentDidMount()
    {
        // console.log('Posts',this.props); 
    axios.get('/posts')
    .then(response=>{
        const posts=response.data.slice(0,4);
        const updatedPosts=posts.map(post=>{
            return {
                ...post,
                author:"neha"
            }
        })
        this.setState({posts:updatedPosts});
        console.log(response);
    })
    .catch(error=>{
        this.setState({error:true});
    });
}
     

    postSelectedHandler=(id)=>{
        // this.setState({selectdPostId:id});
        //push method can be used after a given operation finished????? 
        this.props.history.push({pathname:'/posts/'+id});
        // this.props.history.push('/posts'+id);
    }
render()
{
    let posts=<p style={{textAlign:'centre'}}>Something went wrong</p>
    if(!this.state.error)
    {
        posts=this.state.posts.map(post=>{
            return(
                // <Link to={'/posts'+post.id} key={post.id}>
                <Post 
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={()=>{this.postSelectedHandler(post.id)}}
                />
                // </Link>
            );
        
    })
}
     return(    
     <div>
        <section className="Posts">
         {posts}
         </section>
         {/* Here we can also fetch the url of the current path by  using match property 
         and then we have to fix that everywhere */}
        <Route path={this.props.match.url+'/:id'} exact component={FullPost} />
     </div>
          );
    
}
}
export default Posts;