import { TextField } from "@mui/material"
import { useState } from "react"
import { IInput } from "./IInput"

const InputUI = ({placeholder}: IInput) => {


  return (
    <TextField
      placeholder={placeholder}
    />
  )
}

export default InputUI