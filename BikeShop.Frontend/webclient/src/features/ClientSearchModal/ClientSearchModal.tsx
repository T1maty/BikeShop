import s from './ClientSearchModel.module.scss'
import {FC} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {ControlledCustomInput} from 'shared/ui/Controlled/ControlledCustomInput'
import {LoaderScreen} from "shared/ui/LoaderScreen/LoaderScreen"
import {Button} from 'shared/ui/Button/Button'
import {useAddNewUser} from './ClientSearchModalStore'
import {CreateUser} from 'entities/requests/CreateUser'
import {User as UserResType} from "../../entities/models/Auth/User"
import {CustomModal} from "../../shared/ui";
import {AsyncSelectSearchUser} from "../../shared/ui/AsyncSelectSearch/AsyncSelectSearchUser";
import {UserWithRoles} from "../../entities/models/Auth/UserWithRoles";
import {useSnackbar} from "notistack";

// Всплывающий модуль для поиска пользователя по ФИО или телефону и создания нового
// пользователя при необходимости

type ClientSearchModalType = {
    setIsComponentVisible: (n: boolean) => void
    isComponentVisible: boolean
    onSuccess: (user: UserResType) => void
}
type UsersType = {
    onSuccess: (user: UserResType) => void
}
export type UserInfoType = {
    user: UserResType,
}


// Компонента для создания списка всех найденных пользователей
// Если список пуст или сервер вернул другую ошибку, то вместо списка 
// выводится соответсвующее сообщение

const Users: FC<UsersType> = ({onSuccess}) => {
    const users = useAddNewUser(s => s.users)
    const errorStatus = useAddNewUser(s => s.errorStatus)

    const userList = users.map((p: UserInfoType) =>
        <div key={p.user.id} className={s.userInfo}
             onClick={() => onSuccess(p.user)}>
            User number: {p.user.phoneNumber}
        </div>)

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

const ClientSearchModal: FC<ClientSearchModalType> = ({setIsComponentVisible, isComponentVisible, onSuccess}) => {

    const create = useAddNewUser(s => s.create)
    const findUser = useAddNewUser(s => s.findUser)
    const isLoading = useAddNewUser(s => s.isLoading)
    const setUsers = useAddNewUser(s => s.setUsers)
    const {enqueueSnackbar} = useSnackbar()


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
        data.phone = '+380' + data.phone
        if (!!data.firstName) {
            const findData = {
                fio: data.firstName,
                phoneNumber: data.phone
            }
            findUser(findData)
        }
    }

    // обработчик нажатия на кнопку создания пользователя
    const handleSubmitCreate: SubmitHandler<CreateUser> = (data: CreateUser) => {
        create(data,
            (res) => {
                enqueueSnackbar('Пользователь создан и выбран', {variant: 'success', autoHideDuration: 3000})
                onSuccess(res)
                setIsComponentVisible(false)
            },
            (res) => {
                enqueueSnackbar('Ошибка создания', {variant: 'error', autoHideDuration: 3000})
                // onFailure
            })
    }

    // обработчик нажатия на кнопку отмены
    const handleCancel = () => {
        setIsComponentVisible(false)
    }

    const handleSuccessChoise = (user: UserWithRoles) => {
        setIsComponentVisible(false)
        onSuccess(user.user)
        formControl.reset()
    }

    return (
        <CustomModal
            open={isComponentVisible}
            onClose={() => {
                setIsComponentVisible(false)
            }}
        >
            <div className={s.searchPage_container}>

                {isLoading && <LoaderScreen variant={'ellipsis'}/>}

                <div className={s.searchForm_mainBox}>

                    <div className={s.select}>
                        <AsyncSelectSearchUser onSelect={handleSuccessChoise}/>
                    </div>


                    <form onSubmit={formControl.handleSubmit(handleSubmitSearch)}>

                        <div className={s.searchForm_form}>
                            <div className={s.text}>Создание нового клиента</div>
                            <div>

                                <ControlledCustomInput name={'phone'}
                                                       placeholder={'Телефон'}
                                                       control={formControl}
                                                       rules={{
                                                           // required: 'Поле обязательно для заполнения',
                                                           minLength: {
                                                               value: 10,
                                                               message: 'Минимальная длина 10 символа'
                                                           },
                                                           maxLength: {
                                                               value: 10,
                                                               message: 'Максимальная длина 10 символа'
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
                                                       rules={{
                                                           required: 'Поле обязательно для заполнения',
                                                       }}
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
        </CustomModal>
    )
}

export default ClientSearchModal
