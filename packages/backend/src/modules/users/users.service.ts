import { Injectable, NotFoundException } from '@nestjs/common';
import { User, Profile } from '@resume-fi/shared';
import { FirebaseConfig } from '../../config/firebase.config';

@Injectable()
export class UsersService {
  constructor(private firebaseConfig: FirebaseConfig) {}

  async findById(id: string): Promise<User | null> {
    const userDoc = await this.firebaseConfig.firestore.collection('users').doc(id).get();
    if (!userDoc.exists) {
      return null;
    }
    return { id: userDoc.id, ...userDoc.data() } as User;
  }

  async findOrCreateUser(userData: Partial<User>): Promise<User> {
    const { id, email, displayName, photoURL } = userData;
    
    // Check if user exists
    const userRef = this.firebaseConfig.firestore.collection('users').doc(id);
    const userDoc = await userRef.get();
    
    if (userDoc.exists) {
      // Update existing user
      const updatedData = {
        email,
        displayName,
        photoURL,
        updatedAt: new Date(),
      };
      
      await userRef.update(updatedData);
      return { id, ...userDoc.data(), ...updatedData } as User;
    } else {
      // Create new user
      const newUser = {
        email,
        displayName,
        photoURL,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await userRef.set(newUser);
      return { id, ...newUser } as User;
    }
  }

  async getProfile(userId: string): Promise<Profile | null> {
    const profileDoc = await this.firebaseConfig.firestore
      .collection('profiles')
      .doc(userId)
      .get();
    
    if (!profileDoc.exists) {
      return null;
    }
    
    return { userId, ...profileDoc.data() } as Profile;
  }

  async updateProfile(userId: string, profileData: Partial<Profile>): Promise<Profile> {
    const profileRef = this.firebaseConfig.firestore.collection('profiles').doc(userId);
    const profileDoc = await profileRef.get();
    
    if (!profileDoc.exists) {
      // Create new profile
      const initialProfile: Profile = {
        userId,
        personalInfo: {
          fullName: '',
          email: '',
          socials: {},
        },
        skills: [],
        experience: [],
        projects: [],
        education: [],
        certifications: [],
        awards: [],
        ...profileData,
      };
      
      await profileRef.set(initialProfile);
      return initialProfile;
    } else {
      // Update existing profile
      const updatedProfile = {
        ...profileDoc.data(),
        ...profileData,
      };
      
      await profileRef.update(updatedProfile);
      return { userId, ...updatedProfile } as Profile;
    }
  }

  async processResume(userId: string, resumeData: any): Promise<Profile> {
    // This would be replaced with actual resume parsing logic
    // For now, we'll just update the profile with the parsed data
    return this.updateProfile(userId, resumeData);
  }
}
