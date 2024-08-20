import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  displayedColumns: string[] = ['date', 'activity', 'details', 'actions'];
  activities = [
    { date: '2024-08-15', activity: 'Parent-Teacher Meeting', details: 'Discussed student progress' },
    { date: '2024-08-14', activity: 'New Enrollment', details: 'Registered 30 new students' },
    { date: '2024-08-13', activity: 'School Assembly', details: 'Organized monthly assembly' },
    { date: '2024-08-12', activity: 'Annual Sports Day', details: 'Conducted various sports events' },
    { date: '2024-08-11', activity: 'Science Fair', details: 'Students showcased science projects' },
    { date: '2024-08-10', activity: 'Art Exhibition', details: 'Displayed students\' artwork' },
    { date: '2024-08-09', activity: 'Math Olympiad', details: 'Held inter-school math competition' },
    { date: '2024-08-08', activity: 'Guest Lecture', details: 'Invited guest speaker on technology' },
    { date: '2024-08-07', activity: 'Library Week', details: 'Special events in the school library' },
    { date: '2024-08-06', activity: 'Community Service', details: 'Students participated in local community service' },
    { date: '2024-08-05', activity: 'Career Counseling', details: 'Guided students on career paths' },
    { date: '2024-08-04', activity: 'Parent Workshop', details: 'Workshop for parents on supporting student learning' }
  ];
  

  constructor() { }

}
