import * as XLSX from "xlsx";

export const exportToExcel = (
  data: any[], 
  fileName: string, 
  sheetName: string = "Data",
  colWidths: { wch: number }[] = []
) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  if (colWidths.length > 0) {
    worksheet['!cols'] = colWidths;
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  XLSX.writeFile(workbook, fileName);
};