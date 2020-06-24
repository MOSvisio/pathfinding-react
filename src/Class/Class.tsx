import React, { ForwardRefExoticComponent, RefAttributes, MutableRefObject} from 'react';
import Node from '../Node';

/**
 * Layout to initialize the context
 */
export interface ContextLayout {
    graph : [NodeObject[]?],
    setGraph: (e: []) => void,
    depart: {},
    setDepart: (e: Coord) => void,
    arrivee: {},
    setArrivee: (e: Coord) => void,
    reset: () => void,
    block: string,
    setBlock: (e: string) => void
}

/**
 * Class: represent a box with it's property
 */
export class NodeObject {
    public NodeObject?: ForwardRefExoticComponent<RefAttributes<any>>;
    public parent?: NodeObject;
    public cout?: number;
    public coord?: Coord;
    public heuristique?: number;
    public isWall?: boolean;


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
 * class: contains coordonate of a box
 */
export class Coord {
    public x: number;
    public y: number;
    
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