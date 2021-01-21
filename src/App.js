import React from 'react';
import './App.css';
const axios = require('axios');

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      pokemons: [],
      textSearch: '',
      types: [],
      weaknesses: [],
      typeFilters: [],
      weaknessFilters: []
    }
  }

  componentDidMount() {
    axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json').then(res => {
      let types = []
      let weaknesses = []
      res.data.pokemon.forEach(pokemon => {
        pokemon.type.forEach(type => {
          if (!types.includes(type)) {
            types.push(type)
          }
        })
        pokemon.weaknesses.forEach(weakness => {
          if (!weaknesses.includes(weakness)) {
            weaknesses.push(weakness)
          }
        })
      })
      this.setState({
        pokemons: res.data.pokemon,
        weaknesses,
        types
      })
    })
  }

  render() {
    const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
    const filteredPokemons = this.state.pokemons
      .filter(pokemon => pokemon.name.toLowerCase().includes(this.state.textSearch.toLowerCase()))
      .filter(pokemon => this.state.typeFilters.every(type => pokemon.type.includes(type)))
      .filter(pokemon => this.state.weaknessFilters.every(weakness => pokemon.weaknesses.includes(weakness)))
    const pokemons = filteredPokemons.map(
      (pokemon) =>
        <li style={{border: '1px solid green'}}>
          <h3>{pokemon.name}</h3>
          <ul style={{'paddingInlineStart': '0px'}}>
            <li>num: {pokemon.num}</li>
            <li>type: {pokemon.type.join(', ')}</li>
            <li>weakness: {pokemon.weaknesses.join(', ')}</li>
          </ul>
          <img src={pokemon.img} alt={pokemon.name}></img>
        </li>
    )

    const typeOptions = this.state.types.map(
      type => <option value={type}>{type}</option>
    )

    const weaknessOptions = this.state.weaknesses.map(
      weakness => <option value={weakness}>{weakness}</option>
    )
    
    return (
      <div className="App">
        <h1>POKEDEX</h1>
        <input 
          style={BarStyling}
          placeholder={"search pokemon"}
          onChange={(e) => this.setState({textSearch: e.target.value})}
        />
        <label >Choose type:</label>

        <select name="types" id="types" multiple onChange={e => this.setState({typeFilters: Array.from(e.target.selectedOptions, option => option.value)})}>
          {typeOptions}
        </select>

        <label>Choose weakness:</label>
        <select name="weaknesses" id="weaknesses" multiple onChange={e => this.setState({weaknessFilters: Array.from(e.target.selectedOptions, option => option.value)})}>
          {weaknessOptions}
        </select>
        <ul style={{'paddingInlineStart': '0px'}}>{pokemons}</ul>
      </div>
    );
  }
}

export default App;
