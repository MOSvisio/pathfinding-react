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

    class NodeObject {
        NodeObject;
        parent;
        cout;
        coord;
        heuristique;
        isWall;

        constructor(NodeObject, parent, cout, coord, heuristique, isWall)
        {
            this.NodeObject = NodeObject;
            this.parent = parent;
            this.cout = cout;
            this.coord = coord;
            this.heuristique = heuristique;
            this.isWall = isWall;
        }
    }

    const initGraph = () => {
        let graphTmp = [];
        for (let xMax = 0; xMax < 10; xMax++ ) {
            let line = []
            for (let yMax = 0; yMax < 10; yMax++ ) {
                const nodeObject = new NodeObject(Node, null, 0, {x: xMax, y: yMax}, 0, false);
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