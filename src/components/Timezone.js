export const currentDate = new Date();
export const day = currentDate.getDate();
export const month = currentDate.getMonth() + 1; 
export const year = currentDate.getFullYear();
export const hours = currentDate.getHours();
export const minutes = currentDate.getMinutes();
export const seconds = currentDate.getSeconds();

export const formattedDate = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;