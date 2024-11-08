import { PedWithOrganizationAndLocation } from '../../prisma';

export type GetCrimiPedsReturn = {
  peds: PedWithOrganizationAndLocation[];
}
