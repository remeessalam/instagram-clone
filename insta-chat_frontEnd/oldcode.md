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

# Spinner code

const Spinner = () => {
return (
<div className="container">
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
</div>
);
};

export default Spinner;

/\* .container {
--uib-size: 23px;
--uib-color: rgb(200, 200, 200);
--uib-speed: 1s;
--uib-stroke: 2px;
position: relative;
display: flex;
align-items: center;
justify-content: flex-start;
height: var(--uib-size);
width: var(--uib-size);
}

.line {
position: absolute;
top: 0;
left: calc(50% - var(--uib-stroke) / 2);
display: flex;
align-items: flex-start;
height: 100%;
width: var(--uib-stroke);
}

.line::before {
content: "";
height: 27%;
width: 100%;
border-radius: calc(var(--uib-stroke) / 2);
background-color: var(--uib-color);
animation: pulse calc(var(--uib-speed)) ease-in-out infinite;
transition: background-color 0.3s ease;
transform-origin: center bottom;
}

.line:nth-child(1) {
transform: rotate(calc(360deg / -12 \* 1));

&::before {
animation-delay: calc(var(--uib-speed) / -12 _ 1);
}
}
.line:nth-child(2) {
transform: rotate(calc(360deg / -12 _ 2));

&::before {
animation-delay: calc(var(--uib-speed) / -12 _ 2);
}
}
.line:nth-child(3) {
transform: rotate(calc(360deg / -12 _ 3));

&::before {
animation-delay: calc(var(--uib-speed) / -12 _ 3);
}
}
.line:nth-child(4) {
transform: rotate(calc(360deg / -12 _ 4));

&::before {
animation-delay: calc(var(--uib-speed) / -12 _ 4);
}
}
.line:nth-child(5) {
transform: rotate(calc(360deg / -12 _ 5));

&::before {
animation-delay: calc(var(--uib-speed) / -12 _ 5);
}
}
.line:nth-child(6) {
transform: rotate(calc(360deg / -12 _ 6));

&::before {
animation-delay: calc(var(--uib-speed) / -12 _ 6);
}
}
.line:nth-child(7) {
transform: rotate(calc(360deg / -12 _ 7));

&::before {
animation-delay: calc(var(--uib-speed) / -12 _ 7);
}
}
.line:nth-child(8) {
transform: rotate(calc(360deg / -12 _ 8));

&::before {
animation-delay: calc(var(--uib-speed) / -12 _ 8);
}
}
.line:nth-child(9) {
transform: rotate(calc(360deg / -12 _ 9));

&::before {
animation-delay: calc(var(--uib-speed) / -12 _ 9);
}
}
.line:nth-child(10) {
transform: rotate(calc(360deg / -12 _ 10));

&::before {
animation-delay: calc(var(--uib-speed) / -12 _ 10);
}
}
.line:nth-child(11) {
transform: rotate(calc(360deg / -12 _ 11));

&::before {
animation-delay: calc(var(--uib-speed) / -12 \* 11);
}
}

@keyframes pulse {
0%,
80%,
100% {
transform: scaleY(0.75);
opacity: 0;
}
20% {
transform: scaleY(1);
opacity: 1;
}
} \*/
