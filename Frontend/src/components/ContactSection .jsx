import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
const ContactSection = () => {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactFormData.name,
          email: contactFormData.email,
          message: contactFormData.message,
        }),
      });

      const data = await response.json();
      toast(data.message);

      if (response.ok) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <section className="py-16" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-14 text-center">Contact Us</h2>
          <div className="flex flex-col items-center md:flex-row gap-8 lg:px-24  px-2">
            {/* <div className="w-full md:w-1/2">
              <iframe
                src="https://www.google.com/maps/embed?&loading=async&pb=!1m18!1m12!1m3!1d3758557.486357545!2d65.25202811249997!3d23.080020299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3950b99b859cc945%3A0xea1f7fdb53d9c38d!2sShree%20Maruti%20Hotel!5e0!3m2!1sen!2sin!4v1707106145667!5m2!1sen!2sin"
                width="600"
                height="450"
              ></iframe>
            </div> */}
            <div className="w-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  required
                  name="name"
                  value={contactFormData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="border rounded-md px-4 py-2  border-zinc-950"
                />
                <input
                  type="email"
                  required
                  name="email"
                  value={contactFormData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="border rounded-md px-4 py-2 border-zinc-950"
                />
                <textarea
                  name="message"
                  required
                  onChange={handleChange}
                  value={contactFormData.message}
                  placeholder="Your Message"
                  rows="4"
                  className="border rounded-md px-4 py-2 border-zinc-950"
                ></textarea>
                <button
                  type="submit"
                  className="flex-1 bg-red-700 text-white text-center py-2 rounded-md font-semibold hover:bg-red-00 transition duration-300"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
