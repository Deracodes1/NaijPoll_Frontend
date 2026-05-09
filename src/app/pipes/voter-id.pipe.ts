import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voterId',
  standalone: true,
})
export class VoterIdPipe implements PipeTransform {
  transform(userId: string, joinedDate: string): string {
    const year = new Date(joinedDate).getFullYear();
    const shortId = userId.slice(0, 4).toUpperCase();
    return `NGA-VOTER-${year}-${shortId}`;
  }
}
