function paginationMiddleware(req, res, next) {
  const { data, error } = res.locals;

  let { pageIndex = 1, pageSize } = req.query;

  let _data = [...data];

  if (!pageIndex) {
    pageIndex = 1;
  }

  pageIndex = parseInt(pageIndex);
  pageSize = parseInt(pageSize);

  if (pageSize) {
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;

    _data = data.slice(start, end)
  }

  return res.json({
    data: _data ?? null,
    error: error ?? null,
    pagination: {
      pageIndex: pageIndex,
      pageSize: pageSize || 1,
      totalCount: data.length,
      totalPages: pageSize ? Math.ceil(data.length / pageSize) : data.length,
    }
  });
}

module.exports = {
  paginationMiddleware
};
