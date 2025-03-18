namespace Math {

    export enum angleofdegrad {
        //%block="from degree to radian"
        deg2rad = -1,
        //%block="from radian to degree"
        rad2deg = 1,
    }

    export enum operation {
        //%block="+"
        add = 0,
        //%block="-"
        sub = 1,
        //%block="×"
        mul = 2,
        //%block="÷"
        div = 3,
    }

    export enum movebit {
        //%block="^"
        xor = 0,
        //%block="<<"
        left = -1,
        //%block=">>"
        right = 1,
    }

    export enum sumtype {
        //%block="+"
        add = 0,
        //%block="×"
        mul = 1,
    }

    /**
     * return the modules of number of negative number get devided by another
     * @param number value to devide
     * @param modules devided number value
     */
    //%blockid=math_modval
    //%block="$numv mod $modv"
    //%numv.defl=1 modv.defl=2
    //%group="math util"
    //%weight=100
    export function mod(numv: number, modv: number) {
        if (modv == 0) return modv;
        modv = abs(modv)
        while (numv >= modv || numv < 0) {
            if (numv >= modv) numv -= modv;
            else if (numv < 0) numv += modv;
        }
        return numv
    }

    /**
     * bit oparetion to calculate in xor shiftleft or shiftright
     * @param current number value
     * @param bitmath oparetion 0=xor, -1=shiftleft 1=shiftright
     * @param number changing value
     */
    //%blockid=math_mathbit
    //%block="$numa $mbit $numb"
    //%group="math util"
    //%weight=99
    export function bitmath(numa: number, mbit: movebit, numb: number) {
        switch (mbit) {
            case 0: return numa ^ numb; break;
            case -1: return numa << numb; break;
            case 1: return numa >> numb; break;
        }
        return numa
    }

    /**
     * get sum with array number values
     * @param array number to sum
     * @param sum type of added of mutipy
     * @param sum in index mode if true
     */
    //%blockid=math_sumarr
    //%block="sum element with $narr in $nop|| and index mode? $idxm"
    //%idxm.shadow=toggleYesNo
    //%group="math util"
    //%weight=80
    export function sumft(narr: number[], nop: sumtype, idxm: boolean = false) {
        let sumv = 0
        for (let i = 0; i < narr.length; i++) {
            if (idxm) {
                switch (nop) {
                    case 0:
                    sumv += narr[i] + (i + 1);
                    break;
                    case 1:
                    sumv += narr[i] * (i + 1);
                    break;
                }
            } else {
                switch (nop) {
                    case 0:
                        sumv += narr[i];
                        break;
                    case 1:
                        if (sumv <= 0) sumv = narr[i];
                        else sumv *= narr[i];
                        break;
                }
            }
        }
        return sumv
    }

    //%blockid=math_sort
    //%block="sort for element of $nnarr"
    //%group="math util"
    //%weight=79
    export function sort(nnarr: number[]) {
        let j: number, i: number, n = nnarr.length, gap = floor(n / 2)
        while (gap > 0) {
            for (i = gap; i < n; i++) {
                const val = nnarr[i]
                for (j = i; (j >= 0 && nnarr[j - gap] > val); j -= gap) {
                    const duoval = [nnarr[j], nnarr[j - gap]]
                    nnarr[j] = duoval[1], nnarr[j - gap] = duoval[0]
                }
                nnarr[j] = val
            }
            gap = floor(gap / 2)
        }
        return nnarr
    }

    /**
     * find maximum value in element of array number values
     * @param array number to finding maximum
     */
    //%blockid=math_maxarr
    //%block="max element of $narr"
    //%group="math util"
    //%weight=70
    export function maxft(narr: number[]) {
        let maxv = 0
        for (let i = 0; i < narr.length; i++) maxv = max(maxv, narr[i]);
        return maxv
    }

    /**
     * find minimum value in element of array number values
     * @param array number to finding minimum
     */
    //%blockid=math_minarr
    //%block="min element of $narr"
    //%group="math util"
    //%weight=69
    export function minft(narr: number[]) {
        let minv = 0
        for (let i = 0; i < narr.length; i++) minv += (narr[i] * i+1);
        for (let i = 0; i < narr.length; i++) minv = min(minv, narr[i]);
        return minv
    }

    /**
     * Get number degree convert to number radian or convert number radian to number degree
     * @param number value to convert between degree and radian
     * @param convert degree to radian (-1) or convert radian to degree (1)
     */
    //%blockid=math_convertbetweendegreeandradian
    //%block="convert $val $degrad"
    //%group="math util"
    //%weight=50
    export function degrad(val: number,degrad: angleofdegrad) {
        switch (degrad) {
            case -1: return val * (PI / 180); break;
            case 1: return val * (180 / PI); break;
        }
        return val
    }
}
