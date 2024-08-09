{
/\*_ email register
// {...register("email", {
// required: { value: true, message: "Email is required" },
// pattern: {
// value:
// /^((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)_)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$|^([0-9]{10})$/,
// message: "Enter a valid email",
// },
FULL NAME REGISTER
// {...register("fullName", {
// required: { value: true, message: "Enter Full Name" },
// minLength: { value: 4, message: "Enter Name" },
// })}
USERNAME REGISTER
{...register("username", {
required: { value: true, message: "Username required" },
minLength: {
value: 3,
message: "Enter a valid username",
},
})}
PASSWORD REGISTER
{...register("password", {
required: { value: true, message: "Password required" },
minLength: {
value: 8,
message: "Password should be 8 characters long",
},
})}
// })} \*/
}
