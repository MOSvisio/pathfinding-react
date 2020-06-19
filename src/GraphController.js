import React, { useState, useContext, useEffect} from 'react';
import { GraphContext } from './Store/GraphContext';
import Node from './Node';

const GraphController = (props) => {
    const {graph, setGraph, depart, setDepart, arrivee, setArrivee, refs} = useContext(GraphContext);

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
        const d1 = Math.abs(Math.pow(parseInt(node2.coord.x) - parseInt(node1.coord.x),2));
        const d2 = Math.abs(Math.pow(parseInt(node2.coord.x) - parseInt(node1.coord.y),2));
        console.log("distance", Math.sqrt(d1 + d2))
        return Math.floor(Math.sqrt(d1 + d2));
    }

    // refactor
    const getNeighboorRef = (x, y) => {
        let neighboor = [];
        //top
        if (refs.current[x-1] && refs.current[x-1][y] && !refs.current[x-1][y].isWall) {
            neighboor.push(refs.current[x-1][y]);
        }
        //bottom
        if (refs.current[x+1] && refs.current[x+1][y] && !refs.current[x+1][y].isWall) {
            neighboor.push(refs.current[x+1][y]);
        }
        //left
        if (refs.current[x][y-1] && refs.current[x][y-1] && !refs.current[x][y-1].isWall) {
            neighboor.push(refs.current[x][y-1]);
        }
        //right
        if (refs.current[x][y+1] && refs.current[x][y+1] && !refs.current[x][y+1].isWall) {
            neighboor.push(refs.current[x][y+1]);
        }
        return neighboor;
    }

    const existWithLowerCost = (v, tab) => {
        if (tab.includes(v)) {
            for (const value in tab) {
                if (value === v) {
                    if (getObjectOfRef(value).cout < getObjectOfRef(v).cout)
                        return true;
                    else return false;
                }
            }
        }
        return false;
    }

    const showPath = (tab) => {
        for (const ref of tab) {
            ref.setColor("green");
        }
    }

    const  aStar = () => {
        let closedList = [];
        let openList = [];
        const departRef = refs.current[depart.x][depart.y]
        const arriveeRef = refs.current[arrivee.x][arrivee.y]
        openList.push(departRef)
        
        while (openList.length > 0) {
            openList.sort(compared2Nodes)
            const current = openList.shift();
            closedList.push(current);

            if (current.coord.x === arriveeRef.coord.x && current.coord.y === arriveeRef.coord.y) {
                var curr = current;
                var ret = []

                while (getObjectOfRef(curr).parent) {
                    ret.push(curr);
                    curr = getObjectOfRef(curr).parent;
                }

                showPath(ret.reverse());
                return;
            }
            
            closedList.push(current);

            for (const neighboor of getNeighboorRef(current.coord.x, current.coord.y)) {

                if (closedList.includes(neighboor) || existWithLowerCost(neighboor, openList)) {
                    continue;
                }

                let gScore = parseInt(getObjectOfRef(current).cout) + 1;
                let gScoreIsBest = false;

                if (!openList.includes(neighboor)) {
                    gScoreIsBest = true;
                    getObjectOfRef(neighboor).heuristique = distanceBetweenNode(neighboor, arriveeRef);
                    neighboor.setHeur(distanceBetweenNode(neighboor, arriveeRef))
                    openList.push(neighboor);
                }
                else if (gScore < getObjectOfRef(neighboor).cout) {
                    gScoreIsBest = true;
                }

                if (gScoreIsBest) {
                    getObjectOfRef(neighboor).parent = current;
                    getObjectOfRef(neighboor).cout = gScore;
                    neighboor.setCout(gScore)
                }
            }
        }

        return []


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
                            return <Component.NodeObject ref={el => lineRef.push(el)} x={x} y={index} key={x + ':' + index} />
                        })
                        refs.current.push(lineRef)
                        return <tr className="row" key={index}>{row}</tr>
                    })
                    
                }
                </tbody>
            </table>
            <button onClick={() => aStar()}>Resolve</button>
        </div>
    );
}

export default GraphController;