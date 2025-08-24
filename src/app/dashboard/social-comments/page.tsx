import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { SocialCommentsView } from '@/components/dashboard/social-comments/social-comments-view';

export default function SocialCommentsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <DashboardPageHeader pageTitle={'Social Comments'} />
      <SocialCommentsView />
    </main>
  );
}
