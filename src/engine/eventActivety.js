export const eventActivetyData = (allcalendarDatas) => {
    // Mapping of month numbers to month names
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Initialize an object to hold events grouped by month and year
    const groupedEvents = {};

    // Function to get weekday name from date
    function getWeekdayName(dateString) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const date = new Date(dateString);
        return days[date.getDay()];
    }

    // Iterate through the data
    allcalendarDatas?.forEach(event => {
        const { _id, Mstimer, submission, title, description, time, date } = event;
        const [year, month, day] = date.split('-');
        const monthYear = `${monthNames[parseInt(month) - 1]} ${year}`;
        const weekname = getWeekdayName(date);

        // Create an array for the month if it doesn't exist
        if (!groupedEvents[monthYear]) {
            groupedEvents[monthYear] = [];
        }

        // Add event data to the array for the month
        groupedEvents[monthYear].push({
            _id,
            submission,
            Mstimer,
            type: 'event',
            title,
            description,
            time,
            date,
            month: monthNames[parseInt(month) - 1],
            year,
            weekname,
            day
        });
    });

    // Convert the groupedEvents object into an array of objects
    const formattedData = Object.keys(groupedEvents).map(key => ({
        [key]: groupedEvents[key]
    }));

    // Sort the formattedData array by month and year
    formattedData.sort((a, b) => {
        const [monthA, yearA] = Object.keys(a)[0].split(' ');
        const [monthB, yearB] = Object.keys(b)[0].split(' ');

        // Sort by year first
        if (yearA !== yearB) {
            return yearB - yearA;
        }
        // If years are the same, sort by month
        return monthNames.indexOf(monthB) - monthNames.indexOf(monthA);
    });

    return formattedData;
}
