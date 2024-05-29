import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Baby, BadgeIndianRupee, Calendar, Moon, User } from "lucide-react";
import { Divider } from "@nextui-org/divider";
import { useAuth } from "../../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
const CustomModal = ({ isOpen, onOpenChange, checkIn, checkOut, adults, children, totalNights, price, roomDetails }) => {
  const totalPrice = price * totalNights;
  const { token, user } = useAuth();


  const handleCheckout = async (totalPrice) => {
    const bookingDetails = {
      roomId: roomDetails?._id,
      imgUrl: roomDetails?.roomImages[0],
      checkIn,
      checkOut,
      adults,
      children,
      totalPrice,
    }
    const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/key`, {
      method: "GET",
    });
    const { key } = await data.json();

    try {
      const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ totalPrice }),
      });

      const data = await resp.json();
      const { booking: { id, amount } } = data;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "Ayush Khatri",
        description: "Hotel Booking System",
        image: "https://res-console.cloudinary.com/chatappmern/media_explorer_thumbnails/ab1091f4301fec8e00169fbf7a349920/detailed",
        order_id: id,
        handler: async function (response) {
          try {
            console.log(response);
            const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/checkout/paymentVerification`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                bookingDetails
              }),
            });

            const data = await resp.json();
            if (data.success) {
              toast.success("Payment successfull!");
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (error) {
            console.log(error);
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: user?.user?.username,
          email: user?.user?.email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const dateFormat = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }
  return (
    <>
      <Toaster />

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <h1 className="flex flex-col gap-1 font-extrabold text-xl pt-5">Booking Details</h1>
                <ul className="flex flex-col font-semibold gap-1">
                  <li className="flex gap-1 text-lg">
                    <p>
                      Dates : {dateFormat(checkIn)} - {dateFormat(checkOut)}
                    </p>
                    <span>
                    </span>
                  </li>
                  <li className="flex gap-1 text-lg">
                    <p>
                      Adult: {adults}
                    </p>
                  </li>
                  <li className="flex gap-1 text-lg">
                    <p>
                      Children: {children}
                    </p>
                  </li>
                  <li className="flex gap-1 text-lg">
                    <p>
                      Nights: {totalNights}
                    </p>
                  </li>
                  <div className="py-1">
                    <Divider />
                  </div>
                  <h1 className="text-lg font-extrabold">Price Details</h1>
                  <li className="flex justify-between gap-1 text-lg">
                    <p>
                      Total Price: {` ₹${price} x ${totalNights} nights`}
                    </p>
                    <p>
                      ₹{price * totalNights}
                    </p>
                  </li>
                  <li className="flex justify-between gap-1 text-lg">
                    <p>
                      Taxes:
                    </p>
                    <p>
                      {"-"}
                    </p>
                  </li>
                  <li className="flex font-extrabold justify-between gap-1 text-lg">
                    <p>
                      Grand Total(INR):
                    </p>
                    <p>
                      ₹{price * totalNights}
                    </p>
                  </li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button onClick={() => handleCheckout(totalPrice)} color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

  );

}

export default CustomModal;
