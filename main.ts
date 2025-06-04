
namespace Math {

    export enum bitop {
        //%block="^"
        xor = 0,
        //%block="<<"
        left = -2,
        //%block=">>"
        right = 2,
        //%block="&"
        and = 1,
        //%block="|"
        or = -1
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
    //%group="modulus"
    //%weight=10
    export function mod(numv: number, modv: number) {
        modv = abs(modv)
        if (modv <= 0) return 0
        return ((numv % modv) + modv) % modv
    }

    /**
     * bit oparetion to calculate in xor shiftleft or shiftright
     * @param current number value
     * @param bitmath oparetion 0=xor, -2=shiftleft, 2=shiftright, -1=bitor, 1=bitand
     * @param number changing value
     */
    //%blockid=math_bit_calc
    //%block="$numa $mbit $numb"
    //%group="math bit"
    //%weight=10
    export function bitOperate(numa: number, mbit: bitop, numb: number) {
        switch (mbit) {
            case 0: default: return numa ^ numb; break;
            case -2: return numa << numb; break;
            case -1: return numa | numb; break;
            case 2: return numa >> numb; break;
            case 1: return numa & numb; break;
        }
    }

    /**
     * get sum with array number values
     * @param array number to sum
     * @param sum type of added of mutipy 0=basicsum, 1=indexsum
     * @param offset number in sum starter
     * @returns after sum is done
     */
    //%blockid=math_sum_basic
    //%block="basic sum on element of $narr in $sumt|| and start at $offset"
    //%offset.defl=1
    //%group="sum"
    //%weight=10
    export function sumBasic(narr: number[], sumt: sumtype, offset: number = 0) { offset = abs(offset)
        let sumv = (offset > 0 && sumt <= 0)?offset:0
        for (let i = 0; i < narr.length; i++) {
            switch (sumt) {
                case 0: default: sumv += narr[i]; break;
                case 1: sumv += narr[i] * ((offset > 0)?((i <= offset)?offset:abs(i-offset)):i+1); break;
            }
        }
        return sumv
    }

