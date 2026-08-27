export interface LSystemRule {
    [key: string]: string;
}

export interface TurtleState {
    x: number;
    y: number;
    angle: number;
}

export class LSystem {
    axiom: string;
    rules: LSystemRule;
    angle: number;
    currentString: string;
    iterations: number;

    constructor(axiom: string, rules: LSystemRule, angle: number) {
        this.axiom = axiom;
        this.rules = rules;
        this.angle = (angle * Math.PI) / 180;
        this.currentString = axiom;
        this.iterations = 0;
    }

    generate() {
        let nextString = '';
        for (let i = 0; i < this.currentString.length; i++) {
            const char = this.currentString[i];
            nextString += this.rules[char] || char;
        }
        this.currentString = nextString;
        this.iterations++;
    }

    getSegments(startX: number, startY: number, length: number, lengthFactor = 1) {
        const segments: { x1: number, y1: number, x2: number, y2: number, thickness: number }[] = [];
        const stack: TurtleState[] = [];
        let state: TurtleState = { x: startX, y: startY, angle: -Math.PI / 2 };
        
        let currentLength = length;

        for (let i = 0; i < this.currentString.length; i++) {
            const char = this.currentString[i];
            if (char === 'F' || char === 'G') {
                const x2 = state.x + Math.cos(state.angle) * currentLength;
                const y2 = state.y + Math.sin(state.angle) * currentLength;
                segments.push({ 
                    x1: state.x, y1: state.y, 
                    x2, y2, 
                    thickness: Math.max(1, (stack.length > 0 ? 3 - stack.length * 0.5 : 4))
                });
                state.x = x2;
                state.y = y2;
            } else if (char === '+') {
                state.angle += this.angle;
            } else if (char === '-') {
                state.angle -= this.angle;
            } else if (char === '[') {
                stack.push({ ...state });
                currentLength *= lengthFactor;
            } else if (char === ']') {
                state = stack.pop()!;
                currentLength /= lengthFactor;
            }
        }
        return segments;
    }
}

export const L_SYSTEM_PRESETS = {
    Tree: {
        axiom: 'X',
        rules: {
            X: 'F[+X][-X]FX',
            F: 'FF'
        },
        angle: 25,
        iterations: 5
    },
    Vine: {
        axiom: 'F',
        rules: {
            F: 'F[+F]F[-F]F'
        },
        angle: 20,
        iterations: 4
    },
    Plant: {
        axiom: 'X',
        rules: {
            X: 'F-[[X]+X]+F[+FX]-X',
            F: 'FF'
        },
        angle: 22.5,
        iterations: 5
    }
};
