/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response } from 'express';
import { getUsers } from '../db/users';
import { uuid as uuidv4 } from 'uuidv4';
import s3 from '../../s3';
import { updateUserById } from '@/db/users';
import { getServicesByUserId } from '@/db/services';
import { becomeSeller } from '../db/users';

declare global {
  namespace Express {
    interface Request {
      file?: {
        buffer: Buffer;
        mimetype: string;
        originalname: string;
      };
    }
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const uploadPhoto = async (req: Request, res: Response): Promise<Response> => {
  try {
    const file = req.file;
    const userId = parseInt(req.body.userId, 10);

    if (!file || isNaN(userId)) {
      console.error('Missing file or invalid userId');
      return res.status(400).json({ error: 'User ID and file are required' });
    }

    const fileKey = `users/${userId}/profile/${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();

    const updateResult = await updateUserById(userId, { profilePhoto: uploadResult.Location });

    if (updateResult.length === 0) {
      console.error('Database update failed: No rows matched');
      return res.status(404).json({ error: 'User not found or update failed' });
    }

    return res.status(200).json({
      message: 'Photo uploaded successfully',
      photoUrl: uploadResult.Location,
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return res.status(500).json({ error: 'Failed to upload photo' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const services = await getServicesByUserId(user.id);

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePhoto: user.profilePhoto,
      bio: user.bio,
      country: user.country,
      phone: user.phone,
      name: user.name,
      surname: user.surname,
      isSeller: user.is_seller,
      services,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

export const becomeSellerController = async (req: Request, res: Response) => {
  try {
    const { bio, country, phone, name, surname } = req.body;

    if (!bio || !country || !phone || !name || !surname) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('Received data for becomeSeller:', { bio, country, phone, name, surname });

    const user = res.locals.user;

    if (!user) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedUser = await becomeSeller(user.id, { bio, country, phone, name, surname });

    console.log('Updated user:', updatedUser);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error in becomeSellerController:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
