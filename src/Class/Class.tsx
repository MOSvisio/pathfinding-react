import React, { ForwardRefExoticComponent, RefAttributes} from 'react';
import Node from '../Node';

export class NodeObject {
    NodeObject?: ForwardRefExoticComponent<RefAttributes<any>>;
    parent?: NodeObject;
    cout?: number;
    coord?: Coord;
    heuristique?: number;
    isWall?: boolean;


    constructor(NodeObject?: ForwardRefExoticComponent<RefAttributes<any>>, cout?: number, coord?: Coord, heuristique?: number, isWall?: boolean, parent?: NodeObject)
    {
        this.NodeObject = NodeObject;
        this.parent = parent;
        this.cout = cout;
        this.coord = coord;
        this.heuristique = heuristique;
        this.isWall = isWall;
    }
}

/**
 * class: contains coordonate of a case
 */
export class Coord {
    x: number;
    y: number;
    
    constructor(x: number, y: number) 
    {
        this.x = x;
        this.y = y;
    }
}

export const Block = {
    DEPART:  "depart" , 
    ARRIVEE: "arrivee",
    WALL:    "wall"
}