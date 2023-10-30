export interface AddDataInterface
{
    token:string;
    DevType:string;
    DevTypeOther:string;
    Make:string;
    Model:string;
    Owner:string;
    Location:string;
    Serial:string;
    PurchaseDate:string;
    WarrantyExpDate:string;
    ServiceExpDate:string;
    Value:string;
    Size:string;
    Toner:string;
    MacAddress:string;
    IPAddress:string;
    CellNumber:string
}

export interface updateDataInterface
{
    token:string;
    DevId:string;
    DevType:string;
    DevTypeOther:string;
    Make:string;
    Model:string;
    Owner:string;
    Location:string;
    Serial:string;
    PurchaseDate:string;
    WarrantyExpDate:string;
    ServiceExpDate:string;
    Value:string;
    Size:string;
    Toner:string;
    MacAddress:string;
    IPAddress:string;
    CellNumber:string
}

export interface note_Add_Interface 
{
    token:string|null|undefined;
    DevId:string;
    Note:string|null|undefined;
    AddBy:any;
}

export interface note_Del_Interface
{
   token:string;
   NodeId:number;     
}

export interface note_Get_Interface
{
   token:string;
   NodeId:number;     
}

export interface note_Upd_Interface
{
    token:string;
    DevId:number;
    NoteId:number;
    Note:string;
    AddBy:any;
}