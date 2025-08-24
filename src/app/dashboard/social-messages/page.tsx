import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { SocialMessagesView } from '@/components/dashboard/social-messages/social-messages-view';

export default function SocialMessagesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <DashboardPageHeader pageTitle={'Social Messages'} />
      <SocialMessagesView />
    </main>
  );
}
