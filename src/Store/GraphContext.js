import React, { createContext, useState } from 'react';
import Node from '../Node';

const contextInit = {
    graph: [],
    setGraph: () => {},
    depart: {},
    setDepart: () => {},
    arrivee: {},
    setArrivee: () => {}
};

export const GraphContext = createContext(
    contextInit
);

const GraphProvider = (props) => {

    const initGraph = () => {
        let graphTmp = [];
        let xMax = 0;
        for (xMax; xMax < 10; xMax++ ) {
            let line = []
            let yMax = 0;
            for (yMax; yMax < 10; yMax++ ) {
                line.push(<Node x={xMax} y={yMax} key={xMax + ':' + yMax} />);
            }
            graphTmp.push(line);
        }
        return graphTmp;
    }

    const [graph, setGraph] = useState(initGraph);
    // soit Node si je peux this dans le depart soit un objet {x, y}
    const [depart, setDepart] = useState({});
    const [arrivee, setArrivee] = useState({});

    const contextValue = {
        graph: graph,
        setGraph: (e) => setGraph(e),
        depart: depart,
        setDepart: (e) => setDepart(e),
        arrivee: arrivee,
        setArrivee: (e) => setArrivee(e)
    };

    return (
        <div>
            <GraphContext.Provider value = {contextValue}>
                {props.children}
            </GraphContext.Provider>
        </div>
    );
}

export default GraphProvider;