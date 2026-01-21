/**
 * Utility functions for getting image paths for locations and property types
 */

import fs from 'fs';
import path from 'path';

const IMAGE_EXTENSIONS = ['.jpg', '.avif', '.webp', '.jpeg', '.png'];

/**
 * Find the actual image file that exists for a given base path
 */
function findImageFile(basePath: string): string | null {
  const publicDir = path.join(process.cwd(), 'public');
  const fullBasePath = path.join(publicDir, basePath.replace(/^\//, ''));
  
  for (const ext of IMAGE_EXTENSIONS) {
    const fullPath = `${fullBasePath}${ext}`;
    if (fs.existsSync(fullPath)) {
      return `${basePath}${ext}`;
    }
  }
  
  return null;
}

/**
 * Get the image path for a location by slug
 * Returns the actual image path that exists, or null if not found
 */
export function getLocationImagePath(slug: string): string | null {
  const nameMap: Record<string, string> = {
    'center-city-philadelphia-pa': 'Center-City-Philadelphia-PA',
    'university-city-philadelphia-pa': 'University-City-Philadelphia-PA',
    'fishtown-philadelphia-pa': 'Fishtown-Philadelphia-PA',
    'manayunk-philadelphia-pa': 'Manayunk-Philadelphia-PA',
    'old-city-philadelphia-pa': 'Old-City-Philadelphia-PA',
    'society-hill-philadelphia-pa': 'Society-Hill-Philadelphia-PA',
    'bala-cynwyd-pa': 'Bala-Cynwyd-PA',
    'king-of-prussia-pa': 'King-of-Prussia-PA',
    'conshohocken-pa': 'Conshohocken-PA',
    'fort-washington-pa': 'Fort-Washington-PA',
    'wynnewood-pa': 'Wynnewood-PA',
    'ardmore-pa': 'Ardmore-PA',
    'narberth-pa': 'Narberth-PA',
    'haverford-pa': 'Haverford-PA',
    'bryn-mawr-pa': 'Bryn-Mawr-PA',
    'wayne-pa': 'Wayne-PA',
    'radnor-pa': 'Radnor-PA',
    'media-pa': 'Media-PA',
    'west-chester-pa': 'West-Chester-PA',
    'doylestown-pa': 'Doylestown-PA',
    'newtown-pa': 'Newtown-PA',
    'langhorne-pa': 'Langhorne-PA',
    'remote': 'Nationwide-Remote',
    'wilmington-de': 'Wilmington-DE',
    'trenton-nj': 'Trenton-NJ',
  };

  const displayName = nameMap[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
  const basePath = `/locations/1031-exchange-${displayName}`;
  
  return findImageFile(basePath);
}

/**
 * Get the image path for a property type by slug
 * Returns the actual image path that exists, or null if not found
 */
export function getPropertyTypeImagePath(slug: string): string | null {
  const nameMap: Record<string, string> = {
    'multifamily-communities': 'Multifamily-Communities',
    'triple-net-retail': 'Triple-Net-Retail',
    'industrial-flex-buildings': 'Industrial-Flex-Buildings',
    'medical-office': 'Medical-Office',
    'hospitality-assets': 'Hospitality-Assets',
    'land-for-development': 'Land-for-Development',
    'self-storage-facilities': 'Self-Storage-Facilities',
    'office-buildings': 'Office-Buildings',
    'mixed-use-properties': 'Mixed-Use-Properties',
    'student-housing': 'Student-Housing',
  };

  const displayName = nameMap[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
  const basePath = `/property-types/1031-exchange-${displayName}`;
  
  return findImageFile(basePath);
}

/**
 * Get all possible image paths for a base path (trying different extensions)
 * Useful for srcSet or fallback scenarios
 */
export function getImageSrcSet(basePath: string): string[] {
  return IMAGE_EXTENSIONS.map(ext => `${basePath}${ext}`);
}
