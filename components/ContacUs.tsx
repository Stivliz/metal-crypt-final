"use client";

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export const ContactUs = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm('service_vyhuujn', 'template_eswyah5', form.current, 'nupALPb0boK3rwJkL')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your email was sent",
        showConfirmButton: false,
        timer: 1500,
      });
    
  };

  return (
    <form
      className="flex flex-col w-full p-6 bg-black border border-gray-700 rounded-lg shadow-lg space-y-4"
      ref={form}
      onSubmit={sendEmail}
    >
      <label className="text-gray-400 font-semibold text-lg">Name</label>
      <input
        className="bg-gray-800 text-gray-300 p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
        type="text"
        name="user_name"
        placeholder="Your Name"
      />

      <label className="text-gray-400 font-semibold text-lg">Email</label>
      <input
        className="bg-gray-800 text-gray-300 p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
        type="email"
        name="user_email"
        placeholder="Your Email"
      />

      <label className="text-gray-400 font-semibold text-lg">Message</label>
      <textarea
        className="bg-gray-800 text-gray-300 p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
        name="message"
        placeholder="Write your message..."
      />

      <input
        className="bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 cursor-pointer border border-gray-600"
        type="submit"
        value="Send"
      />
    </form>


  );
};
