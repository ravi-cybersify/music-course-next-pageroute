import { AllRegisterUser, LoggedUser, UserProps } from "@/Redux/userSlice";
// import dynamic from 'next/dynamic';
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// const {LoggedUser} = dynamic(() => import('../Redux/userSlice'), {
//   ssr: false,
// });

interface User {
  userName: string;
  password: string;
  email: string;
  phone: string | number;
  address: string;
}

const Form = () => {
  const pathname = usePathname();
  const navigate = useRouter();
  const dispatch = useDispatch();

  const AllRegisterUsers = useSelector(
    (state: { user: { AllRegisterUser: UserProps[] } }) =>
      state.user.AllRegisterUser
  );
  console.log("allregisteruser", AllRegisterUsers);


  const [errors, setErrors] = useState<User>({
    userName: "",
    password: "",
    email: "",
    phone: "",
    address: "",
  });
  const [user, setUser] = useState<User>({
    userName: "",
    password: "",
    email: "",
    phone: "",
    address: "",
  });

  const validateValues = (user: User) => {
    if (!user.userName) {
      errors.userName = "Username is require";
    }
    if (!user.email) {
      errors.email = "Email is require";
    }
    if (!user.password) {
      errors.password = "Password is require";
    }
    if (!user.phone) {
      errors.phone = "phone is require";
    }
    if (!user.address) {
      errors.address = "Address is require";
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pathname === "/register") {
      setErrors(validateValues(user));

      if (
        user.userName !== "" &&
        user.password !== "" &&
        user.email !== "" &&
        user.phone !== "" &&
        user.address !== ""
      ) {
        dispatch(
          AllRegisterUser({
            username: user.userName,
            password: user.password,
            email: user.email,
          })
        );
        // localStorage.setItem("user", JSON.stringify(user));
        toast("Register Successfully !!", {
          position: "top-center",
          autoClose: 1000,
        });

        navigate.push("/login");
      }
    }

    if (pathname === "/login") {
      setErrors(validateValues(user));
      // const userInfo = localStorage.getItem("user");
      // const userData = userInfo ? JSON.parse(userInfo) : "";

      if (AllRegisterUsers.length !== 0) {
        const userData =  AllRegisterUsers.filter((regUser:UserProps)=> regUser.username === user.userName && regUser.password === user.password )
         console.log("object", userData); 
          if(userData.length !== 0){
              dispatch(
                LoggedUser({
                  username: user.userName,
                  password: user.password,
                  email: user.email,
                })
              );
              toast("Login Successfully !!", {
                position: "top-center",
                autoClose: 1000,
              });
              navigate.push("/");
            } else {
              toast("Please Enter Correct Username and Password !!", {
                position: "top-center",
                autoClose: 1000,
              });
            }
          
      } else {
        toast("Please Signup Username and Password !!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    }  

    setUser({
      userName: "",
      password: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex justify-center items-center flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          name="userName"
          className="rounded-3xl px-4 py-1 border"
          value={user.userName}
          onChange={(e) =>
            setUser((prevState) => ({
              ...prevState,
              userName: e.target.value,
            }))
          }
        />
        {errors.userName && user?.userName?.length === 0 && (
          <span className="text-red-600">{errors.userName}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name">Password:</label>
        <input
          type="password"
          name="password"
          className="rounded-3xl px-4 py-1 border"
          value={user.password}
          onChange={(e) =>
            setUser((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />
        {errors.password && user?.password?.length === 0 && (
          <span className="text-red-600">{errors.password}</span>
        )}
      </div>

      {pathname === "/register" && (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              name="email"
              className="rounded-3xl px-4 py-1 border"
              value={user.email}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
            {errors.email && user?.email?.length === 0 && (
              <span className="text-red-600">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Phone:</label>
            <input
              type="tel"
              minLength={10}
              maxLength={10}
              name="phone"
              className="rounded-3xl px-4 py-1 border"
              value={user.phone}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  phone: e.target.value,
                }))
              }
            />
            {errors.phone && user?.phone === "" && (
              <span className="text-red-600">{errors.phone}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Address:</label>
            <input
              type="text"
              name="address"
              className="rounded-3xl px-4 py-1 border"
              value={user.address}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  address: e.target.value,
                }))
              }
            />
            {errors.address && user?.address?.length === 0 && (
              <span className="text-red-600">{errors.address}</span>
            )}
          </div>
        </>
      )}
      <div className="">
        <button
          type="submit"
          className="bg-[#00aeef] text-white w-full text-md font-semibold mt-2 px-4 py-1 rounded-xl tracking-wide"
        >
          {pathname === "/register" ? "Submit" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Form;
