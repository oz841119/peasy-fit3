type ValueOf<T> = T[keyof T];
type Messages = {
    common: typeof import("../dictionaries/en-US/common.json")
    msg: typeof import("../dictionaries/en-US/msg.json")
    table: typeof import("../dictionaries/en-US/table.json")
}

declare interface IntlMessages extends Messages { }