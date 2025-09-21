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
        basic = 0,
        //%block="index sum"
        index = 1,
        //%block="average sum"
        avg = 2,
    }

    function newArr(len: number) {
        const nularr: any[] = []
        for (let _i = 0; _i < len; _i++) nularr.push(null)
        return nularr
    }

    /**
     * get bit modulo power of two value with 'a%2^b = a&(b-1)'
     * @param number value to devide
     * @param modules devided number value and get zero if mod value equal to zero
     * @returns modulus number value if mod number is not equal to zero
     */
    //%blockid=math_mod_realcalculate
    //%block="$a mod 2^$b"
    //%a.defl=1 b.defl=1
    //%group="modulus"
    //%weight=10
    export function mod2n(a: number, b: number) {
        if (isNaN(a) || isNaN(b)) return NaN
        return b > 0 ? ((a & (b - 1)) + b) & (b - 1) : 0
    }

    /**
     * get modulo value with rem in rem '((a%b)+b)%b'
     * @param number value to devide
     * @param modules devided number value and get zero if mod value equal to zero
     * @returns modulus number value if mod number is not equal to zero
     */
    //%blockid=math_mod_original
    //%block="$a mod $b"
    //%a.defl=1 b.defl=2
    //%group="modulus"
    //%weight=9
    export function mod(a: number, b: number) {
        if (isNaN(a) || isNaN(b)) return NaN
        return b > 0 ? ((a % b) + b) % b : 0
    }

    /**
     * bit oparetion to calculate in xor shiftleft or shiftright
     * @param current number value
     * @param bitmath oparetion 0=xor, -2=shiftleft, 2=shiftright, -1=bitor, 1=bitand
     * @param operate number value
     */
    //%blockid=math_bit_calc
    //%block="$a $mbit $b"
    //%group="math bit"
    //%weight=10
    export function bitCalc(a: number, mbit: bitop, b: number) {
        if (isNaN(a) || isNaN(b)) return NaN
        switch (mbit) {
            case -2: return a << b
            case -1: return a | b
            case 0: return a ^ b
            case 1: return a & b
            case 2: return a >> b
        }
        return NaN
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
    export function sumBasic(narr: number[], sumt: sumtype, offset?: number) {
        if (narr.length <= 0) return NaN
        switch (sumt) {
            case 0: return narr.reduce((cur, val) => cur + val, 0)
            case 1: return narr.reduce((cur, val, idx) => cur + val * (offset ? (idx < Math.abs(offset) ? offset : Math.abs(idx + 1 - Math.abs(offset))) : idx + 1), offset ? offset : 0)
            case 2: return narr.reduce((cur, val) => cur + val, 0) / narr.length
        }
        return NaN
    }

    export function lerp(a: number, b: number, t: number) {
        return a + (t * (b - a))
    }

    export enum sortFormat {
        //% block="Heap Sort"
        heapSort = 0,
        //% block="Shell Sort"
        shellSort = 1,
    }

    /**is 
     * get sorted with sorting algorithm format
     * @param number array to sort
     * @param sorting algorithm format
     * @returns number array after sorting is successfully
     */
    //%blockid=math_array_sort
    //%block="get $narr sorting with $sortType"
    //%group="sort"
    //%weight=10
    export function sort(narr: number[], sortType: sortFormat) {
        if (narr.length <= 0) return null
        switch (sortType) {
            case 0: return heapSort(narr)
            case 1: return shellSort(narr)
        }
        return null
    }

    function shellSort(narr: number[]) {
        let j: number, i: number, nnarr = narr.slice(), gap = Math.floor(nnarr.length / 2)
        while (gap > 0) {
            for (i = gap; i < nnarr.length; i++) {
                const val = nnarr[i]
                for (j = i; (j >= 0 && nnarr[j - gap] > val); j -= gap) { const tmp = nnarr[j]; nnarr[j] = nnarr[j - gap], nnarr[j - gap] = tmp; }
                nnarr[j] = val
            }
            gap = Math.floor(gap / 2)
        }
        return nnarr
    }

    function heapSort(narr: number[]) {
        const sortedArray = narr.slice(), n = sortedArray.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(sortedArray, n, i);
        for (let i = n - 1; i >= 1; i--) { const tmp = sortedArray[i]; sortedArray[i] = sortedArray[0], sortedArray[0] = tmp; heapify(sortedArray, i, 0); }
        return sortedArray;
    }

    function heapify(arr: number[], n: number, rootIndex: number) {
        let currentIndex = rootIndex;
        while (true) {
            let largest = currentIndex;
            const leftChild = 2 * currentIndex + 1, rightChild = 2 * currentIndex + 2;
            if (leftChild < n && arr[leftChild] > arr[largest]) largest = leftChild;
            if (rightChild < n && arr[rightChild] > arr[largest]) largest = rightChild;
            if (largest !== currentIndex) { const tmp = arr[currentIndex]; arr[currentIndex] = arr[largest], arr[largest] = tmp; }
            else break;
        }
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
        return narr.length > 0 ? narr.reduce((cur, val) => Math.max(cur, val), narr[0]) : NaN
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
        return narr.length > 0 ? narr.reduce((cur, val) => Math.min(cur, val), narr[0]) : NaN
    }

    const d2r = Math.PI / 180

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
        return nv * d2r
    }

    const r2d = 180 / Math.PI

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
        return nv * r2d
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
        return x > 0 ? x != 1 ? Math.log(x) : 0 : NaN
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
        return n > 0 && x > 0 ? (Math.log(x) / Math.log(Math.abs(n))) : NaN
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
        return x > 0 ? x != 1 ? (Math.log(x) / Math.log(10)) : 0 : NaN
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
        return x > 0 ? x != 1 ? (Math.log(x) / Math.log(2)) : 0 : NaN
    }

    /**
     * Computes the exponential function e^x for a given value of x.
     * @param x The exponent value.
     * @returns The result of e raised to the power of x.
     */
    //%blockid=math_expn
    //%block="e^$x"
    //%group="exponential"
    //%weight=5
    export function expn(x: number) {
        return x > 0 ? Math.exp(x) : NaN
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
        if (isNaN(a) || isNaN(b)) return NaN
        while (a !== b) { if (a > b) a -= b; else b -= a; }
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
        if (isNaN(a) || isNaN(b)) return NaN
        return a == 0 || b == 0 ? 0 : Math.abs(a * b) / gcd(a, b);
    }

    /**
 * Calculate absolute with bit
 * @param x number
 * @returns bit abs value
 */
    //%blockid=math_gcd_bit
    //%block="bit abs of $x"
    //%group="number theory"
    //%weight=13
    export function babs(x: number) {
        const mask = x >> 31;
        return (x + mask) ^ mask;
    }

    /**
     * Calculate the bit greatest common divisor (GCD) of two numbers by stein'sAlgorithm
     * @param a number
     * @param b number
     * @returns gcd value
     */
    //%blockid=math_gcd_bit
    //%block="bgcd of $a and $b"
    //%group="number theory"
    //%weight=12
    export function bgcd(a: number, b: number): number {
        if (a === 0) return b;
        if (b === 0) return a;
        let shift = 0;
        while (((a | b) & 1) === 0) a >>= 1, b >>= 1, shift++;
        while ((a & 1) === 0) a >>= 1;
        while (b !== 0) { while ((b & 1) === 0) b >>= 1; if (a > b) { const temp = a; a = b, b = temp; } b = b - a; }
        return a << shift;
    }

    /**
     * Calculate the bit least common multiple (LCM) of two numbers with bit absolute and bit gcd
     * @param a number
     * @param b number
     * @returns lcm value
     */
    //%blockid=math_lcm_bit
    //%block="blcm of $a and $b"
    //%group="number theory"
    //%weight=11
    export function blcm(a: number, b: number): number {
        if (isNaN(a) || isNaN(b)) return NaN
        return a === 0 || b === 0 ? 0 : babs(a * b) / bgcd(a, b);
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
        if (n <= 1) return false;         
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        for (let i = 5; i * i <= n; i += 6) if (n % i === 0 || n % (i + 2) === 0) return false;
        return true;
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
        const factors: number[] = [];
        // Handle 2 separately
        while ((n & 1) === 0) factors.push(2), n /= 2;
        // Handle odd factors
        for (let i = 3; i * i <= n; i += 2) while ((n & (i-1)) === 0) factors.push(i), n /= i;
        // If n is a prime number greater than 2
        if (n > 2) factors.push(n);
        return factors;
    }

    /**
     * quake3 the Fast inverse square root '1/sqrt(x) = q_rsqrt(x)'
     * @param the number
     * @param iteraction number
     * @returns fast inverse square root number
     */
    //%blockid=math_sqrt_fast_inverse
    //%block="1 / sqrt($x)|| with iteration $n"
    //%n.defl=1 n.min=1 n.max=10
    //%group="math bit"
    //%weight=5
    export function q_rsqrt(x: number, n?: number): number {
        if (x < 0 || isNaN(x)) return NaN;
        if (!n || isNaN(n)) n = 1;
        const buf = pins.createBuffer(4);
        buf.setNumber(NumberFormat.Float32LE, 0, x);
        let i = buf.getNumber(NumberFormat.Int32LE, 0);
        i = 0x5f3759df - (i >> 1);
        buf.setNumber(NumberFormat.Int32LE, 0, i);
        let y = buf.getNumber(NumberFormat.Float32LE, 0);
        // n iteration Newton-Raphson
        while (n --> 0) y = y * (1.5 - ((0.5 * x) * (y * y)));
        return y;
    }



    /**
     * the Fast square root 'sqrt(x) = x*q_rsqrt(x)'
     * @param the number
     * @param iteraction number
     * @returns fast square root number
     */
    //%blockid=math_sqrt_fast
    //%block="fast sqrt($x)|| with iteration $n"
    //%n.defl=1 n.min=1 n.max=10
    //%group="math bit"
    //%weight=2
    export function q_sqrt(x: number, n?: number) {
        if (!n || isNaN(n)) n = 1;
        return x <= 0 || isNaN(x) ? NaN : x * q_rsqrt(x, n)
    }

    const pal = "0123456789abcdefghijklmnopqrstuvwxyz"

    export function dec2base(nval: number, radix: number, digit?: number) {
        const neg = nval < 0
        nval = Math.round(Math.abs(nval)), radix = Math.max(2, Math.min(radix, pal.length))
        let ntxt = ""
        while ((!digit && nval > 0) || (digit && ntxt.length < digit && nval > 0)) ntxt = pal.charAt(nval % radix) + ntxt, nval = Math.floor(nval / radix)
        if (!digit || (digit && ntxt.length > digit)) return ntxt
        while (ntxt.length < digit) ntxt = pal.charAt(0) + ntxt
        return neg ? "-" + ntxt : ntxt
    }

    export function base2dec(ntxt: string, radix: number) {
        if (ntxt.split('').some(v => pal.indexOf(v) < 0)) return NaN
        const neg = ntxt.charAt(0) == "-"
        ntxt = ntxt.toLowerCase().substr(neg ? 1 : 0, ntxt.length - (neg ? 1 : 0)), radix = Math.clamp(2, pal.length, radix)
        const nval = ntxt.split('').map((v, i) => (Math.max(0, pal.indexOf(v)) * radix ** (ntxt.length - i - 1))).reduce((cur, val) => (cur + val), 0)
        return neg ? -nval : nval
    }

}

