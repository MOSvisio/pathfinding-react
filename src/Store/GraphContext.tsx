import React, { createContext, useState, useRef, FunctionComponent } from 'react';
import Node from '../Node';
import { NodeObject, Coord, ContextLayout} from '../Class/Class'

const contextInit : ContextLayout = {
    graph : [[]],
    setGraph: (e: []) => {},
    refs: () => {},
    depart: {},
    setDepart: (e: Coord) => {},
    arrivee: {},
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
                const nodeObject = new NodeObject(Node, 0, new Coord(xMax, yMax), 0, false);
                line.push(nodeObject)
            }
            graphTmp.push(line);
        }
        return graphTmp;

    }

    const [refs, setRefs] = useState(useRef([]));
    const [graph, setGraph] = useState(initGraph);
    const [depart, setDepart] = useState({});
    const [arrivee, setArrivee] = useState({});
    const [block, setBlock] = useState("");

    // TODO: refs type
    const reset = () => {
        for (const line of refs.current) {
            for(const ref of line) {
                if (ref) {
                    ref.resetColor()
                    ref.setCout(0)
                    ref.setIsWall(false)
                }
            }
        }

        refs.current = []
        setGraph(initGraph);
        setDepart({});
        setArrivee({});
    }

    const contextValue : ContextLayout = {
        graph: graph,
        setGraph: (e : []) => setGraph(e),
        refs: () => {return refs},
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