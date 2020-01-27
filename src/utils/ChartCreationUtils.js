const types_future = ["Alpha model_future", "Beta model_future", "Gamma model_future"];

//Creates chart legend payload
//Arguments:
//models: array of data units taken from response of api
export const getLegendPayload = (models, colors) =>
{
    const neededTypes = Object.keys(models[0].Data).filter(type => !types_future.includes(type))
    return neededTypes.map(type => {return{ value: type, type: "square", color: colors[type]}});
}

//returns type of chart line stroke depending on type of line
//example types: alpha model, beta model, actual, alpha model_future
export const getStrokeDash = (type) =>
{    
    if(types_future.includes(type)) return "2 2";
    else return "";
}

//gets index of the last model in which value of actual data != 0
//data = 0 mean no data
export const findEndOfActualData = (models) =>
{   
    if(!("Actual" in models[0].Data)) return null;
    const actuals = models.map(model => model.Data["Actual"]);

    for(let i = 0; i < actuals.length; i++)
    {
        if(actuals[i].Mean === 0 || actuals[i].Mean === null)
        {
            return {Count: i-1, Id: models[i-1].Id};          
        } 
    }

    return null;
}

//changes models so future values are assigned to new data types
//for example cuts alpha model data by the index given by findEndOfActualData and moves the second half to alpha model_future,
//then assigns nulls to second half of alpha model and first half if alpha model_future 
export const splitModelsDataByActual = (models, lastActualElementCount) =>
{
    const types = Object.keys(models[0].Data);
    if(types.some(type => types_future.includes(type))) return; //if models were in this function before, do nothing

    let Data = models.map(model => model.Data);
    let firstHalf = Data.splice(0, lastActualElementCount);
    firstHalf.push(Data[0]);
    let secondHalf = Data;
    let connectGraphs = true;

    firstHalf.forEach(dataElement => 
        {
        types.forEach(type => 
            {
                if(type !== "Actual") dataElement[type + "_future"] =  {Mean: null, Sd: null }; 
            })
        });

    secondHalf.forEach(dataElement => 
        {
        types.forEach(type => 
            {               
                if(type !== "Actual") dataElement[type + "_future"] =  dataElement[type];               
                if(!connectGraphs) dataElement[type] = { Mean: null, Sd: null };           
            })
            connectGraphs = false;
        });
}

//clones content of response received from apis
export const cloneData = (data) =>
{
    const types = Object.keys(data[0].Data);
    const output = [];
    for(let i = 0; i < data.length; i++)
    {
        output[i] = 
        {
            Id: data[i].Id,
            Time: data[i].Time,
            Data: []
        };
        types.forEach(type => (
            output[i].Data[type] = {...data[i].Data[type]}
        ))
    }  
    return output;
}

