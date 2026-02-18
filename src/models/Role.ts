import { AllowNull, Column, DataType, HasMany, Model, Table, Unique } from 'sequelize-typescript'
import User from './User'

@Table({
    tableName: 'roles'
})

class Role extends Model {
    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @HasMany(() => User)
    declare users: User[]
}

export default Role