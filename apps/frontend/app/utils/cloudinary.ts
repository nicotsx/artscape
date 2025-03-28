/**
 * Transforms an external image URL to use Cloudinary for optimization
 * @param imageUrl Original image URL
 * @param width Desired width in pixels
 * @param height Optional desired height in pixels
 * @returns Optimized Cloudinary URL
 */
export const getOptimizedImageUrl = (imageUrl: string, width: number, height?: number): string => {
  if (imageUrl.includes('res.cloudinary.com')) {
    return imageUrl;
  }

  try {
    const baseUrl = 'https://res.cloudinary.com/dmsvulc8t/image/fetch';
    const transformations = [];

    if (height) {
      transformations.push(`w_${width},h_${height},c_fill`);
    } else {
      transformations.push(`w_${width}`);
    }

    transformations.push('q_auto,f_auto');

    const transformationString = transformations.join(',');
    const cleanUrl = imageUrl.split('?')[0];

    return `${baseUrl}/${transformationString}/${encodeURIComponent(cleanUrl)}`;
  } catch (error) {
    console.error('Error generating Cloudinary URL:', error);
    return imageUrl;
  }
};
