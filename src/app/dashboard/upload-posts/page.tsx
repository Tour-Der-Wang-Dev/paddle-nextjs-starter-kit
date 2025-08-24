import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { UploadPostsForm } from '@/components/dashboard/upload-posts/upload-posts-form';

export default function UploadPostsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <DashboardPageHeader pageTitle={'Upload Posts'} />
      <UploadPostsForm />
    </main>
  );
}
