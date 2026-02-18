import { Table, Column, Model, DataType, Default, Unique, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Role from './Role'

@Table({
    tableName: 'users'
})

class User extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(70)
    })
    declare name: string

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(100)
    })
    declare email: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(255)
    })
    declare password: string

    @AllowNull(true)
    @Column({
        type: DataType.STRING(6)
    })
    declare token: string | null

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare isVerified: boolean


    @Column({
        type: DataType.STRING(255)
    })
    declare photoUrl: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(255)
    })
    declare phone: string

    @AllowNull(false)
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare isActive: boolean

    @ForeignKey(() => Role)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare roleId: number


    @BelongsTo(() => Role)
    declare role: Role
}


export default User
