import QlogConnection from '@/data/Connection';

export enum TimeTrackingMethod {
    ABSOLUTE_TIME,
    RELATIVE_TIME,
    DELTA_TIME,
}

export interface IQlogEventParser {

    readonly relativeTime:number;
    readonly absoluteTime:number;
    readonly category:string;
    // Confusing code: name == type; Pre-draft-02 Qvis decided to use "name" instead of "type"; draft-02, however, introduced the "name" field
    // In order to stay backwards compatible, "name" is kept as a parameter for IQlogEventParser classes
    // IMPORTANT: In order to get draft-02 "name", use: `parser.category + ':' + parser.type`
    // TODO: Qvis should start using "type" instead of "name" and change the parser return value of "name" to the concatenation of "category" and "type"
    name:string; // name is not a readonly since we want to be able to change it when cloning traces (e.g., in sequenceDiagram)
    type:string;
    readonly data:any|undefined;

    readonly timeOffset:number;

    timeToMilliseconds(time: string | number): number;
    getAbsoluteStartTime(): number;

    init( connection:QlogConnection) : void;
    load( evt:IQlogRawEvent ) : IQlogEventParser;

    getTimeTrackingMethod() : TimeTrackingMethod;
    setReferenceTime(time:number) : void; // should not be needed normally
}

export type IQlogRawEvent = Array<any>;
