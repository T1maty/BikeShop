import React from 'react';
import {Input, Checkbox, Button} from '../../../shared/ui/index'
import { Typography, Stack } from '@mui/material';

const RegistrationForm = () => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        backgroundColor: '#33373B',
        width: '70%',

      }}
    >
      <Typography
        sx={{
          marginBottom: '47px'
        }}
        variant="h4"
        component="h1"
      >
        Регистрация
      </Typography>
      <Input  
        placeholder="Телефон"
      />
      <Stack
        sx={{
          padding: '4px 9px',
          flexDirection: 'row',
          alignItems: 'center',
          border: '1px solid #fff',
          borderRadius: '10px'
        }}
      >
        <Checkbox />
        <Typography>С условиями пользования ознакомлен и согласен</Typography>
      </Stack>
      <Button  
        text='Зарегистрироваться'
      />
    </Stack>
  )
}

export default RegistrationForm