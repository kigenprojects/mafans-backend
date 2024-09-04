import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const userRole = request.user.role

    if (userRole !== 'admin') {
      throw new UnauthorizedException('Access denied!. You are not authorized to access this resource')
    }
    return true
  }
}