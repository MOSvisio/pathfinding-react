import React, { useContext } from 'react';
import { GraphContext } from './Store/GraphContext';
import { Block } from './Class/Class';

const GraphController = () => {
    const {graph, depart, arrivee, refs, setRefs, reset, block, setBlock} = useContext(GraphContext);

    /*
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
    }*/

    const compared2Nodes = (node1, node2) => {
        if (node1.heuristique < node2.heuristique ) {
            return -1;
        }
        else if (node1.heuristique === node2.heuristique) {
            return 0;
        }
        else return 1;
    }

    const distanceBetweenNode = (node1, node2) => {
        const d1 = Math.abs(parseInt(node1.coord.x) - parseInt(node2.coord.x));
        const d2 = Math.abs(parseInt(node1.coord.x) - parseInt(node2.coord.y));
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
                if (value.cout <= v.cout)
                    return true;
                return false;
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
            refs().current[ref.coord.x][ref.coord.y].setColor("green");
        }
    }

    const calculatePath = (current) => {
        let curr = current;
        let ret = []

        while (curr.parent) {
            ret.push(curr);
            curr = curr.parent;
        }

        showPath(ret.reverse());
    }


    // TODO: The sort didn't work openlist is a priority queue ? 
    const aStarWiki = () => {
        let closedList = [];
        let openList = [];
        const departRef = graph[depart.x][depart.y];
        const arriveeRef = graph[arrivee.x][arrivee.y];
        openList.push(departRef);
        while (openList.length > 0) {
            const current = openList.shift();
            if (current.coord.x === arriveeRef.coord.x && current.coord.y === arriveeRef.coord.y) {
                calculatePath(current)
                return;
            }

            getNeighboorRef(current.coord.x, current.coord.y).forEach((v) => {
                if (closedList.includes(v) || existWithLowerCost(v, openList) || v.isWall) {
                    return;
                }    
                else {
                    v.cout = current.cout + 1;
                    refs().current[v.coord.x][v.coord.y].setCout(current.cout + 1)
                    v.heuristique = v.cout + distanceBetweenNode(v, arriveeRef);
                    v.parent = current;
                    openList.push(v);
                    openList.sort(compared2Nodes)
                }
            });
            closedList.push(current);
        }
        return [];
    }


    const setBlockType = (type) => {
        setBlock(type);
    }

    return (
        <div>
            <div>
                <button onClick={() => setBlockType(Block.DEPART)}>Depart</button>
                <button onClick={() => setBlockType(Block.ARRIVEE)}>Arrivee</button>
                <button onClick={() => setBlockType(Block.WALL)}>Wall</button>
            </div>
            <div>
            <table className="Graph" style={{borderSpacing: 0}}>
                
                <tbody>
                {
                    setRefs(refs().current = []),
                    graph.map((rows, index) => {
                        let refss = refs()
                        let x = index
                        let lineRef = []
                        let row = rows.map((Component, index) => {
                            return <Component.NodeObject color="white" ref={el => lineRef.push(el)} x={x} y={index} key={x + ':' + index} />
                        })
                        refss.current.push(lineRef)
                        setRefs(refss)
                        return <tr className="row" key={index}>{row}</tr>
                    })
                    
                }
                </tbody>
            </table>
            </div>
            <button onClick= {() => aStarWiki()}>Resolve</button>
            <button onClick={() => reset()}>Reset</button>
        </div>
    );
}

export default GraphController;