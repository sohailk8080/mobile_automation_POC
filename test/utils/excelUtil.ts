import ExcelJS from 'exceljs';
import path from 'path';

// Define and export the ExcelUtil class so it can be imported across test files[cite: 1, 15]
export class ExcelUtil {
    // Private variable to hold the absolute path of the Excel file on disk[cite: 1, 15]
    private filePath: string;

    // Constructor runs automatically when a new instance is created (e.g., new ExcelUtil('TestData.xlsx'))[cite: 1, 15]
    constructor(fileName: string) {
        // Resolve the relative file path into a full absolute system path starting from project root[cite: 1, 15]
        this.filePath = path.resolve(`./data/${fileName}`);
    }

    /**
     * Reads ALL data rows from a sheet and returns them as an array of key-value objects[cite: 1, 15].
     */
    public async getAllRecords(sheetName: string): Promise<Array<Record<string, string>>> {
        // Instantiate a new empty Excel Workbook object in memory[cite: 1, 15]
        const workbook = new ExcelJS.Workbook();

        // Read the physical Excel file asynchronously from disk[cite: 1, 15]
        await workbook.xlsx.readFile(this.filePath);

        // Retrieve the specific worksheet tab matching the provided sheetName[cite: 1, 15]
        const sheet = workbook.getWorksheet(sheetName);

        // Check if the requested worksheet tab exists; if not, throw an explicit error[cite: 1, 15]
        if (!sheet) {
            throw new Error(`Worksheet '${sheetName}' not found in ${this.filePath}`);
        }

        // Initialize an empty array to store the final list of row objects[cite: 1, 15]
        const records: Array<Record<string, string>> = [];

        // Initialize an array to store column header names indexed by column number[cite: 1, 15]
        const headers: string[] = [];

        // Extract column headers from Row 1 by looping through each cell in that row[cite: 1, 15]
        sheet.getRow(1).eachCell((cell, colNum) => {
            // Save the cell's string value (trimmed of extra spaces) or fallback to a default name[cite: 1, 15]
            headers[colNum] = cell.value?.toString().trim() || `col_${colNum}`;
        });

        // Iterate through all rows present in the worksheet[cite: 1, 15]
        sheet.eachRow((row, rowNumber) => {
            // Skip Row 1 because it contains column headers, not test data[cite: 1, 15]
            if (rowNumber === 1) return;

            // Create an empty key-value object to hold the data for the current row[cite: 1, 15]
            const rowRecord: Record<string, string> = {};

            // Loop through each cell in the current data row[cite: 1, 15]
            row.eachCell((cell, colNum) => {
                // Find the corresponding header name for the current column number[cite: 1, 15]
                const headerKey = headers[colNum];

                // If a header exists for this column, assign the cell's text value to that header key[cite: 1, 15]
                if (headerKey) {
                    rowRecord[headerKey] = cell.value?.toString().trim() || '';
                }
            });

            // Push the completed row object into the records list[cite: 1, 15]
            records.push(rowRecord);
        });

        // Return the full array of row objects back to the test caller[cite: 1, 15]
        return records;
    }
}