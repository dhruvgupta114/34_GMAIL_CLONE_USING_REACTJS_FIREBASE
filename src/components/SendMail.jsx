import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/appSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const SendMail = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const open = useSelector((store) => store.appSlice.open)
  const dispatch = useDispatch()

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    // console.log(formData)
    await addDoc(collection(db,"emails"), {
        to: formData.to,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
    })
    dispatch(setOpen(false))
    setFormData({
        to: "",
        subject: "",
        message: "",
    })
  }

  return (
    <div
      className={` ${
        open ? "block" : "hidden"
      } bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}
    >
      <div className="rounded-t-md flex px-3 py-2 bg-[#f2f6fc] justify-between">
        <h1>New Message</h1>
        <div
          onClick={() => dispatch(setOpen(false))}
          className="p-2 rounded-e-full hover:bg-gray-200 cursor-pointer"
        >
          <RxCross2 size={"10px"} />
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        action=""
        className="flex flex-col p-3 gap-2"
      >
        <input
          onChange={changeHandler}
          value={formData.to}
          name="to"
          type="text"
          placeholder="To"
          className="outline-none py-1"
        />
        <input
          onChange={changeHandler}
          value={formData.subject}
          name="subject"
          type="text"
          placeholder="Subject"
          className="outline-none py-1"
        />
        <textarea
          onChange={changeHandler}
          value={formData.message}
          name="message"
          cols={"30"}
          rows={"10"}
          className="outline-none py-1"
          id=""
        ></textarea>
        <button
          type="submit"
          className="bg-[#0b57d0] rounded-full w-fit px-4 text-white font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMail;
