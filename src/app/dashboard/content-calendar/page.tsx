import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { ContentCalendarView } from '@/components/dashboard/content-calendar/content-calendar-view';

export default function ContentCalendarPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <DashboardPageHeader pageTitle={'Content Calendar'} />
      <ContentCalendarView />
    </main>
  );
}
