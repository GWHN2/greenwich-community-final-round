import asyncWrapper from '../middlewares/async';

export const getRoles = asyncWrapper(async (req, res) => {});

export const getRole = catchAsync(async (req, res) => {});

export const addRole = catchAsync(async (req, res) => {});

export const updateRole = catchAsync(async (req, res) => {});

export const deteteRole = catchAsync(async (req, res) => {});
