import type Card from "../../../packages/locales/en-US/card.json";
import type Common from "../../../packages/locales/en-US/common.json";
import type Msg from "../../../packages/locales/en-US/msg.json";
import type Table from "../../../packages/locales/en-US/table.json";
type A = {
	a: string;
};
type Messages = {
	common: typeof Common;
	msg: typeof Msg;
	table: typeof Table;
	card: typeof Card;
};

declare global {
	interface IntlMessages extends Messages {}
}
