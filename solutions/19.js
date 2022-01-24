import { template } from '../helpers/template.js';

/**
 * You are given the following information, but you may prefer to do some research for yourself.

 1 Jan 1900 was a Monday.
 Thirty days has September,
 April, June and November.
 All the rest have thirty-one,
 Saving February alone,
 Which has twenty-eight, rain or shine.
 And on leap years, twenty-nine.
 A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
 How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
 */

const TEST_ANSWER = 2;
const TEST_ARGS = {
    start: 1900,
    end: 1900
}

const ARGS = {
    start: 1901,
    end: 2000,
}

/**
 *
 * Jan - 31
 * Feb -
 * March - 31
 * April - 30
 * May - 31
 * June - 30
 * July - 31
 * August - 31
 * September - 30
 * October - 31
 * November - 30
 * December 31
 */
const DAYS_IN_WEEK = 7;

const DAYS_MONTH = {
    1: 31,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
}
const STARTING_YEAR = 1900
const SUNDAY = 'sunday';
const DAYS_OF_WEEK = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
    7: SUNDAY
}
const getDaysPerMonth = (month, year) => {
    if (DAYS_MONTH[month]) return DAYS_MONTH[month];
    // check for century
    if (year % 100 === 0) {
        return year % 400 === 0 ? 29 : 28
    }
    // check divisible by 4
    return (year % 4 === 0) ? 29 : 28
}

const getDayOfWeek = (startDay, daysToAdd) => {
    const sum = startDay + daysToAdd;
    if (DAYS_OF_WEEK[sum]) return sum
    return sum - DAYS_IN_WEEK;
}

const getStartDayOfNextMonth = (startingDay, month, year) => {
    const daysPerMonth = getDaysPerMonth(month, year);
    const extraDays = daysPerMonth % DAYS_IN_WEEK;
    return getDayOfWeek(startingDay, extraDays);
}

const isSunday = (dayOfWeek) => DAYS_OF_WEEK[dayOfWeek] === SUNDAY

const getDaysPerYear = (year) => {
    let days = 0;
    for (let month = 1; month <= 12; month++) {
        days += getDaysPerMonth(month, year)
    }
    return days;
}


const solution = ({ start, end }) => {
    let count = 0;
    let startDay = 1; // monday for 1900
    // always start at 1900 since we know what day the year and month starts on
    for (let year = STARTING_YEAR; year <= end; year++) {
        for (let month = 1; month <= 12; month++) {
            const nextMonthStartDay = getStartDayOfNextMonth(startDay, month, year);
            if (year >= start) {
                if (isSunday(nextMonthStartDay)) {
                    count++
                }
            }
            startDay = nextMonthStartDay
        }
    }
    return count
}

template(ARGS, TEST_ARGS, TEST_ANSWER, solution)