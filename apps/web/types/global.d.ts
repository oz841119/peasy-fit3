import Common from '../../../packages/locales/en-US/common.json'
import Table from '../../../packages/locales/en-US/table.json'
import Msg from '../../../packages/locales/en-US/msg.json'
import Card from '../../../packages/locales/en-US/card.json'
type A = {
  a: string
}
type Messages = {
  common: typeof Common
  msg: typeof Msg
  table: typeof Table, 
  card: typeof Card
}

declare global {
  interface IntlMessages extends Messages {}
}