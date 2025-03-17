namespace Math {

    export enum opaetion {
        add = 0,
        sub = 1,
        mul = 2,
        dvi = 3,
    }

    export enum sumtype {
        add = 0,
        mul = 1
    }

    export function mod(numv: number, modv: number) {
        let uvn = numv
        while (uvn >= modv || uvn < 0) {
            if (uvn >= modv) uvn -= modv;
            else if (uvn < 0) uvn += modv;
        }
        return uvn
    }

    export function sum(narr: number[], nop: sumtype, idxm: boolean = false) {
        let sumv = 0
        for (let i = 0;i < narr.length;i++) {
            if (idxm) {
                switch (nop) {
                    case 0: sumv += narr[i] + (i + 1); break;
                    case 1: sumv += narr[i] * (i + 1); break;
                }
            } else {
                switch (nop) {
                    case 0: sumv += narr[i]; break;
                    case 1: sumv *= narr[i]; break;
                }
            }
        }
        return sumv
    }
}
