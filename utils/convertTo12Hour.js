// utils.js
function convertTo12Hour(time24) {
  const [hours, minutes] = time24.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

module.exports = { convertTo12Hour };
