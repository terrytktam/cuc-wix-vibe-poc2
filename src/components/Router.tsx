import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import MissionVisionPage from '@/components/pages/MissionVisionPage';
import MusicDirectorPage from '@/components/pages/MusicDirectorPage';
import StaffPage from '@/components/pages/StaffPage';
import MembersPage from '@/components/pages/MembersPage';
import UpcomingEventsPage from '@/components/pages/UpcomingEventsPage';
import PastEventsPage from '@/components/pages/PastEventsPage';
import EventDetailPage from '@/components/pages/EventDetailPage';
import ConcertDetailPage from '@/components/pages/ConcertDetailPage';
import SheetMusicPage from '@/components/pages/SheetMusicPage';
import SheetMusicListingPage from '@/components/pages/SheetMusicListingPage';
import ScoreDetailPage from '@/components/pages/ScoreDetailPage';
import RecordingsPage from '@/components/pages/RecordingsPage';
import RecordingDetailPage from '@/components/pages/RecordingDetailPage';
import SupportPage from '@/components/pages/SupportPage';
import SponsorshipPage from '@/components/pages/SponsorshipPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "mission-vision",
        element: <MissionVisionPage />,
      },
      {
        path: "music-director",
        element: <MusicDirectorPage />,
      },
      {
        path: "staff",
        element: <StaffPage />,
      },
      {
        path: "members",
        element: <MembersPage />,
      },
      {
        path: "upcoming-events",
        element: <UpcomingEventsPage />,
      },
      {
        path: "past-events",
        element: <PastEventsPage />,
      },
      {
        path: "event/:id",
        element: <EventDetailPage />,
      },
      {
        path: "concert/:id",
        element: <ConcertDetailPage />,
      },
      {
        path: "sheet-music",
        element: <SheetMusicPage />,
      },
      {
        path: "sheet-music/:series",
        element: <SheetMusicListingPage />,
      },
      {
        path: "score/:id",
        element: <ScoreDetailPage />,
      },
      {
        path: "recordings",
        element: <RecordingsPage />,
      },
      {
        path: "recording/:id",
        element: <RecordingDetailPage />,
      },
      {
        path: "support",
        element: <SupportPage />,
      },
      {
        path: "sponsorship",
        element: <SponsorshipPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
