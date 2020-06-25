import React, { createContext, useState, useRef, FunctionComponent, MutableRefObject } from 'react';
import Node from '../Node';
import { NodeObject, Coord, ContextLayout} from '../Class/Class'

const contextInit : ContextLayout = {
    graph : [[]],
    setGraph: (e: []) => {},
    start: new Coord(-1,-1),
    setstart: (e: Coord) => {},
    finish: new Coord(0,0),
    setfinish: (e: Coord) => {},
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
        let heightMax : number = window.innerHeight / 40
        let graphTmp : [NodeObject[]?] = [];
        for (let xMax = 0; xMax < heightMax; xMax++ ) {
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
    const [start, setstart] = useState(new Coord(-1,-1));
    const [finish, setfinish] = useState(new Coord(-1,-1));
    const [block, setBlock] = useState("");

    // TODO: refs type
    const reset = () => {
        
        setGraph(initGraph);
        setstart(new Coord(-1,-1));
        setfinish(new Coord(-1,-1));
    }

    const contextValue : ContextLayout = {
        graph: graph,
        setGraph: (e : []) => setGraph(e),
        start: start,
        setstart: (e : Coord) => setstart(e),
        finish: finish,
        setfinish: (e : Coord) => setfinish(e),
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