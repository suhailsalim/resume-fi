import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseConfig } from '../../config/firebase.config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private firebaseConfig: FirebaseConfig,
    private usersService: UsersService,
  ) {}

  async validateOAuthUser(profile: any): Promise<any> {
    try {
      // Check if user exists in Firebase
      let userRecord;
      try {
        userRecord = await this.firebaseConfig.auth.getUserByEmail(profile.email);
      } catch (error) {
        // User doesn't exist, create a new one
        userRecord = await this.firebaseConfig.auth.createUser({
          email: profile.email,
          displayName: profile.displayName,
          photoURL: profile.photos?.[0]?.value,
        });
      }

      // Create or update user in Firestore
      const user = await this.usersService.findOrCreateUser({
        id: userRecord.uid,
        email: profile.email,
        displayName: profile.displayName,
        photoURL: profile.photos?.[0]?.value,
      });

      return user;
    } catch (error) {
      throw new UnauthorizedException('Failed to authenticate user');
    }
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async refreshToken(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
