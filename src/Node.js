import React, { useState, useContext } from 'react';
import { GraphContext } from './Store/GraphContext';


const Node = (props) => {
    const {graph, setGraph, depart, setDepart, arrivee, setArrivee} = useContext(GraphContext);
    const [coord, setCoord] = useState({x: props.x, y: props.y});
    const [colorBg, setColorBg] = useState("white")

    const {x, y} = coord;

    //console.log("test : " + graph[0][0].props.x)

    const setDepartArrivee = () => {
        console.log("enter : " + graph[x][y].props.x)
        console.log("depart", depart)
        if (Object.keys(depart).length === 0)
        {
            setDepart({x: x, y:y});
            console.log("set Depart");
        }
        else if (Object.keys(arrivee).length === 0)
        {
            setArrivee({x: x, y:y});
            console.log("set Arrivee");
        }
    }

    return (
        <td onClick={() => setDepartArrivee()} style={{ border: "1px solid #333", width: "30px", height: "30px", backgroundColor: colorBg}}>
            {coord.x} : {coord.y}
        </td>
    );
}

export default Node;