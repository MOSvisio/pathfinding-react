import React, { useState, useContext, useEffect} from 'react';
import { GraphContext } from './Store/GraphContext';
import Node from './Node';

const GraphController = (props) => {
    const {graph, setGraph, depart, setDepart, arrivee, setArrivee} = useContext(GraphContext);

    useEffect(() => {
        console.log("changed", graph);
    }, [graph]);

    useEffect(() => {
        console.log("depart modifie", depart)
    }, [depart]);

    useEffect(() => {
        console.log("arrivee modifié", arrivee)
    }, [arrivee]);

    const distanceBetweenNode = (node1, node2) => {
        const d1 = Math.abs(parseInt(node2.props.x) - parseInt(node1.props.x));
        const d2 = Math.abs(parseInt(node2.props.y) - parseInt(node1.props.y));
        return d1 + d2;
    }

    return (
        <div>
            <table className="Graph" style={{borderSpacing: 0}}>
                <tbody>
                {
                    graph.map((rows, index) => {
                        let row = rows.map((component) => {
                            return component
                        })
                        return <tr className="row" key={index}>{row}</tr>
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default GraphController;