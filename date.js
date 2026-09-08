import moment from 'moment';

function getCurrentDay() {
    console.log(moment().format('dddd'));
}

function getCurrentMonth() {
    console.log(moment().format('MMMM'));
}

function getCurrentYear() {
    console.log(Number(moment().format('YYYY')));
}

function getCurrentDate() {
    console.log(getCurrentDate() + " " + getCurrentMonth() + " " + getCurrentYear());
}

function isWeekend() {
    const dayOfWeek = moment().day();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        console.log("Today is a weekend");
    } else {
        console.log("Today is a weekday");
    }
}

function getDaysUntilNewYear() {
    const today = moment().startOf('day');
    const nextYear = moment().year() + 1;
    const newYearDate = moment(`${nextYear}-01-01`, 'YYYY-MM-DD');
    const days = newYearDate.diff(today, 'days');
    console.log(`${days} days until New Year`);
}

function getAge(birthday) {
    const birthDate = moment(birthday, 'YYYY-MM-DD');
    const age = moment().diff(birthDate, 'years');
    console.log(`You are ${age} years old`);
}

function getDaysUntilBirthday(birthday) {
    const today = moment().startOf('day');
    const birthDate = moment(birthday, 'YYYY-MM-DD');
    
    let nextBirthday = birthDate.clone().year(today.year());
    
    if (nextBirthday.isBefore(today)) {
        nextBirthday.add(1, 'years');
    }
    
    const days = nextBirthday.diff(today, 'days');
    console.log(`${days} days until your birthday`);
}

getCurrentDay();
getCurrentMonth();
getCurrentYear();
getCurrentDate();
isWeekend();
getDaysUntilNewYear();
getAge("2005-04-15");
getDaysUntilBirthday("2005-12-20");
