
import React, { Component } from 'react';
import axios from 'axios';
import {Redirect}  from 'react-router-dom';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted:false
    }
    componentDidMount()
    {
        //Here we can check if the user is unauthorized by maitaining its state
        //then this.props.history.replace('/posts');
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        axios.post('/posts', data)
            .then(response => {
                console.log(response);
                this.props.history.push('posts');
                // this.setState({submitted:true});
            });
        
    }

    // The difference between redirect and push is that  in push the stack is maintained
    // and you can go to te previous page whereas while in this.props.history.replace and </Redirect> 
    // we cannot go to the previous state.
    render () {
        
        // let redirect = null;
        // if (this.state.submitted) {
        //     redirect = <Redirect to="/posts" />;
        // }
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
                 	
            </div>
        );
    }
}

export default NewPost;