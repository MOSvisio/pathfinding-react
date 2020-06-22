import React, { createContext, useState, useRef } from 'react';
import Node from '../Node';

const contextInit = {
    graph: [],
    setGraph: () => {},
    refs: null,
    depart: {},
    setDepart: () => {},
    arrivee: {},
    setArrivee: () => {},
    reset: () => {}
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
                const nodeObject = {
                    NodeObject:Node, 
                    parent: null, 
                    cout: 0, 
                    coord: {x: xMax, y: yMax},
                    heuristique: 0,
                    isWall: false
                };
                line.push(nodeObject)
            }
            graphTmp.push(line);
        }
        return graphTmp;

    }

    const [refs, setRefs] = useState(useRef([]));
    const [graph, setGraph] = useState(initGraph);
    // soit Node si je peux this dans le depart soit un objet {x, y}
    const [depart, setDepart] = useState({});
    const [arrivee, setArrivee] = useState({});

    const reset = () => {
        
        
        for (const line of refs.current)
            for(const ref of line) {
                if (ref) {
                    ref.resetColor()
                    ref.setCout(0)
                }
            }

        refs.current = []
        setGraph(initGraph);
        setDepart({});
        setArrivee({});
    }

    const contextValue = {
        graph: graph,
        setGraph: (e) => setGraph(e),
        refs: refs,
        depart: depart,
        setDepart: (e) => setDepart(e),
        arrivee: arrivee,
        setArrivee: (e) => setArrivee(e),
        reset: () => reset()
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