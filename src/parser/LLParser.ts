import { grammarTable, c } from "../utils/utils";
import { Lexer } from "../lexer/Lexer";
import fs = require("fs");
import { Tag } from "../lexer/Tag";
import { table } from "../parser/utils/table"

export class LLParser {
    private table = table;
    private grammarTable: grammarTable = {}
    private stack: string[] = ['<program>'];
    private lexer: Lexer = new Lexer();
    private accepted = false;
    private error = false;
    private token: any;

    constructor(fileName: string) {
        this.lexer.openFile(fileName);
        this.loadGrammar();
    }

    private loadGrammar() {
        c('loadingGrammar...');
        const lines = fs.readFileSync('src/parser/utils/grammar.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);
        lines.forEach(line => {
            const elements = line.split(',');
            const state = +elements.shift();
            const head = elements.shift();
            const body = elements;
            this.grammarTable[state] = {
                head,
                body
            };
        });
    }

    start() {
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
        if (this.token.tag === Tag.ERROR) {
            this.error = true;
            return false;
        }
        if (this.stack[this.stack.length-1] === this.token.value) {
            this.stack.pop();
            this.token = this.lexer.scan();
            return true;
        }
        c('----------------------------------------------');
        c('Stack: ' + this.stack);
        c('Token: ' + this.token.value);
        if (this.stack.length !== 0) {
            if (
                this.table[this.stack[this.stack.length-1]] &&
                (
                    this.table[this.stack[this.stack.length-1]][this.token.value]
                )
            ) {
                const jump = this.table[this.stack[this.stack.length-1]][this.token.value];
                const body = this.grammarTable[jump].body;
                const lgh = body.length;
                this.stack.pop();
                for (let i=lgh-1; i>=0; i--) {
                    this.stack.push(body[i]);
                }
                if (this.stack[this.stack.length-1] === "''") {
                    this.stack.pop();
                }
                return true;
            } else {
                this.error = true;
                return false;
            }
        } else {
            if (this.token.tag === Tag.EOF) {
                this.accepted = true;
                return false;
            }
            return false;
        }
    }
}
