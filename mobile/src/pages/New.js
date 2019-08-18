import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import ImagePicker from "react-native-image-picker";
import api from "../services/api";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});


export default class New extends Component {

    constructor(props){
        super(props);

        this.state = {
            image       : null,
            preview     : null,
            author      : "",
            place       : "",
            description : "",
            hashtags    : "",
        }

        window._new = this;

    }

    static navigationOptions = {
        headerTitle:'new Post',
    }


    handleSubmit = async () => {

        // como nao vamos mandar json e sim um muilti-data-form por causa da imagem, precisamos fazer esse parse
        const data = new FormData();

        data.append('image'       , this.state.image       );
        data.append('author'      , this.state.author      );
        data.append('place'       , this.state.place       );
        data.append('description' , this.state.description );
        data.append('hashtags'    , this.state.hashtags    );


        await api.post('posts', data);

        this.props.navigation.navigate('Feed');
    }

    /**
     * Upoad de nova imagem
     */
    handleSelectImage = () => {
        ImagePicker.showImagePicker({
            title:'Selecione a Imagem',
        }, upload => {
            if(upload.error){
                console.log("Error no upload");

            } else if(upload.didCancel){
                console.log("Upload cancelado");
            } else {
                const preview = {
                    uri : `data:image/jpeg;base64,${upload.data}`,
                }

                let prefix;
                let ext;

                if(upload.fileName){
                    [prefix, ext] = upload.fileName.split('.');
                    console.log('prefix', prefix);
                    console.log('ext', ext);
                    ext = (ext && ext.toLowerCase().trim()) === 'heic' ? 'jgp' : ext;
                }
                else {
                    prefix = new Date().getTime();
                    ext = 'jpg';
                }

                const image = {
                    uri : upload.uri,
                    type : upload.type,
                    name : `${prefix}.${ext}`,
                }
                this.setState({preview, image})
            }
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        return (
            <View>
                {/* <form id="new-post" onSubmit={this.handleSubmit} style={styles.newPost}> */}
                    <TouchableOpacity type="submit" onPress={() => this.handleSelectImage()} style={styles.selectButton}>
                        <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
                    </TouchableOpacity>

                    {this.state.preview && <Image style={styles.preview} source={this.state.preview} />}

                    <TextInput autoCorrect={false} autoCapitalize='none'  type="text" name="author"      id="" placeholder="Autor do post"     onChangeText={author      => this.setState({author})}      value={this.state.author}      />
                    <TextInput autoCorrect={false} autoCapitalize='none'  type="text" name="place"       id="" placeholder="Local do post"     onChangeText={place       => this.setState({place})}       value={this.state.place}       />
                    <TextInput autoCorrect={false} autoCapitalize='none'  type="text" name="description" id="" placeholder="Descrição do post" onChangeText={description => this.setState({description})} value={this.state.description} />
                    <TextInput autoCorrect={false} autoCapitalize='none'  type="text" name="hashtags"    id="" placeholder="Hashtags do post"  onChangeText={hashtags    => this.setState({hashtags})}    value={this.state.hashtags}    />

                    <TouchableOpacity type="submit" onPress={() => this.handleSubmit()} style={styles.shareButton}>
                        <Text style={styles.shareButtonText}>Compartilhar</Text>
                    </TouchableOpacity>
                {/* </form> */}
            </View>
        );
    }
}