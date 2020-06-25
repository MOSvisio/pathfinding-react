import React, { ForwardRefExoticComponent, RefAttributes, MutableRefObject} from 'react';
import Node from '../Node';



export type Props = {
    x: number,
    y: number,
    color: string
}
/**
 * Layout to initialize the context
 */
export interface ContextLayout {
    graph : [NodeObject[]?],
    setGraph: (e: []) => void,
    start: Coord,
    setstart: (e: Coord) => void,
    finish: Coord,
    setfinish: (e: Coord) => void,
    reset: () => void,
    block: string,
    setBlock: (e: string) => void
}

/**
 * Class: represent a box with it's property
 */
export class NodeObject {
    public parent?: NodeObject;
    public cout?: number;
    public coord?: Coord;
    public heuristique?: number;
    public isWall?: boolean;


    constructor(cout?: number, coord?: Coord, heuristique?: number, isWall?: boolean, parent?: NodeObject)
    {
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
    start:  "start" , 
    finish: "finish",
    WALL:    "wall"
}