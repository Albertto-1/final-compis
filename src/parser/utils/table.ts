interface row {
    [key: string]: any;
}
export const table:row = {
    "<program>": {
        "id": 1,
        "int": 1,
        "bool": 1,
        "print": 1,
        "if": 1,
        "$": 1
    },
    "<declaration-star>": {
        "id": 3,
        "int": 2,
        "bool": 2,
        "print": 3,
        "if": 3,
        "$": 3
    },
    "<declaration>": {
        "int": 4,
        "bool": 4
    },
    "<statement-star>": {
        "id": 5,
        "print": 5,
        "if": 5,
        "end": 6,
        "$": 6
    },
    "<statement>": {
        "id": 7,
        "print": 8,
        "if": 9
    },
    "<type>": {
        "int": 10,
        "bool": 11
    },
    "<assignment>": {
        "id": 12
    },
    "<print>": {
        "print": 13
    },
    "<condition>": {
        "if": 14
    },
    "<expression>": {
        "id": 15,
        "integer": 15,
        "boolean": 15,
        "lp": 15,
        "minus": 15
    },
    "<expression-prime>": {
        "id": 17,
        "print": 17,
        "if": 17,
        "then": 17,
        "end": 17,
        "operator": 16,
        "rp": 17,
        "$": 17
    },
    "<simple-expression>": {
        "id": 18,
        "integer": 19,
        "boolean": 20,
        "lp": 21,
        "minus": 22
    }
};
