export const getTimeLeft=(dateString)=> {
    // Convert the date string to a Date object
    const targetDate = new Date(dateString);

    // Get the current date
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = targetDate - currentDate;

    // Calculate days, hours, and minutes from the time difference
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    // Construct the output string
    let timeLeft = '';
    if (days > 0) {
        timeLeft += days + ' Day ';
    }
    if (hours > 0) {
        timeLeft += hours + ' hours ';
    }
    if (minutes > 0) {
        timeLeft += minutes + ' min ';
    }
    if (days <= 0 && hours <= 0 && minutes <= 0) {
        timeLeft = 'Time expired';
    }

    return timeLeft + 'Left';
}

