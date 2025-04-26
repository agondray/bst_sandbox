export const TWO_SECONDS_MS = 2000;

export const isWithinTimeLimit = (startTime, limit = TWO_SECONDS_MS) => {
    if (Date.now() - startTime >= limit) {
        console.log(`* * * This is taking more than ${limit / 1000} seconds! * * *`)
        return false;
    }

    return true
}

export default { isWithinTimeLimit };