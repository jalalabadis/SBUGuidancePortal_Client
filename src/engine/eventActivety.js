
export const eventActivetyData=(allcalendarDatas)=>{
    // Sort the data by date
allcalendarDatas?.sort((a, b) => new Date(a.date) - new Date(b.date));

// Initialize variables to keep track of current month and year
let currentMonth = '';
let currentYear = '';

// Mapping of month numbers to month names
const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Array to hold prepared data
const preparedData = [];

// Function to get weekday name from date
function getWeekdayName(dateString) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    return days[date.getDay()];
}

// Iterate through the sorted data
allcalendarDatas?.forEach(event => {
    const { title, description, time, date } = event;
    const [year, month, day] = date.split('-');
    const monthYear = `${month}-${year}`;
    const weekname = getWeekdayName(date);

    // Check if month has changed
    if (monthYear !== `${currentMonth}-${currentYear}`) {
        // Add spacer for new month
        preparedData.push({ type: 'spacer', month: monthNames[parseInt(month) - 1], year });
        currentMonth = month;
        currentYear = year;
    }

    // Add event data
    preparedData.push({ type: 'event', title, description, time, date, weekname, day });
});

return preparedData;
}