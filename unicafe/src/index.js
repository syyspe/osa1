import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Otsikko = (props) => {
    return (
        <h1>{props.teksti}</h1>
    )
}

const Statistics = (props) => {
    if (props.hyva === 0 && props.neutraali === 0 && props.huono === 0) {
        return (
            <div>
                <h1>Statistiikka</h1>
                <Statistic teksti="Ei yhtään palautetta annettu" tulos={null}/>
            </div>
        )
    } else {
        let pos = "Positiivisia "
        pos = pos.concat(props.positiivisia, " %")
        return (
            <div>
                <h1>Statistiikka</h1>
                    <div>
                        <Statistic teksti="Hyvä" tulos={props.hyva} />
                        <Statistic teksti="Neutraali" tulos={props.neutraali} />
                        <Statistic teksti="Huono" tulos={props.huono} />
                        <Statistic teksti="Keskiarvo" tulos={props.keskiarvo} />
                        <Statistic teksti={pos} tulos={null} />
                    </div>
            </div> 
        )
}
}

const Statistic = (props) => {
    if (props.tulos === null) {
        return (
            <div>{props.teksti}</div>
        )
    } else {
        return (
            <div>{props.teksti}: {props.tulos}</div>
        )
    }
}

const Button = (props) => {
    return (
        <button onClick={props.kasittelija}>{props.teksti}</button>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    hyva() {
        this.setState({hyva: this.state.hyva + 1})
    }

    neutraali() {
        this.setState({neutraali: this.state.neutraali + 1})
    }

    huono() {
        this.setState({huono: this.state.huono + 1})
    }

    palautteita() {
        return this.state.hyva + this.state.neutraali + this.state.huono
    }

    keskiarvo() {
        if (this.palautteita() === 0) {
            return null
        }
        return (this.state.hyva * 1 - this.state.huono * 1) / this.palautteita() 
    }

    positiivisia() {
        if (this.palautteita() === 0) {
            return null
        }
        return (this.state.hyva * 100) / this.palautteita()

    }

    render () {
        return (
            <div>
                <Otsikko teksti="Anna palautetta" />
                <Button teksti="Hyvä" kasittelija={this.hyva.bind(this)}/>
                <Button teksti="Neutraali" kasittelija={this.neutraali.bind(this)}/>
                <Button teksti="Huono" kasittelija={this.huono.bind(this)}/>
                <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} 
                huono={this.state.huono} keskiarvo={this.keskiarvo()} positiivisia={this.positiivisia()}/>
            </div>
        )
    }
}

/*
const App = () => {
    return (
        <div>
            <Otsikko teksti="Anna palautetta" />    
        </div>
    )
} */

ReactDOM.render(<App />, document.getElementById('root'));

