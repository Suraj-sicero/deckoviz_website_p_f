import axios from "axios";

async function testSignup() {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      email: "vedmanirn15@gmail.com",
      password: "password123"
    });
    console.log("Signup success:", res.data);
  } catch (err) {
    console.error("Signup failed:", err.response?.data || err.message);
  }
}

testSignup();
