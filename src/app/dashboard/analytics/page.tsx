import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { AnalyticsView } from '@/components/dashboard/analytics/analytics-view';

export default function AnalyticsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <DashboardPageHeader pageTitle={'Analytics'} />
      <AnalyticsView />
    </main>
  );
}
