import React, { Component } from 'react';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

import api from '../services/api';
import io from 'socket.io-client';


export default class Feed extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            feed : []
        }
    
    }

    handleLike(evt, post_id){
        evt.preventDefault();

        api.post(`/posts/${post_id}/like`);
    }

    async componentDidMount(){
        this.registerToSocket();
        const repsonse = await api.get('posts');

        this.setState({feed : repsonse.data.posts});

    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        // post ou like ?
        socket.on('post', newPost => {
            // adicionar novo post no começo 
            this.setState( { feed : [newPost, ...this.state.feed] } );
        })
        socket.on('like', likedPost => {
            // atualizar o numero de likes
            this.setState(
                {
                    feed: this.state.feed.map(post => {
                        if (post._id === likedPost._id){
                            post.likes = likedPost.likes;
                        }
                        
                        return post;
                    })
                }
            )
        })
    }

    render() {
        console.log('this.state', this.state);
        return (
            <div className="">

                <section id="post-list">
                    {this.state.feed.map(post => (
                        <article key={post._id}>
                            <header>
                                <div className="user-info">
                                    <span>{post.author}</span>
                                    <span className="place">{post.place}</span>

                                </div>
                                <img src={more} alt="Mais"/>
                            </header>

                            <img src={`http://localhost:3333/files/${post.image}`} alt=""/>

                            <footer>
                                <div className="actions">
                                    <button type="button" onClick={(evt) => this.handleLike(evt, post._id)}>
                                        <img src={like} alt="like"/>
                                    </button>
                                    <img src={comment} alt="comment"/>
                                    <img src={send} alt="send"/>
                                </div>

                                <strong>{post.likes} curtidas</strong>
                                <p>
                                    {post.description}

                                    <span>
                                        {post.hashtags}
                                    </span>
                                </p>
                            </footer>
                        </article>

                    ))}
                </section>
            </div>
        );
    }
}   