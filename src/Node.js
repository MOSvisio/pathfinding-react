import React, { useState, useContext, useEffect, forwardRef, useImperativeHandle } from 'react';
import { GraphContext } from './Store/GraphContext';


const Node = forwardRef((props, ref) => {
    const {graph, setGraph, depart, setDepart, arrivee, setArrivee, refs} = useContext(GraphContext);
    const [coord, setCoord] = useState({x: props.x, y: props.y});
    const [colorBg, setColorBg] = useState(props.color);
    const [isWall, setIsWall] = useState(false);
    const [cout, setCout] = useState(0);
    const [heuristique, setHeuristique] = useState(0)

    const {x, y} = coord;

    /*useEffect(() => {
        if (refs.current === [])
            setColor("white")
    }, [refs])*/

    const setColor = (color) => {
        if (colorBg !== "blue")
            setColorBg(color)
    }

    const setDepartArrivee = (e) => {
        console.log("coord : " + refs.current[x][y].coord)
        refs.current[x][y].setColor("red")
        console.log("depart", depart)
        if (Object.keys(depart).length === 0)
        {
            setDepart({x: x, y:y});
            setColorBg("blue")
            console.log("set Depart");
        }
        else if (Object.keys(arrivee).length === 0)
        {
            setArrivee({x: x, y:y});
            setColorBg("yellow");
            console.log("set Arrivee");
        }
        else {
            setIsWall(true)
            graph[coord.x][coord.y].isWall = true
            setColorBg("black");
        }
    }

    useImperativeHandle(ref, () => ({

        setColor,
        
        resetColor: () => {
            setColorBg("white");
        },

        setIsWall: (isWall) => {
            setIsWall(isWall);
        },

        setCout: (cout) => {
            setCout(cout);
        }
    
    }));

    return (
        <td onClick={(e) => setDepartArrivee(e)} style={{ border: "1px solid #333", width: "30px", height: "30px", backgroundColor: colorBg}}>
            {isWall ? "" : cout}
        </td>
    );
})

export default Node;