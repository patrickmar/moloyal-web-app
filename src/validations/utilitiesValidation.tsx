import * as yup from "yup";
import parsePhoneNumberFromString, {
  isValidPhoneNumber,
} from "libphonenumber-js";

export const validationSchema = yup.object({
  accountNo: yup
    .string()
    .min(10, "Account No can not be less than 10 characters")
    .max(16, "Acount No can not be more than 16 characters")
    .typeError("Account no must be valid")
    .required("Please enter your meter or account no."),
  //   .test({
  //     name: 'is-phone',
  //     skipAbsent: true,
  //     test(value, ctx) {
  //       if (!value.startsWith(0)) {
  //         return ctx.createError({ message: 'Phone Number missing correct prefix' })
  //       }
  //     //   if (!value.endsWith('-42a')) {
  //     //     return ctx.createError({ message: 'Phone Number missing correct suffix' })
  //     //   }
  //       if (value.length < 10 || value.length > 11) {
  //         return ctx.createError({ message: 'Phone Number is not the right length' })
  //       }
  //       return true
  //     }
  //   }),
  provider: yup.string().trim().required("Please choose your provider"),
  amount: yup
    .number()
    .min(50, "Amount can not be less than 50")
    .max(500000, "Amount must be less than 500,000")
    .typeError("Amount must be a number")
    .required("Please enter your amount"),
});
