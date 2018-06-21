import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';

const particlesOptions = {
                particles: {
                  number: {
                    value: 30,
                    density: {
                      enable: true,
                      value_area:300
                    }
                  }
                }
              };

// const app = new Clarifai.App({apiKey: 'ca60d9bf9f2c46879f784de17faa9b05'});

const initalState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id:'',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001/')
  //     .then(response => response.json())
  //     .then(console.log)
  //     .catch(err => console.log('Error :', err));
  // }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  calculationFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol : (1 - clarifaiFace.right_col) * width,
      bottomRow: (1 - clarifaiFace.bottom_row) * height,
    }
  }

  displayFaceBox = box => {
    // console.log(box);
    this.setState({box: box});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    fetch('https://enigmatic-coast-91390.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({input: this.state.input})
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://enigmatic-coast-91390.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({id: this.state.user.id})
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log);
        }
        this.displayFaceBox(this.calculationFaceLocation(response));

        })
      .catch(err => console.log('BAD', err));
  }

  onRouteChange= route => {
    route === 'home' ? this.setState({isSignedIn: true}) : this.setState(initalState);
    this.setState({route: route});
  }

  loadUser = user => {
    this.setState({user: {
        id:user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  render() {
    const {isSignedIn, box, imageUrl, route, user} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home'
        ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        : ( route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )
        } 
      </div>
    );
  }
}

export default App;
