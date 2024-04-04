import axios from 'axios'

const url = 'https://final-0t4v.onrender.com/news'
export const fetchNews = () => axios.get(url);

const url2 = 'https://final-0t4v.onrender.com/admin/news/add-news'
export const setNews = (newNews) => axios.post(url2, newNews)

const url3 = 'https://final-0t4v.onrender.com/admin/appointments/add-appointment'
export const setAppointment = (newAppointment) => axios.post(url3, newAppointment)// api.js

