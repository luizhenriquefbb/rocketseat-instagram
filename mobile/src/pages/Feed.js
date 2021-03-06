import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, FlatList, Text } from 'react-native';

import camera from "../../assets/assets/camera.png";
import more from "../../assets/assets/more.png";
import like from "../../assets/assets/like.png";
import comment from "../../assets/assets/comment.png";
import send from "../../assets/assets/send.png";

import api from "../services/api";
import io from 'socket.io-client';

import { local_ip } from "../consts";

const styles = StyleSheet.create({
    headerCamera: {
        marginHorizontal:20,
    },

    container:{
        flex:1, // ter largura/altura toda independente do conteudo
    },

    feedItem:{
        marginTop: 20,

    },

    feedItemHeader:{
        paddingHorizontal:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },

    name:{
        fontSize:14,
        color:'#000',
    },

    place : {
        fontSize:12,
        color:'#666',
        marginTop:2,
    },

    feedImage:{
        width:'100%',
        height:400,
        marginVertical:15,

    },

    feedItemFooter:{
        paddingHorizontal:15,
    },

    actions:{
        flexDirection:'row',
    },

    action:{
        fontSize:15,
        marginRight:12
    },
    likes:{
        marginTop:15,
        fontWeight:'bold',
        color:'#000',
    },
    description:{
        lineHeight:18,
        color:'#000',
    },

    hashtags:{
        color:'#9159C1',
    }


});

export default class Feed extends Component {
    constructor(props){
        super(props);

        this.state = {
            feed : []
        }

    }

    /**
     * @param {String} title
     * @param {String} msg
     */
    testAlert (title='Alert Title', msg='My Alert Msg') {
        Alert.alert(
            title,
            msg,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    /** Navegar para a proxima pagina */
    static navigate = (navigationObj, route) => {
        navigationObj.navigate(route);
    }

    /**
     * Configura o botal no lado superior direito para ter acesso a pagina de "nova postagem"
     */
    static navigationOptions = ({navigation}) => ({
        headerRight : (
            <TouchableOpacity onPress={() => {this.navigate(navigation, "New")}}>
                <Image style={styles.headerCamera} source={camera} />
            </TouchableOpacity>
        )
    });


    async componentDidMount(){
        this.registerToSocket(); // registrar para receber atualizacoes em tempo real sem precisar dar REFRESH
        const response = await api.get('posts');

        this.setState({feed : response.data.posts});

    }

    /** registrar para receber atualizacoes em tempo real sem precisar dar REFRESH */
    registerToSocket = () => {

        const socket = io(`${local_ip}:3333`);

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

    handleLike(evt, post_id){
        evt.preventDefault();

        api.post(`/posts/${post_id}/like`);
    }

    handleComment(evt){
        evt.preventDefault();

        this.testAlert("In development", "");
    }

    handleSend(evt){
        evt.preventDefault();

        this.testAlert("In development", "");
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.feed}
                    keyExtractor={post => post._id}
                    renderItem={({item}) => (
                        <View style={styles.feedItem}>

                            {/* header */}
                            <View style={styles.feedItemHeader}>
                                <View style={styles.userInfo}>
                                    <Text style={styles.name}>{item.author}</Text>
                                    <Text style={styles.place}>{item.place}</Text>
                                </View>
                                <Image source={more} alt="Mais"/>
                            </View>

                            {/* imagem principal */}
                            <Image source={{uri:`${local_ip}:3333/files/${item.image}`}} style={styles.feedImage} alt="Mais"/>

                            {/* footer */}
                            <View style={styles.feedItemFooter}>
                                <View style={styles.actions}>
                                    <TouchableOpacity type="button" style={styles.action} onPress={(evt) => this.handleLike(evt, item._id)}>
                                        <Image source={like} alt="like"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity type="button" style={styles.action} onPress={(evt) => this.handleComment(evt, item._id)}>
                                        <Image source={comment} alt="comment"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity type="button" style={styles.action} onPress={(evt) => this.handleSend(evt, item._id)}>
                                        <Image source={send} alt="send"/>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.likes}>{item.likes} curtidas</Text>

                                <View>
                                    <Text style={styles.description}>{item.description}</Text>

                                    <Text style={styles.hashtags}> {item.hashtags} </Text>
                                </View>

                            </View>

                        </View>
                    )}
                >
                </FlatList>
            </View>
            );
    }
}