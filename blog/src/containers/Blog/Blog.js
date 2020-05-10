import React, { Component,Suspense } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import { Route, NavLink,Switch,Redirect } from 'react-router-dom';


// const NewPost= React.lazy(()=>import('./NewPost/NewPost'));
//We can  use this loading only in client side render web applications
class Blog extends Component {
    // componentDidMount() {
    //      console.log('New Blog',this.props);
    // }
    state={
        auth:true
    }
     render() {
        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            {/* We can use Link also but if we want to highlight the Link
                         which is currently active we can  use a NavLink.
                         It will reflect active in our css.  

                             We can change the active property by giving any user defined name
                             with the help of and we can also give the inline styling with activeStyle
                             <li><NavLink
                                to="/"
                                activeClassName="my-active"
                                activeStyle={{color:'blue'}}
                                exact>
                                Home</NavLink></li> */}
                            <li><NavLink to="/posts" exact>Home</NavLink></li>
                            <li><NavLink to={{
                                //For realative path
                                //pathname:this.props.match.url+'/new-post',
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>


                {/* <Route path="/" exact render={()=><h1>Home</h1>}/>
                <Route path="/"  render={()=><h1>New Post</h1>}/> */}
                {/* The added functionality of Switch is that it will only render the first matched <Route/> child. 
                This is really handy when we have nested routes */}
                {/* Redirect is ued for redirecting a page and also we can use its "from" property only inside
                a switch statement. */}
                {/* If the user is unauthenticated then we can apply for a check(using ternary conditions) 
                and if it so then we should not route him. */}
                {/* For handling unknown request we will use 
                <Route render={()=><h1>Not Found</h1>}></Route> */}
   
                    <Switch>
                    {/* {this.state.auth?<Route path="/new-post" exact component={AsyncNewPost} />:null} */}
                    {/* {this.state.auth?(<Suspense fallBack={<div>Loading...</div>}>
                    <NewPost />
                    </Suspense>):null} */}
                     <Route path="/posts"  component={Posts} />
                    {/* <Redirect from="/" to="/posts"/> */}
                    </Switch> 
            </div> 
        );
            }
}

export default Blog;
