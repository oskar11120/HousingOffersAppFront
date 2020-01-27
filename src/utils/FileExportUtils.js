import { ExportToCsv } from 'export-to-csv';

//generates new csv file from data
export const exportToCsv = (data, fileName) =>
    {
        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: false,
            filename: fileName,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        const csvExporter = new ExportToCsv(options);  
        csvExporter.generateCsv(data);
    }

export const parseDataToCsvFormat = (data) =>
{
    let output = [];
    data.forEach(element => {
        output.push({Time: element.Time, ...element.Data})
    });
    return output;
}

//creates name for the csv file
export const createFileName = (forecastType, chosenTableData, getUserInputs) =>
{
    const firstDate = Object.keys(chosenTableData[0].Data)[0];
    const lastDataObject = chosenTableData[chosenTableData.length-1];
    const lastDate = Object.keys(lastDataObject.Data)[Object.keys(lastDataObject.Data).length-1];
    return forecastType + "_" + getUserInputs.zoneSelect + "_" + getDateFileNamePart(firstDate, lastDate);
}

const getDateFileNamePart = (firstDate, lastDate) => 
{
    return firstDate === lastDate ? "_" + firstDate : "_" + firstDate + "_" + lastDate;
}