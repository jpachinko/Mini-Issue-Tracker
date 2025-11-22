export default interface IssueLog {
id:number;
project:string;
module:string;
errorDescription:string;
type:string;
state:string;
dateCreated:Date;
dateResolved:Date
}