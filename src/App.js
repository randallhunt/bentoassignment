import React, { Component } from 'react';
import 'whatwg-fetch';
import { SpringGrid, layout, measureItems } from 'react-stonecutter';
import Card from './components/card';
import { ClipLoader } from 'react-spinners';
import {lastWord, compareWords, parseImages} from './util';
import './App.css';


const Grid = measureItems(SpringGrid, {measureImages: true});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      facts: null,
      alphabetize: false,
      viewFavorites: false,
      loading: true,
      over: null
    };
  }

  componentWillMount() {
    Promise.all([
        fetch('https://cors-anywhere.herokuapp.com/http://thecatapi.com/api/images/get?format=xml&results_per_page=25', {headers:{'Origin': '*'}}),
        fetch('https://cors-anywhere.herokuapp.com/https://catfact.ninja/facts?limit=25', {headers:{'Origin': '*'}})
    ]).then(results => {

      Promise.all([results[0].text(), results[1].json()]).then(data => {
        const images = parseImages(data[0]).map((item, index) => {
          const fact = data[1].data[index].fact; 
          item.fact = fact;
          item.lastWord = lastWord(fact);
          item.favorite = false;
          return item;
        });
        this.setState({images: images, loading: false});
      });

    }).catch(ex => console.log);
  }

  alphabetize = (event) => {
    this.setState({alphabetize: event.target.checked});
  }

  favorites = (event) => {
    this.setState({showFavorites: event.target.checked});
  }

  onFavoriteClick = (event) => {
    event.stopPropagation();
    const id = event.currentTarget.parentElement.id;
    const items = [...this.state.images];
    const index = items.findIndex(item => item.id === id);
    items[index].favorite = !items[index].favorite;
    this.setState({images: items});
  }

  onItemClick = (item) => {
    const id = item.currentTarget.id;
    this.setState({selected: id});
  }

  unSelect = (item) => {
    this.setState({selected: null});
  }

  renderFacts() {
    let images = [...this.state.images];

    if (this.state.showFavorites) {
      images = images.filter(item => item.favorite);
    }

    if (this.state.alphabetize) {
      images = images.sort(compareWords);
    }

    return images.map(item => {
      return (
        <div key={item.id} className="card">
          <Card {...item} onClick={this.onItemClick} onFavoriteClick={this.onFavoriteClick} />
        </div>
      );
    });
  }

  renderOne() {
    const item = this.state.images.find(item => item.id === this.state.selected);
    return <Card {...item} single onClick={this.onItemClick} onFavoriteClick={this.onFavoriteClick} />
  }

  render() {
    if (this.state.loading) {
      return (<ClipLoader />);
    }

    if (this.state.selected) {
      return (
        <div className="App">
          <header>
            <div className="back" onClick={this.unSelect}>Back to list</div>
          </header>
          <div className="individual">
            {this.renderOne()}
          </div>
        </div>
      )
    }

    return (
      <div className="App">
        <header>
          <div>
            <input type="checkbox" onClick={this.alphabetize}  />
            Sort alphabetically by last word?
          </div>
          <div>
            <input type="checkbox" onClick={this.favorites}  />
            Show only favorites
          </div>
        </header>
        <div className="grid">
          <Grid
            component="div"
            columns={3}
            columnWidth={300}
            gutterWidth={20}
            gutterHeight={40}
            layout={layout.pinterest}
            duration={800}
          >
            {this.renderFacts()}
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
