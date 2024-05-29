import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const ContactData = () => {
  const [allContacts, setAllContacts] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/contact`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const contactData = await response.json();
        setAllContacts(contactData.allContactData);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchContacts();
  }, []);
  return (
    <div>
      <>
        <Toaster />
        <h1 className="font-bold text-center text-xl py-10">User Reviews</h1>
        <div className="flex   justify-center items-center">
          <table className="table-auto border ">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {allContacts.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No contacts to display
                  </td>
                </tr>
              )}
              {allContacts.map((contact) => (
                <tr key={contact._id}>
                  <td className="border px-4 py-2">{contact.name}</td>
                  <td className="border px-4 py-2">{contact.email}</td>
                  <td className="border px-4 py-2">{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default ContactData;
