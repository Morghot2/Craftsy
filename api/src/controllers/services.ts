import { Request, Response } from 'express';
import { createService, getServices, getServicesByUserId, getServiceByIdFromDB, deleteServiceById } from '@/db/services';
import { v4 as uuidv4 } from 'uuid';
import s3 from '../../s3';

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const { userId, categoryId } = req.query;
    const services = await getServices({
      userId: userId ? Number(userId) : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
    });
    return res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ error: 'Failed to fetch services' });
  }
};

export const getServicesByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const services = await getServicesByUserId(Number(userId));
    return res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching user services:', error);
    return res.status(500).json({ error: 'Failed to fetch user services' });
  }
};

export const getServicesForCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const services = await getServices({ categoryId: Number(categoryId) });

    if (!services || services.length === 0) {
      return res.status(404).json({ error: 'No services found for this category' });
    }

    return res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    return res.status(500).json({ error: 'Failed to fetch services by category' });
  }
};

export const addService = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category_id } = req.body;
    const file = req.file;
    const sellerId = res.locals.user.id;
    if (!name || !description || !price || !category_id || !file) {
      return res.status(400).json({ error: 'All fields and photo are required' });
    }
    const fileKey = `services/${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const uploadResult = await s3.upload(params).promise();
    const newService = {
      name,
      description,
      price: parseInt(price, 10),
      category_id: parseInt(category_id, 10),
      seller_id: sellerId,
      photo_url: uploadResult.Location,
    };
    const createdService = await createService(newService);
    return res.status(201).json(createdService);
  } catch (error) {
    console.error('Error adding service:', error);
    return res.status(500).json({ error: 'Failed to add service' });
  }
};
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.params;

    if (!serviceId) {
      return res.status(400).json({ error: 'Service ID is required' });
    }

    const service = await getServiceByIdFromDB(Number(serviceId));

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    return res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    return res.status(500).json({ error: 'Failed to fetch service' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user.id;

    const service = await getServiceByIdFromDB(Number(id));

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (service.seller_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const isDeleted = await deleteServiceById(Number(id), userId);

    if (isDeleted) {
      return res.status(200).json({ message: 'Service deleted successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to delete service' });
    }
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).json({ error: 'Failed to delete service' });
  }
};
