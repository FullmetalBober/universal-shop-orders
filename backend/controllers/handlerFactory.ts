import { Model } from 'mongoose';
import { RequestHandler } from 'express';
import AppError from '../utils/appError';
import APIFeatures from '../utils/apiFeatures';

export const deleteOne =
  (Model: Model<any>): RequestHandler =>
  async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  };

export const updateOne =
  (Model: Model<any>): RequestHandler =>
  async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  };

export const createOne =
  (Model: Model<any>): RequestHandler =>
  async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  };

export const getOne =
  (Model: Model<any>, popOptions?: string | string[]): RequestHandler =>
  async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  };

export const getOneBySlug =
  (Model: Model<any>, popOptions?: string | string[]): RequestHandler =>
  async (req, res, next) => {
    let query = Model.findOne({ slug: req.params.slug });
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that slug', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  };

export const getAll =
  (Model: Model<any>, popOptions?: string | string[]): RequestHandler =>
  async (req, res, next) => {
    let query = Model.find();

    if (popOptions) query = query.populate(popOptions);

    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  };
