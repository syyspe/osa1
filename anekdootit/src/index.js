import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Anekdootti = (props) => {
    return (
        <div>
            <div>{props.anekdootti}</div>
            <div>Has {props.aania} votes</div>
        </div>
    )
}

const Nappi = (props) => {
    return (
        <button onClick={props.kasittelija}>{props.teksti}</button>
    )
}

const Tilanne = (props) => {
    return (
        <div>
            <h2>{props.otsikko}</h2>
            <p>{props.suosituinAnekdootti.anekdootti}</p>
            <p>has {props.suosituinAnekdootti.aania} votes</p>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: this.satunnainenIndeksi(),
            pisteet: this.alustaPisteet()
        }
    }

    alustaPisteet() {
        let pisteet = []
        for (var i = 0; i < this.props.anecdotes.length; i++) {
            pisteet.push(0)
        }
        return pisteet
    }

    satunnainenIndeksi() {
        return Math.floor(Math.random() * this.props.anecdotes.length)
    }

    satunnainenAnekdootti = () => {
        this.setState({selected: this.satunnainenIndeksi()})
        return () => {return this.props.anecdotes[this.state.selected]}
    }

    aanestaAnekdoottia = () => {
        let pisteetKopio = [...this.state.pisteet]
        pisteetKopio[this.state.selected] = this.state.pisteet[this.state.selected] + 1  
        this.setState({pisteet: pisteetKopio})
    }

    suosituinAnekdootti() {
        let maxAania = 0
        let suosituimmanIndeksi = 0
        for (var i = 0; i < this.props.anecdotes.length; i++) {
            let aania = this.state.pisteet[i]
            if (aania > maxAania) {
                maxAania = aania
                suosituimmanIndeksi = i 
            }
        }
        return {anekdootti: this.props.anecdotes[suosituimmanIndeksi], aania: maxAania}
    }

    render() {
        return (
            <div>
                
                <Anekdootti 
                    anekdootti={this.props.anecdotes[this.state.selected]} 
                    aania={this.state.pisteet[this.state.selected]} />
                <Nappi teksti="Vote" kasittelija={this.aanestaAnekdoottia} />
                <Nappi teksti="Next anecdote" kasittelija={this.satunnainenAnekdootti} />
                <Tilanne 
                    otsikko="Anecdote with most votes:" 
                    suosituinAnekdootti={this.suosituinAnekdootti()} />
            </div>
        )
    }
}
  
  
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));
