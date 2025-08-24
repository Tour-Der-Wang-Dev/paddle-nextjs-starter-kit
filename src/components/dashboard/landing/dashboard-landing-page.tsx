import { SocialOverviewStats } from '@/components/dashboard/landing/components/social-overview-stats';
import { RecentPostsActivity } from '@/components/dashboard/landing/components/recent-posts-activity';
import { SocialQuickActions } from '@/components/dashboard/landing/components/social-quick-actions';
import { ConnectedPlatforms } from '@/components/dashboard/landing/components/connected-platforms';

export function DashboardLandingPage() {
  return (
    <div className="space-y-6">
      <SocialOverviewStats />
      <div className={'grid flex-1 items-start gap-6 p-0 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}>
        <div className={'grid auto-rows-max items-start gap-6 lg:col-span-2'}>
          <RecentPostsActivity />
        </div>
        <div className={'grid auto-rows-max items-start gap-6'}>
          <SocialQuickActions />
          <ConnectedPlatforms />
        </div>
      </div>
    </div>
  );
}
