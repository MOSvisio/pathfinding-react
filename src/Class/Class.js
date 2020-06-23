export class NodeObject {
    NodeObject;
    parent;
    cout;
    coord;
    heuristique;
    isWall;

    constructor(NodeObject, parent, cout, coord, heuristique, isWall)
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
    x;
    y;
    
    constructor(x, y) 
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