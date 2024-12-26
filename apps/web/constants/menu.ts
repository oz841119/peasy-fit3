import { BicepsFlexed, ChartSpline, House, SquarePlus } from "lucide-react";

export const menu = [
  {
    name: 'index',
    label: 'common.menu.label.index',
    route: '/',
    icon: House
  },
  {
    name: 'trainingRecord',
    label: 'common.menu.label.trainingRecord',
    route: '/dashboard/training-record',
    icon: ChartSpline
  },
  {
    name: 'addRecord',
    label: 'common.menu.label.addRecord',
    route: '/dashboard/add-record',
    icon: SquarePlus
  },
  {
    name: 'exercise',
    label: 'common.menu.label.exercise',
    route: '/dashboard/exercise',
    icon: BicepsFlexed
  },
] as const