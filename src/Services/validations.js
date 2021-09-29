import * as yup from "yup";

export const validationSchemaSignup = yup.object({
    firstname: yup
        .string('Enter Your First Name')
        .required('First Name is Required'),
    lastname: yup
        .string('Enter Your Last Name')
        .required('Last Name is Required'),
    username: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is Required'),
    confirmpassword: yup
        .string("Confirm Password")
        .required("Confirm Password is Required")
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        }),
    dob: yup
        .date("Enter Date of Birth")
        .required("Date of Birth is Required")
        .test("age", "You must be 18 or older", function (birthdate) {
            const cutoff = new Date();
            cutoff.setFullYear(cutoff.getFullYear() - 18);
            return birthdate <= cutoff;
        }),
    pmdcid: yup
        .string("Enter PMDCID")
        .required("PMDC ID is Required"),
    specialization: yup
        .string("Enter you Spicialization")
        .required("Specilization is Required"),
    city: yup
        .string("Enter you Practice City")
        .required("Practice City is Required"),
    gender: yup
        .string("Select a Gender")
        .required("Gender is Required")
})


export const validationSchemaLogin = yup.object({
    username: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(4, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});


export const validationSchemePatient = yup.object({
    firstname: yup
        .string('Enter Your First Name')
        .required('First Name is Required'),
    lastname: yup
        .string('Enter Your Last Name')
        .required('Last Name is Required'),
    username: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is Required'),
    confirmpassword: yup
        .string("Confirm Password")
        .required("Confirm Password is Required")
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        }),
    dob: yup
        .date("Enter Date of Birth")
        .required("Date of Birth is Required")
        .test("age", "You must be 18 or older", function (birthdate) {
            const cutoff = new Date();
            cutoff.setFullYear(cutoff.getFullYear() - 18);
            return birthdate <= cutoff;
        }),
    city: yup
        .string("Enter you City")
        .required("City is Required"),
    gender: yup
        .string("Select a Gender")
        .required("Gender is Required"),
})
