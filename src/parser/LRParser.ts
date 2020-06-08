import { actionTale, gotosTable, grammarTable, c } from "../utils/utils";
import { Lexer } from "../lexer/Lexer";
import fs = require("fs");
import { Tag } from "../lexer/Tag";

export class LRParser {
    private actionTable: actionTale = {};
    private gotosTable: gotosTable = {}
    private grammarTable: grammarTable = {}
    private stack: number[] = [0];
    private symbols: string[] = ['$'];
    private lexer: Lexer = new Lexer();
    private accepted = false;
    private error = false;
    private token: any;

    constructor(fileName: string) {
        this.lexer.openFile(fileName);
        this.loadActions();
        this.loadGotos();
        this.loadGrammar();
        this.start();
    }

    private loadActions() {
        c('loadingActions...');
        const lines = fs.readFileSync('src/parser/utils/actions_table.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);
        lines.forEach(line => {
            const elements = line.split(',');
            const state = +elements[0];
            const input = elements[1];
            const actionType = +elements[2];
            const nextState = +elements[3];
            if (this.actionTable[state]) {
                this.actionTable[state][input] = {
                    type: actionType,
                    state: nextState
                }
            } else {
                this.actionTable[state] = {
                    [input]: {
                        type: actionType,
                        state: nextState
                    }
                }
            }
        });
    }

    private loadGotos() {
        c('loadingGotos...');
        const lines = fs.readFileSync('src/parser/utils/gotos_table.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);
        lines.forEach(line => {
            const elements = line.split(',');
            const state = +elements[0];
            const input = elements[1];
            const nextState = +elements[2];
            if (this.gotosTable[state]) {
                this.gotosTable[state][input] = {
                    state: nextState
                }
            } else {
                this.gotosTable[state] = {
                    [input]: {
                        state: nextState
                    }
                }
            }
        });
    }

    private loadGrammar() {
        c('loadingGrammar...');
        const lines = fs.readFileSync('src/parser/utils/grammar.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);
        lines.forEach(line => {
            const elements = line.split(',');
            const state = +elements[0];
            const input = elements[1];
            const positions = +elements[2];
            this.grammarTable[state] = {
                head: input,
                positions
            }
        });
    }

    private start() {
        this.token = this.lexer.scan();
        while (this.eval());
        if (this.accepted) {
            c('SE ACEPTA');
        } else if (this.error) {
            c('Error en la línea: ' + this.lexer.line);
        } else {
            c('SE RECHAZA');
        }
    }

    private eval(): any {
        c('----------------------------------------------');
        c('Evaluando token: "' + this.token.value + '"');
        if (this.token.tag === Tag.ERROR) {
            this.error = true;
            return false;
        }
        if (this.token.tag === Tag.EOF) {
            return false;
        }
        if (this.token.tag === Tag.ID) {
            this.token.value = 'identifier';
        }
        if (
            this.actionTable
            [this.stack[this.stack.length - 1]]
            [this.token.value]
        ) {
            const action = this.actionTable[this.stack[this.stack.length - 1]][this.token.value];
            if (action.type === 0) { // ACCEPT
                this.accepted = true;
            } else if (action.type === 1) { // SHIFT
                c('SHIFT: ' + action.state);
                this.stack.push(action.state);
                this.symbols.push(this.token.value);
                this.token = this.lexer.scan();
            } else if (action.type === 2) { // REDUCE
                c('REDUCE: ' + action.state);
                const prod = this.grammarTable[action.state];
                c('prod: ' + JSON.stringify(prod));
                for (let i = 0; i < prod.positions; i++) {
                    this.stack.pop();
                    this.symbols.pop();
                    this.printStacks();
                }
                this.symbols.push(prod.head);
                if (this.gotosTable[this.stack[this.stack.length - 1]] && this.gotosTable[this.stack[this.stack.length - 1]][this.symbols[this.symbols.length - 1]]) {
                    this.stack.push(
                        this.gotosTable
                        [this.stack[this.stack.length - 1]]
                        [this.symbols[this.symbols.length - 1]]
                    );
                } else {
                    this.error = true;
                    return false;
                }
            }
            this.printStacks();
            return true;
        } else {
            this.error = true;
            return false;
        }
    }

    private printStacks() {
        c('Stack: ' + this.stack);
        c('Symbols: ' + this.symbols);
    }
}