export interface ActivityModel{
    id:number
    nameActivity:string  
    location: string
    details:string 
    participants:number
    dateTimeStart:string
    dateTimeEnd:string 
    addBy:AddByModel 
    type:TypeActivityModel
    asset:AssetModel[]
}
export interface TypeActivityModel{
    id : number
    name_type:string
}
export interface AddByModel{
    id:number
    code_student:string
    first_name:string
    last_name:string
    profile:string
}
export interface AssetModel{
    id:number
    path:string
    type:number
    activityId:number
}