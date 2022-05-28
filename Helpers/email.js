const nodemailer = require("nodemailer");

const otpTemplate = (otp) => {
    return `
<style>
        html,
body {
    margin: 0 auto !important;
    padding: 0 !important;
    height: 100% !important;
    width: 100% !important;
    background: #f1f1f1;
}

* {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}

div[style*="margin: 16px 0"] {
    margin: 0 !important;
}

table,
td {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}

table {
    border-spacing: 0 !important;
    border-collapse: collapse !important;
    table-layout: fixed !important;
    margin: 0 auto !important;
}

img {
    -ms-interpolation-mode:bicubic;
}

a {
    text-decoration: none;
}

*[x-apple-data-detectors],
.unstyle-auto-detected-links *,
.aBn {
    border-bottom: 0 !important;
    cursor: default !important;
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}

.a6S {
    display: none !important;
    opacity: 0.01 !important;
}

.im {
    color: inherit !important;
}

img.g-img + div {
    display: none !important;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
    u ~ div .email-container {
        min-width: 320px !important;
    }
}
@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
    u ~ div .email-container {
        min-width: 375px !important;
    }
}

@media only screen and (min-device-width: 414px) {
    u ~ div .email-container {
        min-width: 414px !important;
    }
}

    </style>
<style>

	    .primary{
	background: #30e3ca;
}
.bg_white{
	background: #ffffff;
}
.bg_light{
	background: #fafafa;
}
.bg_black{
	background: #000000;
}
.bg_dark{
	background: rgba(0,0,0,.8);
}
.email-section{
	padding:2.5em;
}
.btn{
	padding: 10px 15px;
	display: inline-block;
}
.btn.btn-primary{
	border-radius: 5px;
	background: #30e3ca;
	color: #ffffff;
}
.btn.btn-white{
	border-radius: 5px;
	background: #ffffff;
	color: #000000;
}
.btn.btn-white-outline{
	border-radius: 5px;
	background: transparent;
	border: 1px solid #fff;
	color: #fff;
}
.btn.btn-black-outline{
	border-radius: 0px;
	background: transparent;
	border: 2px solid #000;
	color: #000;
	font-weight: 700;
}

h1,h2,h3,h4,h5,h6{
	font-family: 'Lato', sans-serif;
	color: #000000;
	margin-top: 0;
	font-weight: 400;
}

body{
	font-family: 'Lato', sans-serif;
	font-weight: 400;
	font-size: 15px;
	line-height: 1.8;
	color: rgba(0,0,0,.4);
}

a{
	color: #30e3ca;
}

table{
}

.logo h1{
	margin: 0;
}
.logo h1 a{
	color: #30e3ca;
	font-size: 24px;
	font-weight: 700;
	font-family: 'Lato', sans-serif;
}
.hero{
	position: relative;
	z-index: 0;
}

.hero .text{
	color: rgba(0,0,0,.3);
}
.hero .text h2{
	color: #000;
	font-size: 40px;
	margin-bottom: 0;
	font-weight: 400;
	line-height: 1.4;
}
.hero .text h3{
	font-size: 24px;
	font-weight: 300;
}
.hero .text h2 span{
	font-weight: 600;
	color: #30e3ca;
}
.heading-section{
}
.heading-section h2{
	color: #000000;
	font-size: 28px;
	margin-top: 0;
	line-height: 1.4;
	font-weight: 400;
}
.heading-section .subheading{
	margin-bottom: 20px !important;
	display: inline-block;
	font-size: 13px;
	text-transform: uppercase;
	letter-spacing: 2px;
	color: rgba(0,0,0,.4);
	position: relative;
}
.heading-section .subheading::after{
	position: absolute;
	left: 0;
	right: 0;
	bottom: -10px;
	content: '';
	width: 100%;
	height: 2px;
	background: #30e3ca;
	margin: 0 auto;
}

.heading-section-white{
	color: rgba(255,255,255,.8);
}
.heading-section-white h2{
	font-family: 
	line-height: 1;
	padding-bottom: 0;
}
.heading-section-white h2{
	color: #ffffff;
}
.heading-section-white .subheading{
	margin-bottom: 0;
	display: inline-block;
	font-size: 13px;
	text-transform: uppercase;
	letter-spacing: 2px;
	color: rgba(255,255,255,.4);
}


ul.social{
	padding: 0;
}
ul.social li{
	display: inline-block;
	margin-right: 10px;
}

.footer{
	border-top: 1px solid rgba(0,0,0,.05);
	color: rgba(0,0,0,.5);
}
.footer .heading{
	color: #000;
	font-size: 20px;
}
.footer ul{
	margin: 0;
	padding: 0;
}
.footer ul li{
	list-style: none;
	margin-bottom: 10px;
}
.footer ul li a{
	color: rgba(0,0,0,1);
}


@media screen and (max-width: 500px) {


}


    </style>
<div style="display: none; font-size: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
<div class="email-container" style="max-width: 600px; margin: 0 auto;">
<table style="margin: auto;" role="presentation" border="0">
<tbody>
<tr>
<td class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
<table role="presentation" border="0">
<tbody>
<tr>
<td class="logo" style="text-align: center;">
<h1><a href="#">e-Verify</a></h1>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td class="hero bg_white" style="padding: 3em 0 2em 0;"><img style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;" src="https://res.cloudinary.com/daqjgm9mu/image/upload/v1646824218/Press71/others/email_bijjsn.png" alt=""></td>
</tr>
<tr>
<td class="hero bg_white" style="padding: 2em 0 4em 0;">
<table>
<tbody>
<tr>
<td>
<div class="text" style="padding: 0 2.5em; text-align: center;">
<h2>Please verify your email</h2>
<h3>Amazing deals, updates, interesting news right in your place!</h3>
<p><a class="btn btn-primary" href="#">${otp}</a></p>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table style="margin: auto;" role="presentation" border="0">
<tbody>
<tr>
<td class="bg_light footer email-section">
<table>
<tbody>
<tr>
<td style="padding-top: 20px;">
<table role="presentation" border="0">
<tbody>
<tr>
<td style="text-align: left; padding-right: 10px;">
<h3 class="heading">About</h3>
<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
</td>
</tr>
</tbody>
</table>
</td>
<td style="padding-top: 20px;">
<table role="presentation" border="0">
<tbody>
<tr>
<td style="text-align: left; padding-left: 5px; padding-right: 5px;">
<h3 class="heading">Contact Info</h3>
<ul>
<li><span class="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
<li><span class="text">+2 392 3929 210</span></li>
</ul>
</td>
</tr>
</tbody>
</table>
</td>
<td style="padding-top: 20px;">
<table role="presentation" border="0">
<tbody>
<tr>
<td style="text-align: left; padding-left: 10px;">
<h3 class="heading">Useful Links</h3>
<ul>
<li><a href="#">Code Station-21</a></li>
<li><a href="#">Press71</a></li>
<li><a href="#">Github</a></li>
</ul>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td class="bg_light" style="text-align: center;">
<p>Press 71. A news media platform</p>
</td>
</tr>
</tbody>
</table>
</div>
    `
}

module.exports.sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        auth: {
            user: "web@codestation21.com",
            pass: "Picachu47@47/"
        }
    });
    await transporter.sendMail({
        from: 'web@codestation21.com',
        to: options.email,
        subject: options.subject,
        html: otpTemplate(options.code),
    });
};