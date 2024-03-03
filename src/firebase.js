import {initializeApp} from 'firebase/app';
import { getDatabase } from 'firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyB3-DIQxmJiV-Uh45ummlfHek-1GlkNEls",
  authDomain: "ecommerce-blockchain-f32e4.firebaseapp.com",
  databaseURL: "https://ecommerce-blockchain-f32e4-default-rtdb.firebaseio.com",
  projectId: "ecommerce-blockchain-f32e4",
  storageBucket: "ecommerce-blockchain-f32e4.appspot.com",
  messagingSenderId: "1091541577941",
  appId: "1:1091541577941:web:9992e2210a3a2e0ca2f25c",
  measurementId: "G-QF2TZN5YP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
