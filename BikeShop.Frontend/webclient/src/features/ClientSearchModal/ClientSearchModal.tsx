import { Errors } from 'entities/errors/workspaceErrors'
import s from './ClientSearchModel.module.scss'
import { Dispatch, FC, SetStateAction } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ControlledCustomInput } from 'shared/ui/Controlled/ControlledCustomInput'
import { LoaderScreen } from "shared/ui/LoaderScreen/LoaderScreen"
import { Button } from 'shared/ui/Button/Button'
import { useAddNewUser } from './ClientSearchModalStore'
import { CreateUser } from 'entities/requests/CreateUser'
import {User as UserResType}  from "../../entities/models/Auth/User"

// Всплывающий модуль для поиска пользователя по ФИО или телефону и создания нового
// пользователя при необходимости

type ClientSearchModalType = {
    setIsComponentVisible: Dispatch<SetStateAction<boolean>>
}
type UserType = {
    key?: string,
    userInfo: UserInfoType
}
export type UserInfoType = {
    user: UserResType,
}

// Компонента для создания элемента списка всех найденных пользователей
// В качестве примера пока выводится только телефон пользователя

const User: FC<UserType> = (props) => {
    return (
        <div className={s.userInfo}>
            User number: {props.userInfo.user.phoneNumber}
        </div>
    )
}

// Компонента для создания списка всех найденных пользователей
// Если список пуст или сервер вернул другую ошибку, то вместо списка 
// выводится соответсвующее сообщение

const Users = () => {
    const users = useAddNewUser(s => s.users)
    const errorStatus = useAddNewUser(s => s.errorStatus)

    const userList = users.map( (p: UserInfoType) => <User key={p.user.id} userInfo={p}/>)

    return (
        <div>
            {errorStatus}
            {userList}
        </div>
    )
}

// Основная компонента содержит форму ввода данных. В ней нужно проверить и настроить
// валидацию и обязательность полей в соответствии с api сервера. 
// Возможно для поиска и создания пользователя они разные

// Во время получения данных с сервера выводится крутилка

const ClientSearchModal: FC<ClientSearchModalType> = ({setIsComponentVisible}) => {
    
    const create = useAddNewUser(s => s.create)
    const findUser = useAddNewUser(s => s.findUser)
    const isLoading = useAddNewUser(s => s.isLoading)

    const formControl = useForm<CreateUser>({
        defaultValues: {
            phone: '',
            firstName: '',
            lastName: '',
            patronymic: '',
        }
    })

    // обработчик нажатия на кнопку поиска пользователя
    const handleSubmitSearch: SubmitHandler<CreateUser> = (data: CreateUser) => {
        if (!!data.firstName) {
            const findData = {
                fio: data.firstName,
                phoneNumber: data.phone
            }
            console.log('findData', findData)
            findUser(findData)
        }      
    }

    // обработчик нажатия на кнопку создания пользователя
    const handleSubmitCreate: SubmitHandler<CreateUser> = (data: CreateUser) => {
        create(data, 
            (res) => {
                console.log(res)
                setIsComponentVisible(false)
            },
            (res) => {
                console.log(res)
            })
    }
    
    // обработчик нажатия на кнопку отмены
    const handleCancel = () => {
        setIsComponentVisible(false)
    }
    
    return (
    <div className={s.searchPage_container}>

        { isLoading && <LoaderScreen variant={'ellipsis'}/>}

        <div className={s.searchForm_mainBox}>
            <form onSubmit={formControl.handleSubmit(handleSubmitSearch)}>
                <Button className={s.search_submitButton} buttonDivWrapper={s.wrapper_submitButton}
                    type="submit">
                    Поисковый запрос
                </Button>
                <div>
                    <Users />
                </div>
                <div className={s.searchForm_form}>
                    <div>
                        <ControlledCustomInput name={'phone'}
                                                placeholder={'Телефон'}
                                                control={formControl}
                                                rules={{
                                                    // required: 'Поле обязательно для заполнения',
                                                    minLength: {
                                                        value: 4,
                                                        message: 'Минимальная длина 4 символа'
                                                    },
                                                    pattern: {
                                                        value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                                                        message: 'Неверный формат номера телефона'
                                                    }
                                                }}
                                                divClassName={s.searchInput}
                        />
                    </div>
                    <div>
                        <ControlledCustomInput name={'firstName'}
                                                placeholder={'Имя'}
                                                control={formControl}
                                                divClassName={s.searchInput}
                        />
                    </div>
                    <div>
                        <ControlledCustomInput name={'lastName'}
                                                placeholder={'Фамилия'}
                                                control={formControl}
                                                divClassName={s.searchInput}
                        />
                    </div>
                    <div>
                        <ControlledCustomInput name={'patronymic'}
                                                placeholder={'Отчество'}
                                                control={formControl}
                                                divClassName={s.searchInput}
                                                
                        />
                    </div>
                    <div className={s.create_buttons}>
                        <Button buttonDivWrapper={s.create_submitButton}
                            type="button"
                            onClick={formControl.handleSubmit(handleSubmitCreate)}>
                            Создать
                        </Button>
                        <Button buttonDivWrapper={s.cancel_Button}
                            onClick={formControl.handleSubmit(handleCancel)}>
                            Отмена
                        </Button> 
                    </div>
                </div>    
            </form>
        </div>
    </div>
)}

export default ClientSearchModal
