import { object, string } from 'yup'

export const LoginSchema = object({
  email: string().required("Email is required"),
  password: string().required("Password is required"),
})

export const RegisterSchema = object({
  username: string()
    .min(3)
    .max(30)
    .trim()
    .required("Username is required"),
  email:
    string()
      .email()
      .lowercase()
      .required("Email is required"),
  password:
    string()
      .min(6, "Password must be at least 6 characters long")
      .max(150)
      .required("Password is required"),
})

// export const UserSchema = yup.object().shape({
//   email: yup
//     .string()
//     .email()
//     .lowercase()
//     .required("Email is required")
//     .defined(),
//   username: yup
//     .string()
//     .min(3)
//     .max(30)
//     .trim()
//     .required("Username is required")
//     .defined(),
// });

// export const ResetPasswordSchema = yup.object().shape({
//   newPassword: yup
//     .string()
//     .min(6, "Password must be at least 6 characters long")
//     .max(150)
//     .required("New password is required")
//     .defined(),
//   confirmNewPassword: yup
//     .string()
//     .oneOf([yup.ref("newPassword"), undefined], "Passwords do not match")
//     .required("Confirm new password is required")
//     .defined(),
// });

// export const ChangePasswordSchema = yup.object().shape({
//   currentPassword: yup.string().required("Old Password is required").defined(),
//   newPassword: yup
//     .string()
//     .min(6, "Password must be at least 6 characters long")
//     .max(150)
//     .required("New password is required")
//     .defined(),
//   confirmNewPassword: yup
//     .string()
//     .oneOf([yup.ref("newPassword"), undefined], "Passwords do not match")
//     .required("Confirm new password is required")
//     .defined(),
// });

// export const ForgotPasswordSchema = yup.object().shape({
//   email: yup
//     .string()
//     .email()
//     .lowercase()
//     .required("Email is required")
//     .defined(),
// });
