export const Validate =(data,type)=>{
    const errors = {}
    if (!data.email){
        errors.email = "Email is required"
    }else if (!/\S+@\S+\.\S+/.test(data.email)){
        errors.email = "Email address is invalid"
    }else {
        delete errors.email
    }

    if (!data.password){
        errors.password = "Password is required"
    }else if (data.password.length < 8){
        errors.password = "password need to be 8 characters or more"
    }else {
        delete errors.password
    }

    if ( type === "SignUp"){
        if (!data.name.trim()){
            errors.name ="Username is required"
        }else {
            delete errors.name
        }
        if (!data.confirmPassword){
            errors.confirmPassword ="confirm the password"
        }else if (data.confirmPassword !== data.password){
            errors.confirmPassword = "Password do not match"
        }else {
            delete errors.confirmPassword
        }

        if (data.isChecked){
            delete errors.isChecked
        }else {
            errors.isChecked = "Accept our regulations"
        }
    }

    return errors
}