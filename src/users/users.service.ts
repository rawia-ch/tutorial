import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Patrick Tougou',
      email: 'patrick.tougou@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Sara Ben Ali',
      email: 'sara.benali@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Omar Khadhraoui',
      email: 'omar.k@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Lina Trabelsi',
      email: 'lina.trabelsi@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Youssef Mansour',
      email: 'y.mansour@gmail.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
    if (role) {
        return this.users.filter(user => user.role === role)
    }
    return this.users;
  }

  findOne(id: number){
    const user = this.users.find(user => user.id === id);
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id )
    const newUser = {
        id: usersByHighestId[0].id + 1,
        ...createUserDto
    }
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUser: UpdateUserDto) {
    this.users = this.users.map(user => {
        if (user.id === id) {
            return {...user, ...updateUser}
        }
        return user;
    }) 
    return this.findOne(id); 
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter(user => user.id !== id);
    
    return removedUser;
  }
}