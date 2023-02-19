import axios from 'axios'
import app from 'App';
const axiosStorage = axios.create({
  baseURL: import.meta.env.VITE_STORAGE_URL
})

const requestInterceptor = config => {
  config.headers['Accept'] = 'multipart/form-data'
  config.headers['X-Client'] = 'React'
  config.headers['Authorization'] = `${app.isLoggedIn() ? 'Bearer ' + app.token() : null}`
  if (localStorage.getItem('locale')) {
    config.headers['Locale'] = localStorage.getItem('locale')
  }
  return config
}
axiosStorage.interceptors.request.use(requestInterceptor)

const uploadToStorage = async (url, data) => {
  return await axiosStorage
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response?.data)
}

const deleteFromStorage = async (url, data) => {
  return await axiosStorage
    .post(url, data, {
      headers: {
        'Content-Type': 'applicatoin/json'
      }
    })
    .then(response => response?.data)
}

export { deleteFromStorage }
export { uploadToStorage }
