import React, { Component } from 'react';
import api from '../services/api';

export default class New extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            image       : null,
            author      : "",
            place       : "",
            description : "",
            hashtags    : "",
        }
        
    }

    handleSubmit = async e => {
        e.preventDefault();

        // como nao vamos mandar json e sim um muilti-data-form por causa da imagem, precisamos fazer esse parse
        const data = new FormData();

        data.append('image'       , this.state.image       );
        data.append('author'      , this.state.author      );
        data.append('place'       , this.state.place       );
        data.append('description' , this.state.description );
        data.append('hashtags'    , this.state.hashtags    );


        await api.post('posts', data);

        this.props.history.push('/');
    }

    handleImageChange = e => {
        this.setState({image : e.target.files[0]})
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        return (
            <div className="">
                <form id="new-post" onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleImageChange} />

                    <input type="text" name="author"      id="" placeholder="Autor do post"     onChange={this.handleChange} value={this.state.author}      />
                    <input type="text" name="place"       id="" placeholder="Local do post"     onChange={this.handleChange} value={this.state.place}       />
                    <input type="text" name="description" id="" placeholder="Descrição do post" onChange={this.handleChange} value={this.state.description} />
                    <input type="text" name="hashtags"    id="" placeholder="Hashtags do post"  onChange={this.handleChange} value={this.state.hashtags}    />

                    <button type="submit">Enviar</button>
                </form>
            </div>
        );
    }
}