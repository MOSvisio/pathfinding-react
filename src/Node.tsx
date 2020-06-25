import React, { useState, useContext, useEffect, forwardRef, useImperativeHandle,  } from 'react';
import { GraphContext } from './Store/GraphContext';
import { Block, Coord, Props } from './Class/Class';

export type NodeHandle = {

        coord: Coord,

        colorBg: string,

        setColor: (color: string) => void,
        
        resetColor: () => void,

        setIsWall: (isWall: boolean) =>void,

        setCout: (cout: number) => void
}

const Node = forwardRef<NodeHandle, Props>((props: Props, ref) => {
    const {graph, depart, setDepart, arrivee, setArrivee, block} = useContext(GraphContext);
    const [coord, setCoord] = useState(new Coord(props.x, props.y));
    const [colorBg, setColorBg] = useState(props.color);
    const [isWall, setIsWall] = useState(false);
    const [cout, setCout] = useState(0);
    const [heuristique, setHeuristique] = useState(0)

    const {x, y} = coord;

    /*useEffect(() => {
        if (refs.current === [])
            setColor("white")
    }, [refs])*/

    const setDepartArrivee = (e: React.MouseEvent) => {
        console.log("clic", coord)
        if (block === Block.DEPART && depart.x === -1)
        {
            setDepart(new Coord(x, y));
            setColorBg("blue")
            console.log("set Depart");
        }
        else if (block === Block.ARRIVEE && arrivee.x === -1)
        {
            setArrivee(new Coord(x, y));
            setColorBg("yellow");
            console.log("set Arrivee");
        }
        else if (block === Block.WALL) 
        {
            setIsWall(true)
            const graphObj = graph[coord.x]![coord.y]
            
            graphObj!.isWall = true
            setColorBg("black");
        }
    }

    useImperativeHandle(ref, () => ({

        coord,

        colorBg,

        setColor: (color: string) => {
            if (colorBg !== "blue" && colorBg !== "yellow")
                setColorBg(color)
        },
        
        resetColor: () => {
            setColorBg("white");
        },

        setIsWall: (isWall: boolean) => {
            setIsWall(isWall);
        },

        setCout: (cout: number) => {
            setCout(cout);
        }
    
    }));

    return (
        <td  onClick={(e) => setDepartArrivee(e)} style={{ border: "1px solid #333", width: "30px", height: "30px", backgroundColor: colorBg}}>
            {isWall ? "" : ""}
        </td>
    );
})

export default Node;