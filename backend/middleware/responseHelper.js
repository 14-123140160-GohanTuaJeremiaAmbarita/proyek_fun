/**
 * Helper untuk format response API yang konsisten.
 */

function successResponse(res, data, message = 'Berhasil', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
}

function errorResponse(res, message = 'Terjadi kesalahan', statusCode = 500, details = null) {
  const payload = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };
  if (details && process.env.NODE_ENV === 'development') {
    payload.details = details;
  }
  return res.status(statusCode).json(payload);
}

function paginatedResponse(res, data, total, page, limit, message = 'Berhasil') {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
    timestamp: new Date().toISOString(),
  });
}

module.exports = { successResponse, errorResponse, paginatedResponse };
