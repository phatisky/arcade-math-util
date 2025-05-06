
namespace Math {

    export enum movebit {
        //%block="^"
        xor = 0,
        //%block="<<"
        left = -1,
        //%block=">>"
        right = 1,
    }

    export enum sumtype {
        //%block="basic sum"
        basicsum = 0,
        //%block="index sum"
        indexsum = 1,
    }

    /**
     * get modules by normal number or negative number to get modules by another
     * @param number value to devide
     * @param modules devided number value and get zero if mod value equal to zero
     * @returns modulus number value if mod number is not equal to zero
     */
    //%blockid=math_modval
    //%block="$numv mod $modv"
    //%numv.defl=1 modv.defl=2
    //%group="math util"
    //%weight=100
    export function mod(numv: number, modv: number) {
        modv = abs(modv)
        if (modv <= 0) return 0;
        let modE = floor(max(E, floor(modv / E)))
        while (numv >= modv || numv < 0) {
            if (numv >= modv) numv -= (numv - modv**modE > modv)?modv**modE:modv;
            else if (numv < 0) numv += (numv + modv**modE < 0)?modv**modE:modv;
        }
        return numv
    }

    /**
     * bit oparetion to calculate in xor shiftleft or shiftright
     * @param current number value
     * @param bitmath oparetion 0=xor, -1=shiftleft, 1=shiftright
     * @param number changing value
     */
    //%blockid=math_mathbit
    //%block="$numa $mbit $numb"
    //%group="math util"
    //%weight=99
    export function bitmath(numa: number, mbit: movebit, numb: number) {
        switch (mbit) {
            case 0: default: return numa ^ numb; break;
            case -1: return numa << numb; break;
            case 1: return numa >> numb; break;
        }
    }

    /**
     * get sum with array number values
     * @param array number to sum
     * @param sum type of added of mutipy
     * @param offset number in sum
     * @returns after sum is done
     */
    //%blockid=math_sumbasic
    //%block="basic sum on element of $narr in $sumt|| and start at $offset"
    //%group="math util"
    //%weight=80
    export function basicsum(narr: number[], sumt: sumtype, offset: number = 0) { offset = abs(offset)
        let sumv = (offset > 0 && sumt <= 0)?offset:0
        for (let i = 0; i < narr.length; i++) {
            switch (sumt) {
                case 0: default: sumv += narr[i]; break;
                case 1: sumv += narr[i] * ((offset > 0)?(i <= offset)?offset:abs(i-offset):i+1); break;
            }
        }
        return sumv
    }

    /**
     * get sorted with shell sort
     * @param number array to sortsort
     * @returns number array after sorting is done
     */
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
     * @returns maximum number value
     */
    //%blockid=math_maxarr
    //%block="max element of $narr"
    //%group="math util"
    //%weight=70
    export function maxft(narr: number[]) {
        if (narr.length <= 0) return 0
        let nv = narr[0]
        for (const vl of narr) nv = max(nv,vl)
        return nv
    }

    /**
     * find minimum value in element of array number values
     * @param array number to finding minimum
     * @returns minimum number value
     */
    //%blockid=math_minarr
    //%block="min element of $narr"
    //%group="math util"
    //%weight=69
    export function minft(narr: number[]) {
        if (narr.length <= 0) return 0
        let nv = narr[0]
        for (const vl of narr) nv = min(nv,vl)
        return nv
    }

    /**
     * get convert number value from degree to radian
     * @param degree number
     * @returns radian number
     */
    //%blockid=math_deg2rad
    //%block="convert degree $nv to radian"
    //%group="math util"
    //%weight=49
    export function deg2rad(nv: number) {
        return nv * (PI / 180)
    }

    /**
     * get convert number value from radian to degree
     * @param radian number
     * @returns degree number
     */
    //%blockid=math_rad2deg
    //%block="convert radian $nv to degree"
    //%group="math util"
    //%weight=48
    export function rad2deg(nv: number) {
        return nv * (180 / PI)
    }
}
