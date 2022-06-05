import { API_URL } from "../config";

// helperfunctions

/**
 *
 * @param {Date} date
 * @returns {Date} Date
 */
function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 *
 * @param {Date} date
 * @returns {Date} Date
 */
function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 *
 * @param {Date} date
 * @returns {String}
 */
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

/**
 *
 * @param {number} month number from 1 to 12 representing the 12 months of the calendar
 */
export const getReservationsByMonth = (month) => {
  const date = new Date();
  const firstDay = formatDate(getFirstDayOfMonth(date));
  const lastDay = formatDate(getLastDayOfMonth(date));

  const rawUrl = `${API_URL}/api/reservations?filters[date][$gte]=${firstDay}&filters[date][$lte]=${lastDay}&pagination[pageSize]=1000`;
  const finalUrl = encodeURI(rawUrl);
  // console.log(finalUrl);
};
