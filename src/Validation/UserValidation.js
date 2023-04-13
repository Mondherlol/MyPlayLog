import * as yup from "yup"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

export const userSchema= yup.object().shape({
    username:yup.string().required('username is required'),
    email: yup.string().email('must be a valid email').required('email is required'),
    password: yup.string().min(4,'must be at least 3 characters long').max(14,'must be maximum of 14 characters long').matches(passwordRegex,'must contain uppercase,lowercase and a number').required('password is required')
})