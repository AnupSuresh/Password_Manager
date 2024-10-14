// import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  let [passArr, setPassArr] = useState([]);
  const shBtnRef = useRef();
  const passRef = useRef();
  const [form, setform] = useState({
    siteName: "",
    username: "",
    password: "",
  });

  const getPass = async () => {
    let passwords = await fetch("http://localhost:3000/");
    passwords = await passwords.json();
    // let passwords = localStorage.getItem("passwords");

    setPassArr(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getPass();
  }, []);
  useEffect(() => {
    console.log(passArr); // This will log the latest state whenever passArr changes
    // console.log(form);
  }, [passArr]);

  const showHidePass = () => {
    // alert("show pass");
    if (shBtnRef.current.src.includes("icons/iconmonstr-eye-9.svg")) {
      shBtnRef.current.src = "icons/eye_cross.svg";
      passRef.current.type = "text";
      passRef.current.style.color = "white";
    } else {
      shBtnRef.current.src = "icons/iconmonstr-eye-9.svg";
      passRef.current.type = "password";
      passRef.current.style.color = "cyan";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePass = async () => {
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });

    setPassArr([...passArr, { ...form, id: uuidv4() }]);
    console.log("test", { ...form, id: uuidv4() });
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify([...passArr, { ...form, id: uuidv4() }])
    // );
    let req = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });
    req = await req.json();
    console.log(req);
    setform({
      siteName: "",
      username: "",
      password: "",
    });
    toast.success("🦄 Password Saved!", {
      position: "bottom-right",
      autoClose: 3002,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      progressClassName: "bg-cyan-500",
      icon: <FaCheckCircle className="text-cyan-500" />,
    });
  };
  const deletePass = async (id) => {
    let c = confirm("Are you sure you want to delete this Password?");
    if (c) {
      setPassArr(passArr.filter((i) => i.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passArr.filter((i) => i.id !== id))
      // );
      let req = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      req = await req.json();
      console.log(req);

      console.log("deleted password with id: ", id);
      toast.success("🦄 Password Deleted!", {
        position: "bottom-right",
        autoClose: 3002,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        progressClassName: "bg-cyan-500",
        icon: <FaCheckCircle className="text-cyan-500" />,
      });
    }
  };
  const delAll = async () => {
    let c = confirm("Are you sure you want to delete all the Passwords?");
    if (c) {
      setPassArr([]);
      // localStorage.clear("passwords");
      let req = await fetch("http://localhost:3000/all", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      req = await req.json();
      console.log(req);

      console.log("deleted all passwords");
      toast.success("🦄All Passwords Deleted!", {
        position: "bottom-right",
        autoClose: 3002,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        progressClassName: "bg-cyan-500",
        icon: <FaCheckCircle className="text-cyan-500" />,
      });
    }
  };

  const editPass = (id) => {
    setform({ ...passArr.filter((i) => i.id === id)[0], id: id });
    console.log({ ...passArr.filter((i) => i.id === id)[0], id: id });
    setPassArr(passArr.filter((i) => i.id !== id));
    console.log("editing password with id: ", id);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("🦄 Copied to Clipboard!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const TABLE_HEAD = ["SITE (URL)", "USERNAME", "PASSWORD", "ACTIONS"];

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#020617_40%,#63e_100%)]"></div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="md:mcontainer text-white max-w-6xl pt-0 min-w-60 sm:mx-auto px-8">
        <div>
          <div className="titleDiv flex flex-col justify-center items-center bg-slate-950">
            <h1 className=" sm:text-2xl text-xl font-bold flex flex-row justify-center items-center">
              <span className="text-cyan-400">&lt;</span>
              <img
                src="icons/password.png"
                alt="site-logo"
                className="sm:w-10 w-8"
              />
              Pass
              <span className="text-cyan-400">
                OP
                <span className="text-cyan-400 px-2">/&gt;</span>
              </span>
            </h1>
            <p>Your own Password Manager</p>
          </div>
          <div className="inputs w-full flex flex-col gap-6 mt-6">
            <input
              type="text"
              name="siteName"
              id="siteName"
              className=" border-cyan-400 rounded-full border p-4 py-2 bg-slate-900 text-white"
              placeholder="Enter Website URL"
              onChange={handleChange}
              value={form.siteName}
            />
            <div className="flex flex-col justify-between gap-6 md:flex-row">
              <input
                type="text"
                name="username"
                id="username"
                className=" w-full border border-cyan-400 rounded-full p-4 py-2 text-white flex-1 bg-slate-900 min-w-52"
                placeholder="Enter Username"
                onChange={handleChange}
                value={form.username}
              />
              <div className="passDiv relative flex-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passRef}
                  className="min-w-52 w-full border border-cyan-400 rounded-full p-4 py-2 text-cyan-400 flex-1 pr-8 bg-slate-900"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  value={form.password}
                />
                <span
                  className=" absolute top-2.5 right-1.5  cursor-pointer pr-1"
                  onClick={showHidePass}
                >
                  <img
                    ref={shBtnRef}
                    src="icons/iconmonstr-eye-9.svg"
                    alt="eye icon"
                  />
                </span>
              </div>
            </div>
            <button
              className=" border-2 border-white self-center rounded-full px-4 py-1 bg-cyan-400 flex justify-center gap-1 items-center text-black font-bold hover:bg-cyan-300"
              onClick={savePass}
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>{" "}
              <span className=" text-sm">Add Password</span>
            </button>
          </div>
        </div>
        <div className="passwords mt-4">
          <span className="flex justify-between items-center">
            <h2 className=" text-lg sm:text-2xl font-bold">Your Passwords:</h2>
            <button
              className=" border-2 border-white self-center rounded-full px-4 py-1 bg-cyan-400 flex justify-center gap-1 items-center text-black font-bold hover:bg-cyan-300"
              onClick={delAll}
            >
              <lord-icon
                src="https://cdn.lordicon.com/skkahier.json"
                trigger="hover"
                style={{ width: "25px", height: "25px" }}
              ></lord-icon>
              <span className=" text-sm">Delete All</span>
            </button>
          </span>
          {passArr.length === 0 && (
            <div className=" text-sm">NO PASSWORDS TO SHOW</div>
          )}
          {passArr.length !== 0 && (
            <Card className="h-full w-full overflow-y-scroll mt-4 rounded-lg border-cyan-400 border-b box-content">
              <div className="sm:max-h-[236px] md:max-h-[248px] max-h-[246px] lg:max-h-[236px] z-10">
                <table className="w-full table-auto border-collapse relative sm:min-w-fit">
                  <thead className=" sticky top-0 bg-slate-900 z-10">
                    <tr className="bg-blue-gray-50">
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="p-4 text-center font-bold leading-none text-cyan-300 border-b border-cyan-400"
                        >
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="sm:text-md text-xs"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {passArr.map(
                      ({ siteName, username, password, id }, index) => {
                        const isLast = index === passArr.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-cyan-400";

                        return (
                          <tr
                            key={id}
                            className={`text-center overf ${
                              index === 0 ? "rounded-t-lg" : ""
                            } ${isLast ? "rounded-b-lg" : ""}`}
                          >
                            <td className={classes}>
                              <Typography
                                variant="paragraph"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <span className="flex justify-center items-center gap-2">
                                  <a
                                    href={
                                      siteName.includes("localhost") ||
                                      siteName.includes("127.0.0.1")
                                        ? siteName // If it's a local URL, use it directly
                                        : `http://${siteName}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {siteName}
                                  </a>
                                  <img
                                    src="icons/copy.png"
                                    className="text-white cursor-pointer"
                                    width={20}
                                    alt="copy-icon"
                                    onClick={() => {
                                      copyText(siteName);
                                    }}
                                  />
                                </span>
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="paragraph"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <span className="flex justify-center items-center gap-2">
                                  {username}
                                  <img
                                    src="icons/copy.png"
                                    className="text-white cursor-pointer"
                                    width={20}
                                    alt="copy-icon"
                                    onClick={() => {
                                      copyText(username);
                                    }}
                                  />
                                </span>
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="paragraph"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <span className="flex justify-center items-center gap-2">
                                  {password}
                                  <img
                                    src="icons/copy.png"
                                    className="text-white cursor-pointer"
                                    width={20}
                                    alt="copy-icon"
                                    onClick={() => {
                                      copyText(password);
                                    }}
                                  />
                                </span>
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                as="a"
                                href="#"
                                variant="paragraph"
                                color="blue-gray"
                                className="font-medium"
                              >
                                <span>
                                  <lord-icon
                                    src="https://cdn.lordicon.com/oqaajvyl.json"
                                    trigger="hover"
                                    style={{ height: "25px" }}
                                    onClick={() => {
                                      editPass(id);
                                    }}
                                  ></lord-icon>
                                  <lord-icon
                                    src="https://cdn.lordicon.com/vlnvqvew.json"
                                    trigger="hover"
                                    style={{ height: "25px" }}
                                    onClick={() => {
                                      deletePass(id);
                                    }}
                                  ></lord-icon>
                                </span>
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
