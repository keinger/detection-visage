import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkFom";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'bbbe93bd21d84b709b5816e577415c34'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: {},

    }
  }

  calculateFaceLocation =(data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    /*
    pour afficher le portrait ciblant le visage ;on utilise 
    un objet qui affichera les differents points reliés entre-elles 
    à l'aide de CSS
    */

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow:  height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox =(box) =>{
    console.log(box)
    this.setState({box: box});
  }

  onInputChange = (event) => {

    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl : this.state.input});
    // renvoit à l'api de Clarifai, afin d'analyser l'image  

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Particles className="particles"
          params={particlesOptions}
        />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl ={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
