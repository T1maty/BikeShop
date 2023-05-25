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
const User: FC<UserType> = (props) => {
    return (
        <div className={s.userInfo}>
            User number: {props.userInfo.user.phoneNumber}
        </div>
    )
}

const Users = () => {
    const users = useAddNewUser(s => s.users)
    console.log(users)
    // const users: UserInfoType[] = [{user: 1}, {user: 2}, {user: 3}]   // импорт списка юзеров из стора после запроса данных
    const userList = users.map( (p: UserInfoType) => <User key={p.user.id} userInfo={p}/>)

    return <>{userList}</>
}

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
    const handleSubmitSearch: SubmitHandler<CreateUser> = (data: CreateUser) => {
        console.log('search', data)
        if (!!data.firstName || !!data.lastName || !!data.patronymic || !!data.phone) {
            const findData = {
                fio: data.firstName+' '+data.lastName+' '+data.patronymic,
                phoneNumber: data.phone
            }
            console.log('findData', findData)
            findUser(findData)
        }      
    }

    const handleSubmitCreate: SubmitHandler<CreateUser> = (data: CreateUser) => {
        console.log('create:', data)
        create(data, 
            (res) => {
                console.log(res)
                setIsComponentVisible(false)
            },
            (res) => {
                console.log(res)
            })
    }
     
    

    if (isLoading) {
        return <LoaderScreen variant={'ellipsis'}/>
    } else {
        return (
        <div className={s.searchPage_container}>
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
                                                        required: 'Поле обязательно для заполнения',
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
                            <Button buttonDivWrapper={s.cancel_Button}>
                                Отмена
                            </Button> 
                        </div>
                    </div>    
                </form>
            </div>
        </div>
)}}

export default ClientSearchModal
