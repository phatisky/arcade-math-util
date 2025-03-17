namespace Math {

    export enum opaetion {
        //%block="+"
        add = 0,
        //%block="-"
        sub = 1,
        //%block="×"
        mul = 2,
        //%block="÷"
        dvi = 3,
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
            continue;
        }
        return sumv
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
        for (let v of narr) maxv = max(v, maxv);
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
        let minv = maxft(narr)
        for (let v of narr) minv = min(v, minv);
        return minv
    }

    /**
     * Get number degree convert to number radian
     * @param degree value to convert
     */
    //%blockid=math_degtorad
    //%block="convert degree $deg to radian"
    //%group="math util"
    //%weight=50
    export function deg2rad(deg: number) {
        return deg * (PI / 180)
    }

    /**
     * Get number radian convert to number degree
     * @param radian value to convert
     */
    //%blockid=math_radtodeg
    //%block="convert radian $rad to degree"
    //%group="math util"
    //%weight=49
    export function rad2deg(rad: number) {
        return rad / (PI * 180)
    }
}
