import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWDO68PhUV3y7PL6CGPYqHH_Tk6UmUwm0",
  authDomain: "simplexclassifier.firebaseapp.com",
  databaseURL: "https://simplexclassifier-default-rtdb.firebaseio.com",
  projectId: "simplexclassifier",
  storageBucket: "simplexclassifier.appspot.com",
  messagingSenderId: "84073702270",
  appId: "1:84073702270:web:816a52b224ef3aa544892f",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);