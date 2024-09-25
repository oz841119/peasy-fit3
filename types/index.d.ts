type ValueOf<T> = T[keyof T];
type Messages = {
    common: typeof import("../dictionaries/en-US/common.json")
    msg: typeof import("../dictionaries/en-US/msg.json")
}

declare interface IntlMessages extends Messages { }