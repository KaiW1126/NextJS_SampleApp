import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserIcon, TrendingUpIcon, UsersIcon } from "lucide-react";

async function Sidebar() {
  const user = await currentUser();

  return (
    <div className="space-y-4 sticky top-20">
      {/* User Profile Card */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.emailAddresses[0].emailAddress}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]}`}>
                View Profile
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUpIcon className="w-4 h-4" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="hover:bg-accent p-2 rounded-md cursor-pointer transition-colors">
              <p className="text-sm font-medium">#WebDevelopment</p>
              <p className="text-xs text-muted-foreground">1,234 posts</p>
            </div>
            <div className="hover:bg-accent p-2 rounded-md cursor-pointer transition-colors">
              <p className="text-sm font-medium">#NextJS</p>
              <p className="text-xs text-muted-foreground">892 posts</p>
            </div>
            <div className="hover:bg-accent p-2 rounded-md cursor-pointer transition-colors">
              <p className="text-sm font-medium">#React</p>
              <p className="text-xs text-muted-foreground">756 posts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Users */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <UsersIcon className="w-4 h-4" />
            Suggested for you
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">User {i}</p>
                    <p className="text-xs text-muted-foreground">@user{i}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <div className="text-xs text-muted-foreground space-y-2 px-2">
        <div className="flex flex-wrap gap-2">
          <Link href="/about" className="hover:underline">About</Link>
          <span>·</span>
          <Link href="/help" className="hover:underline">Help</Link>
          <span>·</span>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:underline">Terms</Link>
        </div>
        <p>© 2024 Socially</p>
      </div>
    </div>
  );
}

export default Sidebar;
