import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State{
  tarhelyek: Tarhely[] 
  nevInput: string;
  meretInput: number;
  arInput: number;
}

interface Tarhely{
  id: number;
  nev: string;
  meret: number;
  ar: number;
}

interface TarhelyListResponse{
  tarhelycsomagok: Tarhely[];
}

class App extends Component<{}, State>{

  constructor(props: {}){
    super(props);

    this.state = {
      nevInput: '',
      meretInput: 0,
      arInput: 0,
      tarhelyek: [],
    }
  }

  async loadTarhelyek() {
    let response = await fetch('http://localhost:3000/api/tarhely');
    let data = await response.json() as TarhelyListResponse;
    this.setState({
      tarhelyek: data.tarhelycsomagok, 
    })
  }

  componentDidMount() {
    this.loadTarhelyek();
  }

  handleUpload = async () => {
    const { nevInput, meretInput, arInput } = this.state;
    

    const adat = {
      nev: nevInput,
      meret: meretInput,
      ar: arInput,
    }


    let response = await fetch('http://localhost:3000/api/tarhely', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    
    this.setState({ 
      nevInput: '',
      meretInput: 0,
      arInput: 0,
    })

    await this.loadTarhelyek();
  };

  render() {
    const { nevInput, meretInput, arInput } = this.state;
    return <div>
    <h2>Tárhely felvétele</h2>

<table>
<tr>
  <td>Név: </td>
  <td><input type="text" value={nevInput} onChange={e => this.setState({ nevInput: e.currentTarget.value})} /> </td>
</tr>
<tr>
<td> Méret:</td>
<td>  <input type="number" value={meretInput} onChange={e => this.setState({ meretInput: parseInt(e.currentTarget.value) })}/></td>
</tr>
<tr>
<td>Ár:</td>
<td> <input type="number" value={arInput} onChange={e => this.setState({ arInput: parseInt(e.currentTarget.value) })} /> </td>
</tr>
</table>
   <button onClick={this.handleUpload}>Hozzáad</button>
     <br />
    <h2>Tárhelycsomagok:</h2>
    <ul>{
          this.state.tarhelyek.map(tarhely => 
            <li>{tarhely.nev}, {tarhely.meret} GB, {tarhely.ar} Ft/hó</li>
          )
        }</ul>

    </div>
  }
}

export default App;