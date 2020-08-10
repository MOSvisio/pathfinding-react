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
    const {graph, start, setStart, finish, setFinish, block} = useContext(GraphContext);
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

    function setWall() {
        if (block === Block.WALL) 
        {
            setIsWall(true)
            const graphObj = graph[coord.x]![coord.y]
            
            graphObj!.isWall = true
            setColorBg("black");
        }
    }

    const setStartfinish = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log("clic", coord)
        if (block === Block.START && start.x === -1)
        {
            setStart(new Coord(x, y));
            setColorBg("blue")
            console.log("set start");
        }
        else if (block === Block.FINISH && finish.x === -1)
        {
            setFinish(new Coord(x, y));
            setColorBg("yellow");
            console.log("set finish");
        }
        else {
            setWall()
        } 
    }

    function onMouseEnterDo(e : React.MouseEvent){
        e.preventDefault();
        if(e.buttons===1){//code for left click}
            setWall()
        }
    }

    useImperativeHandle(ref, () => ({

        coord: coord, 

        colorBg: colorBg,

        setColor: (color: string) => {
            console.log(colorBg)
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
        <td onMouseOver={(e) => onMouseEnterDo(e)} onMouseDown={(e) => setStartfinish(e)} style={{ border: "1px solid #333", width: "30px", height: "30px", backgroundColor: colorBg}}>
            {isWall ? "" : ""}
        </td>
    );
})

export default Node;