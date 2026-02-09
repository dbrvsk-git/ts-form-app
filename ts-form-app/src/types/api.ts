// generický typ API odpovědi
export type ApiResponse<T> = {
  data?: T;
  error?: string;
};
