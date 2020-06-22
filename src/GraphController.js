import React, { useState, useContext, useEffect} from 'react';
import { GraphContext } from './Store/GraphContext';
import Node from './Node';

const GraphController = (props) => {
    const {graph, setGraph, depart, setDepart, arrivee, setArrivee, refs, reset} = useContext(GraphContext);

    useEffect(() => {
        console.log("changed graph", graph);
    }, [graph]);

    useEffect(() => {
        console.log("depart modifie", depart)
    }, [depart]);

    useEffect(() => {
        console.log("arrivee modifié", arrivee)
    }, [arrivee]);

    useEffect(() => {
        console.log("refs modifié", refs)
    }, [refs]);


    const getObjectOfRef = (ref) => {
        return graph[ref.coord.x][ref.coord.y];
    }

    const compared2Nodes = (node1, node2) => {
        const node1Info = getObjectOfRef(node1)
        const node2Info = getObjectOfRef(node2)
        if (node1Info.heuristique < node2Info.heuristique ) {
            return 1;
        }
        else if (node1Info.heuristique === node2Info.heuristique) {
            return 0;
        }
        else return -1;
    }

    const distanceBetweenNode = (node1, node2) => {
        const d1 = Math.abs(parseInt(node2.coord.x) - parseInt(node1.coord.x));
        const d2 = Math.abs(parseInt(node2.coord.x) - parseInt(node1.coord.y));
        return Math.floor(d1 + d2);
    }

    // refactor
    const getNeighboorRef = (x, y) => {
        let neighboor = [];
        //top
        if ((graph[x-1] && graph[x-1][y])) {
            neighboor.push(graph[x-1][y]);
        }
        //bottom
        if ((graph[x+1] && graph[x+1][y])) {
            neighboor.push(graph[x+1][y]);
        }
        //left
        if ((graph[x] && graph[x][y-1])) {
            neighboor.push(graph[x][y-1]);
        }
        //right
        if ((graph[x] && graph[x][y+1])) {
            neighboor.push(graph[x][y+1]);
        }
        return neighboor;
    }

    // TODO : replace for by find
    const existWithLowerCost = (v, tab) => {
        if (tab.includes(v)) {
            for (const value of tab) {
                if (value.coord === v.coord) {
                    if (getObjectOfRef(value).cout < getObjectOfRef(v).cout)
                        return true;
                    return false;
                }
            }
        }
        return false;
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const showPath = async (tab) => {
        for (const ref of tab) {
            await sleep(200)
            refs.current[ref.coord.x][ref.coord.y].setColor("green");
        }
    }

    const aStarWiki = async () => {
        let closedList = [];
        let openList = [];
        const departRef = graph[depart.x][depart.y];
        const arriveeRef = graph[arrivee.x][arrivee.y];
        openList.push(departRef);

        while (openList.length > 0) {
            const current = openList.shift();
            if (current.coord.x == arriveeRef.coord.x && current.coord.y == arriveeRef.coord.y) {
                var curr = current;
                var ret = []

                while (getObjectOfRef(curr).parent) {
                    ret.push(curr);
                    curr = getObjectOfRef(curr).parent;
                }

                showPath(ret.reverse());
                return;
            }
            for (let v of getNeighboorRef(current.coord.x, current.coord.y)) {

                if ((closedList.includes(v) || existWithLowerCost(v, openList) || v.isWall)) {
                    continue;
                }    
                else {
                    getObjectOfRef(v).cout = getObjectOfRef(current).cout + 1;
                    refs.current[v.coord.x][v.coord.y].setCout(getObjectOfRef(current).cout + 1)
                    getObjectOfRef(v).heuristique = getObjectOfRef(v).cout + distanceBetweenNode(v, arriveeRef);
                    getObjectOfRef(v).parent = current;
                    openList.push(v);
                }
            }
            closedList.push(current);
        }
        return [];
    }

    return (
        <div>
            <table className="Graph" style={{borderSpacing: 0}}>
                <tbody>
                {
                    refs.current = [],
                    graph.map((rows, index) => {
                        let x = index
                        let lineRef = []
                        let row = rows.map((Component, index, key) => {
                            return <Component.NodeObject color="white" ref={el => lineRef.push(el)} x={x} y={index} key={x + ':' + index} />
                        })
                        refs.current.push(lineRef)
                        return <tr className="row" key={index}>{row}</tr>
                    })
                    
                }
                </tbody>
            </table>
            <button onClick={() => aStarWiki()}>Resolve</button>
            <button onClick={() => reset()}>Reset</button>
        </div>
    );
}

export default GraphController;