    /**
     * get sorted with shell sort
     * @param number array to sort
     * @returns number array after sorting is done
     */
    //%blockid=math_sort_shell
    //%block="shell sort for element of $nnarr"
    //%group="sort"
    //%weight=10
    export function sortShell(nnarr: number[]) {
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
    //%group="min and max"
    //%weight=10
    export function maxArr(narr: number[]) {
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
    //%group="min and max"
    //%weight=5
    export function minArr(narr: number[]) {
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
    //%group="angle convert"
    //%weight=10
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
    //%group="angle convert"
    //%weight=5
    export function rad2deg(nv: number) {
        return nv * (180 / PI)
    }

    /**
     * Computes the natural logarithm ln(x) for a given value of x.
     * @param x The input value.
     * @returns The natural logarithm of x.
     */
    //%blockid=math_ln
    //%block="log $x"
    //%group="exponential"
    //%weight=15
    export function ln(x: number) {
        return log(x)
    }

    /**
     * Computes the base-n logarithm logn(x) for a given value of x.
     * @param n The base log value.
     * @param x The input value.
     * @returns The base-n logarithm of x.
     */
    //%blockid=math_lnv
    //%block="log base $n of $x"
    //%group="exponential"
    //%weight=10
    export function logn(n: number, x: number) {
        n = abs(n)
        if (n <= 1) return log(x)
        return (log(x) / log(n))
    }

    /**
     * Computes the base-10 logarithm log10(x) for a given value of x.
     * @param x The input value.
     * @returns The base-10 logarithm of x.
     */
    //%blockid=math_lnv_log10
    //%block="log base 10 of $x"
    //%group="exponential"
    //%weight=9
    export function log10(x: number) {
        return (log(x) / log(10))
    }

    /**
     * Computes the base-2 logarithm log2(x) for a given value of x.
     * @param x The input value.
     * @returns The base-2 logarithm of x.
     */
    //%blockid=math_lnv_log2
    //%block="log base 2 of $x"
    //%group="exponential"
    //%weight=8
    export function log2(x: number) {
        return (log(x) / log(2))
    }

    /**
     * Computes the exponential function e^x for a given value of x.
     * @param x The exponent value.
     * @returns The result of e raised to the power of x.
     */
    //%blockid=math_expv
    //%block="e^$x"
    //%group="exponential"
    //%weight=5
    export function expv(x: number) {
        return exp(x)
    }

    /**
     * Calculate the greatest common divisor (GCD) of two numbers
     * @param a number
     * @param b number
     * @returns gcd value
     */
    //%blockid=math_gcd
    //%block="gcd of $a and $b"
    //%group="number theory"
    //%weight=20
    export function gcd(a: number, b: number): number {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    /**
     * Calculate the least common multiple (LCM) of two numbers
     * @param a number
     * @param b number
     * @returns lcm value
     */
    //%blockid=math_lcm
    //%block="lcm of $a and $b"
    //%group="number theory"
    //%weight=15
    export function lcm(a: number, b: number): number {
        if (a === 0 || b === 0) return 0; // Handle cases where one of the numbers is 0
        return Math.abs(a * b) / gcd(a, b); // Use Math.abs to ensure the LCM is positive
    }

    /**
     * Check if a number is prime
     * @param n number
     * @returns n number is prime number
     */
    //%blockid=math_isprime
    //%block="$n is prime number"
    //%group="number theory"
    //%weight=10
    export function isPrime(n: number): boolean {
        if (n <= 1) return false; // Numbers less than or equal to 1 are not prime
        if (n <= 3) return true;  // 2 and 3 are prime
        if (n % 2 === 0 || n % 3 === 0) return false; // Multiples of 2 and 3 are not prime
        // Check for factors from 5 to sqrt(n)
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true; // If no factors were found, n is prime
    }

    /**
     * Factorize a number into its prime factors
     * @param n number
     * @returns prime factors number
     */
    //%blockid=math_prime_factors
    //%block="factor of $n"
    //%group="number theory"
    //%weight=5
    export function factorize(n: number): number[] {
        if (n < 1) return []; // Handle cases where n is less than 1
        let factors: number[] = [];
        // Handle 2 separately
        while (n % 2 === 0) {
            factors.push(2);
            n /= 2;
        }
        // Handle odd factors
        for (let i = 3; i * i <= n; i += 2) {
            while (n % i === 0) {
                factors.push(i);
                n /= i;
            }
        }
        // If n is a prime number greater than 2
        if (n > 2) {
            factors.push(n);
        }
        return factors;
    }

    function matrix(mnum: (number[][]), negative: boolean = false) {
        if (negative) {
            if (mnum.length > 0) {
                for (let i = 0;i < mnum.length;i++) {
                    let aval = mnum[i]
                    for (let j = 0;j < aval.length;j++) {
                        (mnum[i] as number[])[j] = -(aval as number[])[j]
                    }
                }
            }
        }
        return mnum
    }

    function matrixAdd(mna: number[][], mnb: number[][]) {
        if (mna.length !== mnb.length) return [[]]
        for (let i = 0;i < mna.length;i++) if (mna[i].length !== mnb[i].length) return[[]]
        for (let i = 0;i < mna.length;i++) {
            for (let j = 0;j < mna[i].length;j++) {
                mna[i][j] += mnb[i][j]
            }
        }
        return mna
    }

    function matrixSub(mna: number[][], mnb: number[][]) {
        if (mna.length !== mnb.length) return [[]]
        for (let i = 0; i < mna.length; i++) if (mna[i].length !== mnb[i].length) return [[]]
        for (let i = 0; i < mna.length; i++) {
            for (let j = 0; j < mna[i].length; j++) {
                mna[i][j] -= mnb[i][j]
            }
        }
        return mna
    }

    function matrixOneMul(mna: number[][], nv: number) {
        if (mna.length <= 0) return [[]]
        for (let i = 0; i < mna.length; i++) if (mna[i].length <= 0) return [[]]
        for (let i = 0; i < mna.length; i++) {
            for (let j = 0; j < mna[i].length; j++) {
                mna[i][j] *= nv
            }
        }
        return mna
    }

    function matrixOneDiv(mna: number[][], nv: number) {
        if (mna.length <= 0) return [[]]
        for (let i = 0; i < mna.length; i++) if (mna[i].length <= 0) return [[]]
        for (let i = 0; i < mna.length; i++) {
            for (let j = 0; j < mna[i].length; j++) {
                if (abs(nv) > 0) mna[i][j] /= nv
                else mna[i][j] = 0
            }
        }
        return mna
    }

    function matrixTrans(mna: number[][]) {
        if (mna.length <= 0) return [[]]
        for (let i = 0; i < mna.length; i++) if (mna[i].length !== mna.length) return [[]]
        const mnb = []
        for (let d = 0; d < mna.length + mna[0].length - 1; d++) {
            let i = d < mna.length ? d : mna.length - 1;
            let j = d - mna.length;
            while (i >= 0 && j < mna[0].length) {
                mnb.push(mna[abs(i)][abs(j)])
                i--
                j++
            }
        }
        for (let i = 0;i < mnb.length;i++) {
            const x = i % mnb.length, y = floor(i / mnb.length)
            mna[x][y] = mnb[i]
        }
        return mna
    }

}
