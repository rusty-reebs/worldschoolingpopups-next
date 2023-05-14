// import { useState } from "react";
// import Nav from "./Nav";
// import Input from "./Input";
// import Button from "./Button";
// import { supabaseAdmin } from "../supabase";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorsArray, setErrorsArray] = useState("");

//   const handleSubmit = async (e) => {
//     setErrorsArray("");
//     e.preventDefault();
//     try {
//       const { data, error } = await supabaseAdmin.auth.signInWithPassword({
//         email: email,
//         password: password,
//       });
//       console.log("👉 data", data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="bg-yellow h-screen">
//       <Nav />
//       <div className="mx-3">
//         <h3 className="text-base text-center mb-4 lg:text-2xl">
//           Sign in to your account
//         </h3>
//         <div className="lg:w-1/3 lg:mx-auto">
//           <form className="flex flex-col" onSubmit={handleSubmit}>
//             <Input
//               name="email"
//               placeholder=""
//               label="Email address"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Input
//               name="password"
//               placeholder=""
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {errorsArray
//               ? errorsArray.map((error, index) => (
//                   <p key={index} className="text-sm text-red font-bold mx-auto">
//                     {error.msg}
//                   </p>
//                 ))
//               : null}
//             <div className="flex justify-center mt-5">
//               <Button name="Submit"></Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
