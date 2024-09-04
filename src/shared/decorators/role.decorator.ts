import { SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';

export const Role = (...args: string[]) => SetMetadata('role', args)
export const AdminOnly = () => {
    return UseGuards(RoleGuard, Role('admin'))
  }