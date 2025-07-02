
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
    }

    /**
     * get modules by normal number or negative number to get modules by another
     * @param number value to devide
     * @param modules devided number value and get zero if mod value equal to zero
     * @returns modulus number value if mod number is not equal to zero
     */
    //%blockid=math_modval
    //%block="$n mod $m"
    //%numv.defl=1 modv.defl=2
    //%group="modulus"
    //%weight=10
    export function mod(n: number, m: number) {
        return m <= 0 ? 0 : ((n % m) + m) % m
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
        switch (mbit) {
            case -2: return a << b
            case -1: return a | b
            case 0: default: return a ^ b
            case 1: return a & b
            case 2: return a >> b
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
    export function sumBasic(narr: number[], sumt: sumtype, offset?: number) {
        switch (sumt) {
            case 0: default: return narr.reduce((cur, val) => cur + val, 0)
            case 1: return narr.reduce((cur, val, idx) => cur + val * (offset ? (idx < abs(offset) ? offset : abs(idx + 1 - abs(offset))) : idx + 1), offset | 0)
        }
    }

    /**
     * get sorted with shell sort
     * @param number array to sort
     * @returns number array after sorting is done
     */
    //%blockid=math_sort_shell
    //%block="shell sort for element of $narr"
    //%group="sort"
    //%weight=10
    export function sortShell(narr: number[]) {
        let j: number, i: number, nnarr = narr.slice(), n = nnarr.length, gap = floor(n / 2)
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
        return narr.length > 0 ? narr.reduce((cur, val) => max(cur, val), narr[0]) : 0
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
        return narr.length > 0 ? narr.reduce((cur, val) => min(cur, val), narr[0]) : 0
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
        return x > 0 ? log(x) : 0
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
    export function lnv(n: number, x: number) {
        return n > 0 && x > 0 ? (log(x) / log(abs(n))) : 0
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
    export function ln10(x: number) {
        return x > 0 ? (log(x) / log(10)) : 0
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
    export function ln2(x: number) {
        return x > 0 ? (log(x) / log(2)) : 0
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
        while (b !== 0) { const temp = b;
            b = a % b, a = temp; }
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
        return a == 0 || b == 0 ? 0 : abs(a * b) / gcd(a, b); // Use Math.abs to ensure the LCM is positive
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
        for (let i = 5; i * i <= n; i += 6) if (n % i === 0 || n % (i + 2) === 0) return false;
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
        const factors: number[] = [];
        // Handle 2 separately
        while (n % 2 === 0) factors.push(2), n /= 2;
        // Handle odd factors
        for (let i = 3; i * i <= n; i += 2) while (n % i === 0) factors.push(i), n /= i;
        // If n is a prime number greater than 2
        if (n > 2) factors.push(n);
        return factors;
    }

    function floatToInt(f: number): number {
        const buf = control.createBuffer(4)
        buf.setNumber(NumberFormat.Float32LE, 0, f)
        return buf.getNumber(NumberFormat.Int32LE, 0)
    }

    function intToFloat(i: number): number {
        const buf = control.createBuffer(4)
        buf.setNumber(NumberFormat.Int32LE, 0, i)
        return buf.getNumber(NumberFormat.Float32LE, 0)
    }

    /**
     * quake3 the Fast inverse square root
     * @param the number
     * @returns fast inverse square root number
     */
    //%blockid=math_sqrt_quake3
    //%block="1/sqrt($n)|| in real math? $real=toggleYesNo"
    //%group="math bit"
    //%weight=5
    export function rsqrtss(n: number, real?: boolean): number {
        const threehalfs = 1.5

        let x2 = n * 0.5, y = n

        // convert float to int with float32 bit conversion
        let yBits = floatToInt(y)
        // Magic number 0x5f3759df and bit shift
        yBits = 0x5f3759df - (yBits >> 1)
        // convert back from int to float
        y = intToFloat(yBits)
        // Newton-Raphson iteration
        // 1st iteration
        y = y * (threehalfs - (x2 * y * y))
        // 2nd iteration if using real math
        if (real) y = y * (threehalfs - (x2 * y * y))
        return y
    }

    const pal = "0123456789abcdefghijklmnopqrstuvwxyz"

    export function dec2base(nval: number, radix: number, digit?: number) {
        const neg = nval < 0
        nval = round(abs(nval)), radix = constrain(radix, 2, pal.length)
        let ntxt = ""
        while ((!digit && nval > 0) || (digit && ntxt.length < digit && nval > 0)) ntxt = pal.charAt(nval % radix) + ntxt, nval = floor(nval / radix)
        if (!digit || (digit && ntxt.length > digit)) return ntxt
        while (ntxt.length < digit) ntxt = pal.charAt(0) + ntxt
        return neg ? "-" + ntxt : ntxt
    }

    export function base2dec(ntxt: string, radix: number) {
        const neg = ntxt.charAt(0) == "-"
        ntxt = ntxt.toLowerCase().substr(neg ? 1 : 0, ntxt.length - (neg ? 1 : 0)), radix = constrain(radix, 2, pal.length)
        const nval = ntxt.split('').map((v, i) => (max(0, pal.indexOf(v)) * radix ** (ntxt.length - i - 1))).reduce((cur, val) => (cur + val), 0)
        return neg ? -nval : nval
    }

}
