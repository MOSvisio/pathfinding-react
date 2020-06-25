import React, { createContext, useState, useRef, FunctionComponent, MutableRefObject } from 'react';
import Node from '../Node';
import { NodeObject, Coord, ContextLayout} from '../Class/Class'

const contextInit : ContextLayout = {
    graph : [[]],
    setGraph: (e: []) => {},
    depart: new Coord(-1,-1),
    setDepart: (e: Coord) => {},
    arrivee: new Coord(0,0),
    setArrivee: (e: Coord) => {},
    reset: () => {},
    block: "",
    setBlock: (e: string) => {}
};

export const GraphContext = createContext(
    contextInit
);

type GraphProviderProps = {}

const GraphProvider: FunctionComponent<GraphProviderProps> = ({children}) => {

    const initGraph = () => {
        let widthMax : number = window.innerWidth / 30
        let graphTmp : [NodeObject[]?] = [];
        for (let xMax = 0; xMax < 20; xMax++ ) {
            let line : NodeObject[] = []
            for (let yMax = 0; yMax < widthMax; yMax++ ) {
                const nodeObject = new NodeObject(0, new Coord(xMax, yMax), 0, false);
                line.push(nodeObject)
            }
            graphTmp.push(line);
        }
        return graphTmp;

    }

    const [graph, setGraph] = useState(initGraph);
    const [depart, setDepart] = useState(new Coord(-1,-1));
    const [arrivee, setArrivee] = useState(new Coord(-1,-1));
    const [block, setBlock] = useState("");

    // TODO: refs type
    const reset = () => {
        
        setGraph(initGraph);
        setDepart(new Coord(-1,-1));
        setArrivee(new Coord(-1,-1));
    }

    const contextValue : ContextLayout = {
        graph: graph,
        setGraph: (e : []) => setGraph(e),
        depart: depart,
        setDepart: (e : Coord) => setDepart(e),
        arrivee: arrivee,
        setArrivee: (e : Coord) => setArrivee(e),
        reset: () => reset(),
        block: block,
        setBlock: (e : string) => setBlock(e)
    };

    return (
        <div>
            <GraphContext.Provider value={contextValue}>
                {children}
            </GraphContext.Provider>
        </div>
    );
}

export default GraphProvider;