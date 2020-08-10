import React, { useContext, useState, useRef, useEffect } from 'react';
import { GraphContext } from './Store/GraphContext';
import { Block, NodeObject } from './Class/Class';
import  Node  from './Node';

const GraphController = () => {
    const {graph, start, finish, reset, block, setBlock} = useContext(GraphContext);

    type NodeHandle = React.ElementRef<typeof Node>;
    const [refs, setRefs] = useState(useRef<[NodeHandle[]?]>([]));


    const [isOver, setIsOver] = useState(true)
    
    useEffect(() => {
        console.log("changed graph", graph);
        console.log("reset")
        for (const line of refs!.current!) {
            for(const ref of line!) {
                if (ref) {
                    ref.resetColor()
                    ref.setCout(0)
                    ref.setIsWall(false)
                }
            }
        }
    }, [graph]);

    const compared2Nodes = (node1: NodeObject, node2: NodeObject) =>{
        if (node1!.heuristique! < node2!.heuristique! ) {
            return -1;
        }
        else if (node1!.heuristique! === node2!.heuristique!) {
            return 0;
        }
        else return 1;
    }

    const distanceBetweenNode = (node1: NodeObject, node2: NodeObject) => {
        const d1 = Math.abs((node1.coord!.x) - (node2.coord!.x));
        const d2 = Math.abs((node1.coord!.x) - (node2.coord!.y));
        return Math.floor(d1 + d2);
    }

    // refactor
    const getNeighboorRef = (x: number, y: number) => {
        let neighboor = [];
        //top
        if ((graph[x-1] && graph[x-1]![y])) {
            neighboor.push(graph[x-1]![y]);
        }
        //bottom
        if ((graph[x+1] && graph[x+1]![y])) {
            neighboor.push(graph[x+1]![y]);
        }
        //left
        if ((graph[x] && graph[x]![y-1])) {
            neighboor.push(graph[x]![y-1]);
        }
        //right
        if ((graph[x] && graph[x]![y+1])) {
            neighboor.push(graph[x]![y+1]);
        }
        return neighboor;
    }

    // TODO : replace for by find
    const existWithLowerCost = (v: NodeObject, tab: NodeObject[]) => {
        if (tab.includes(v)) {
            for (const value of tab) {
                if (value.cout! <= v.cout!)
                    return true;
                return false;
            }
        }
        return false;
    }

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const showPath = async (tab: NodeObject[]) => {
        console.log(tab)
        for (const ref of tab) {
            await sleep(200)
            if (ref.coord!.x !== finish.x || ref.coord!.y !== finish.y)    
                refs.current![ref.coord!.x]![ref.coord!.y].setColor("green");
        }
        setIsOver(true)
    }

    const calculatePath = (current: NodeObject) => {
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
        setIsOver(false)
        let closedList : NodeObject[] = [];
        let openList : NodeObject[] = [];
        if (start.x === -1 && start.y === -1 || finish.x === -1 && finish.y === -1)
            return;
        const startRef = graph[start.x]![start.y];
        const finishRef = graph[finish.x]![finish.y];
        openList.push(startRef);
        while (openList.length > 0) {
            const current = openList.shift();
            if (current!.coord!.x === finishRef!.coord!.x && current!.coord!.y === finishRef!.coord!.y) {
                calculatePath(current!)
                return;
            }

            getNeighboorRef(current!.coord!.x, current!.coord!.y).forEach((v) => {
                if (closedList.includes(v) || existWithLowerCost(v, openList) || v.isWall) {
                    return;
                }    
                else {
                    v.cout = current!.cout! + 1;
                    //if (current!.cout)
                    //    refs.current[v.coord!.x][v.coord!.y].setCout(current!.cout + 1)
                    v.heuristique = v.cout + distanceBetweenNode(v, finishRef);
                    v.parent = current;
                    openList.push(v);
                    openList.sort(compared2Nodes)
                }
            });
            closedList.push(current!);
        }
        return [];
    }


    const setBlockType = (type: string) => {
        setBlock(type);
    }

    return (
        <div>
            <div>
                <button disabled={!isOver} onClick={() => setBlockType(Block.START)}>Start</button>
                <button disabled={!isOver} onClick={() => setBlockType(Block.FINISH)}>Finish</button>
                <button disabled={!isOver} onClick={() => setBlockType(Block.WALL)}>Wall</button>
            </div>
            <div>
            <table className="Graph" style={{borderSpacing: 0}}>
                
                <tbody>
                {
                    
                    graph.map((rows, index) => {
                        let x = index
                        let lineRef : NodeHandle[]= []
                        let row = rows!.map((Component, index) => {
                            return <Node color="white" ref={(el: NodeHandle) => lineRef.push(el)} x={x} y={index} key={x + ':' + index} />
                        })
                        refs.current!.push(lineRef)
                        return <tr className="row" key={index}>{row}</tr>
                    })
                    
                }
                </tbody>
            </table>
            </div>
            <button disabled={!isOver} onClick= {() => aStarWiki()}>Resolve</button>
            <button disabled={!isOver} onClick={() => reset()}>Reset</button>
        </div>
    );
}

export default GraphController;