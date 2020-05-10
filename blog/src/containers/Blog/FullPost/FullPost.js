import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

    state={
        loadedPost:null
    }
    componentDidMount()
    {
        // It can be used to extract the values of search and hash
        // const query=new URLSearchParams(this.props.location.search)
        // for(let param of query.entries())
        // {
        //     console.log(param);
        // }
    this.loadData();   
    }
    // componentDidMount will not render if we click on other post while we are on a post.
        // Though its post id changes.
        // To handle this we will use componentDidUpdate.
        // The router will not mount the component again.It will aonly fix the changes.
        // So for this we have to use componentDidUpdate
    componentDidUpdate()
    {
        this.loadData();    
    }
    loadData()
        {
    
            if(this.props.match.params.id)
            {
                if(!this.state.loadedPost||(this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id))
                {
                    axios.get('https://jsonplaceholder.typicode.com/posts/'+this.props.match.params.id)
                    .then(response=>{
                        return(this.setState({loadedPost:response.data}));
                    })
                }
            }
        }
 
    deletePostHandler=()=>{
        axios.delete('/posts/'+this.props.match.params.id)
                .then(response=>{
                    console.log(response);
                })

    }
    render () {
        let post = <p style={{textAlign:"center"}}>Please select a Post!</p>;
        if(this.props.match.params.id)
        {
            let post = <p style={{textAlign:"center"}}>Loading!</p>;   
        }
        if(this.state.loadedPost)
        {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
       
        return post;
    }
}

export default FullPost;