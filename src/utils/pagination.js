const renderPaginationItems = (pageNumber, total) => {
  if (total <= 5) {
    return {
      isLeft: true,
      isRight: true,
      current: pageNumber,
      items: Array.from({ length: total }, (_, index) => index + 1),
    };
  } else if (pageNumber == 1 || pageNumber == 2) {
    return {
      isLeft: true,
      isRight: false,
      current: pageNumber,
      items: [1, 2, 3, 4, 5, "...", total],
    };
  } else if (pageNumber >= total - 2) {
    return {
      isLeft: false,
      isRight: true,
      current: pageNumber,
      items: [1, "...", total - 4, total - 3, total - 2, total - 1, total],
    };
  } else {
    return {
      isLeft: false,
      isRight: false,
      current: pageNumber,
      items: [
        pageNumber - 2,
        pageNumber - 1,
        pageNumber,
        pageNumber + 1,
        pageNumber + 2,
        "...",
        total,
      ],
    };
  }
};

export default renderPaginationItems;
