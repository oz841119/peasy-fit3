type ValueOf<T> = T[keyof T];
type Messages = {
    common: typeof import("../packages/locales/en-US/common.json")
    msg: typeof import("../packages/locales/en-US/msg.json")
    table: typeof import("../packages/locales/en-US/table.json")
}

declare interface IntlMessages extends Messages { }