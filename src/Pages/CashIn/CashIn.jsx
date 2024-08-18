
import { Input } from "@material-tailwind/react";
import GetUserData from "../../Hooks/GetUserData";
import { toast, ToastContainer } from "react-toastify";
import useAxioxSecure from "../../Hooks/useAxioxSecure";
import Swal from "sweetalert2";

const CashIn = () => {
  const { data } = GetUserData();
  const axiosSecure = useAxioxSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const sendingInfo = form.sendingInfo.value;
    const amount = parseFloat(form.amount.value);
    const sendingData = {
      sendingInfo,
      amount,
      ...data,
    };

    if (amount >= 50) {
      Swal.fire({
        title: "Are you sure?",
        html: `You won't be able to send <br/> Cash In request `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post("/cashIn", sendingData).then((res) => {
            if (res?.data?.insertedId) {
              Swal.fire({
                title: "Cash In",
                text: "Cash In Request Sended .",
                icon: "success",
              });
              form.reset() ;
            } else {
              toast.error(res.data === "Invalid Number !" && "Not a agent !");
            }
          });
        }
      });
    } else {
      toast.warning("Less than 50 taka is not allowed for Cash In");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col w-full mx-auto items-center justify-center">
      <h1 className="play text-4xl mb-10 font-semibold">Cash In</h1>
      <div className="flex bg-[#8b8b8b] text-black gro px-10 py-10 rounded-lg w-2/4 flex-col items-center justify-center gap-3">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 w-2/4">
          <Input
            type="text"
            name="sendingInfo"
            required
            color="white"
            label="Agent Phone"
          />
          <Input
            type="number"
            name="amount"
            required
            color="white"
            label="Amount"
          />
          <input
            type="submit"
            value="Proceed"
            className="btn btn-outline text-white w-full"
          />
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CashIn;
