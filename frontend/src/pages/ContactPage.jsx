import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";

const ContactPage = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [name, setName] = useState(user ? user.fullName : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });
      const data = await response.json();
      toast(data.message);
      setName('');setEmail('');setMessage('');
    } catch (e) {
      toast.error('Error occured');
      console.error(e);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div class="form my-3">
                <label for="Name">Name</label>
                <input
                  required
                  type="text"
                  class="form-control"
                  id="Name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="form my-3">
                <label for="Email">Email</label>
                <input
                  required
                  type="email"
                  class="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="form  my-3">
                <label for="Password">Message</label>
                <textarea
                  required
                  rows={5}
                  class="form-control"
                  id="Password"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  class="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
