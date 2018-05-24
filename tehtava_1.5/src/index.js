import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi.nimi}</h1>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osanNimi={props.kurssi.osat[0].nimi} tehtavia={props.kurssi.osat[0].tehtavia} />
            <Osa osanNimi={props.kurssi.osat[1].nimi} tehtavia={props.kurssi.osat[1].tehtavia} />
            <Osa osanNimi={props.kurssi.osat[2].nimi} tehtavia={props.kurssi.osat[2].tehtavia} />
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osanNimi} {props.tehtavia}</p>
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.kurssi.osat[0].tehtavia 
                + props.kurssi.osat[1].tehtavia + props.kurssi.osat[2].tehtavia} tehtävää</p>
        </div>
    )
}


const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }


    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

