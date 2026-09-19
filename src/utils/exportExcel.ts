import * as XLSX from 'xlsx';
import { PROJECTS_DATA } from '../data/projects';

// Known status map for YouTube video IDs verified via oembed
const WORKING_YT_IDS = new Set([
  'xLl-sci3KqI', 'N_cZbpUsdc8', 'oi23hG3hTaU', 'MF6I0jyi_pk', 'WVF2Uqyny54',
  'ycrzAyTnRH8', 'jI8V1T0iJuo', 'J3FWFWYSuPo', 'pw9p77cZ59w', 'qM-fbLu-QOA',
  '4eFyGDFAXZU', 'ZKz2GIHYSHE', '0KaaUZ6aQ0I', 'cJyt84xYsHI', 'RLu5P7ggumM',
  'fN7oeg4LBBc', 'c3Z5wibZ5kk', '_DH7pROgzRc', '0IZr3y9an-g', 'rMyJ9vSH_mw',
  'aj_ZnPnCM2I', '7bmHbUu_HUs', 'zlcx03C6gUA', 'jYISnBheMlg', '1A986X41k1E',
  'mBqoQDv3GTI', 'wQCXwGitZ0g', 'cR-RhuAkfGU', 'KiEt6psniGg', 'qEkk4t7y9_I',
  'GXiwY_tQPs0', 'cSfGWixhGr8', 'ui1b-W3YLP0', 'CkpwzwAgWpY', 'qI0ZF_DF-6Q',
  'IE9gRbVRklk', 'dRaQhjsnE_4', '_7vfY70bQ5A', 'tnlJBPP6jWc', 'KQdgKpNYho8',
  'rdHJUgxm8DE', 'pgEiBaF2mHA'
]);

export function checkYouTubeLinkStatus(videoUrl?: string): string {
  if (!videoUrl) return 'No Link Provided';
  const match = videoUrl.match(/(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/|\/v\/)([^#&?]+)/);
  if (!match || !match[1]) return 'Not Working';
  const videoId = match[1];
  if (WORKING_YT_IDS.has(videoId)) {
    return 'Working';
  }
  return 'Not Working';
}

export function downloadProjectsExcel() {
  const rows = PROJECTS_DATA.map((p, idx) => {
    const ytStatus = checkYouTubeLinkStatus(p.videoUrl);
    return {
      '#': idx + 1,
      'Project Name': p.title,
      'Category': p.category,
      'Year': p.year,
      'Role': p.credits?.role || 'Art Direction',
      'Director': p.credits?.director || '',
      'Production House': p.credits?.productionHouse || '',
      'Featured in Hero': p.featuredInHero ? 'Yes' : 'No',
      'YouTube Link Status': ytStatus,
      'Video Link': p.videoUrl || '',
      'Thumbnail Image URL': p.thumbnail || '',
      'Gallery Stills Count': p.gallery ? p.gallery.length : 0,
      'Description': p.description || '',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 5 },  // #
    { wch: 42 }, // Project Name
    { wch: 18 }, // Category
    { wch: 8 },  // Year
    { wch: 35 }, // Role
    { wch: 25 }, // Director
    { wch: 28 }, // Production House
    { wch: 18 }, // Featured in Hero
    { wch: 22 }, // YouTube Link Status
    { wch: 48 }, // Video Link
    { wch: 70 }, // Thumbnail URL
    { wch: 20 }, // Gallery count
    { wch: 50 }, // Description
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'All 66 Projects');

  // Generate binary XLSX array buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Saloni_Shah_Portfolio_Projects.xlsx';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function downloadProjectsCSV() {
  const rows = PROJECTS_DATA.map((p, idx) => {
    const ytStatus = checkYouTubeLinkStatus(p.videoUrl);
    return {
      '#': idx + 1,
      'Project Name': p.title,
      'Category': p.category,
      'Year': p.year,
      'Role': p.credits?.role || 'Art Direction',
      'Director': p.credits?.director || '',
      'Production House': p.credits?.productionHouse || '',
      'Featured in Hero': p.featuredInHero ? 'Yes' : 'No',
      'YouTube Link Status': ytStatus,
      'Video Link': p.videoUrl || '',
      'Thumbnail Image URL': p.thumbnail || '',
      'Gallery Stills Count': p.gallery ? p.gallery.length : 0,
      'Description': p.description || '',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const csvText = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob(['\uFEFF' + csvText], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Saloni_Shah_Portfolio_Projects.csv';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
