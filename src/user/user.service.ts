import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
  constructor(private readonly helloService: HelloService) {}

  getAllUsers() {
    return [
      { id: 1, name: 'Trong 1' },
      { id: 2, name: 'Trong 2' },
      { id: 3, name: 'Trong 3' },
    ];
  }

  getUserById(id: number) {
    const user = this.getAllUsers().find((user) => user.id === id);
    if (!user) {
      return {
        id: 0,
        name: 'User not found',
      };
    }
    return user;
  }

  getWelcomeMessage(userId: number) {
    const user = this.getUserById(userId);
    if (user.id === 0) {
      return 'User not found';
    }
    return this.helloService.getHelloWithName(user.name); // call service method
  }
}
